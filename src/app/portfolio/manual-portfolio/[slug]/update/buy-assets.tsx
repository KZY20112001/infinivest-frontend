import { FC, useState } from "react";

import ReactMarkdown from "react-markdown";
import { Box, Flex, Input, List, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { quicksand, raleway } from "@/app/fonts";
import {
  getAssetsByKeyword,
  getAssetDescription,
  getAssetPrice,
  getAssetHistory,
  getAssetSuggestions,
} from "@/app/api/assets";

import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClipLoader from "react-spinners/ClipLoader";
import { InputGroup } from "@/components/ui/input-group";
import { buyAsset } from "@/app/api/manual-portfolio";
import { useRouter } from "next/navigation";
import { AssetPriceHistory } from "@/types/asset";
import PriceChart from "@/app/portfolio/price-chart";
import { getProfile } from "@/app/api/profile";

interface BuyAssetsProps {
  portfolioName: string;
  totalCash: number;
}
const BuyAssets: FC<BuyAssetsProps> = ({ totalCash, portfolioName }) => {
  const [results, setResults] = useState<[string, string][]>([]);
  const [query, setQuery] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState({
    search: false,
    suggestion: false,
  });

  const handleSearch = async () => {
    if (query.length < 3) return;
    setIsLoading((prev) => ({ ...prev, search: true }));
    const res = await getAssetsByKeyword(query);
    setResults(res);
    setIsLoading((prev) => ({ ...prev, search: false }));
  };

  const handleSuggestions = async () => {
    setIsLoading((prev) => ({ ...prev, suggestion: true }));
    const profile = await getProfile();
    console.log(profile);
    const res = await getAssetSuggestions(profile);
    setReason(res?.reason ?? "");
    setResults(res?.assets ?? []);
    setIsLoading((prev) => ({ ...prev, suggestion: false }));
  };

  return (
    <Flex flexDir={"column"} gap="2">
      <Text
        borderBottomWidth={2}
        borderColor="black"
        pb="2"
        alignItems={"center"}
        fontSize="xl"
        className={raleway.className}
        fontWeight="bold"
      >
        Buy New Assets
      </Text>

      <Flex
        gap="4"
        alignItems="center"
        fontWeight={"semibold"}
        className={raleway.className}
      >
        <Input
          placeholder="Search for an asset"
          p="2"
          size="xs"
          w="40%"
          backgroundColor="gray.50"
          borderRadius="lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          bgColor={isLoading ? "gray.50" : "green.50"}
          px="4"
          py="2"
          borderRadius="lg"
          disabled={isLoading.search}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          bgColor={isLoading.search ? "gray.50" : "red.200"}
          px="4"
          py="2"
          borderRadius="lg"
          disabled={isLoading.search || results.length === 0}
          onClick={() => {
            setResults([]);
            setQuery("");
            setReason("");
          }}
        >
          Clear
        </Button>
      </Flex>

      <List.Root display="flex" flexDir="row" gap={12} p={4} flexWrap={"wrap"}>
        {isLoading.search || isLoading.suggestion ? (
          <ClipLoader />
        ) : (
          results.map(([symbol, name]) => (
            <Asset
              portfolioName={portfolioName}
              symbol={symbol}
              name={name}
              key={symbol}
              totalCash={totalCash}
            />
          ))
        )}
      </List.Root>

      {reason !== "" && (
        <Box
          bgColor="gray.100"
          p="4"
          rounded={"lg"}
          className={quicksand.className}
          maxH="20rem"
          overflowY="scroll"
        >
          <ReactMarkdown>{reason}</ReactMarkdown>
        </Box>
      )}

      <Button
        bgColor="green.100"
        px="4"
        py="2"
        w="40"
        display="flex"
        justifyContent="center"
        rounded="lg"
        fontWeight="semibold"
        className={raleway.className}
        onClick={handleSuggestions}
      >
        {isLoading.suggestion ? <ClipLoader size={25} /> : "Get Suggestions!"}
      </Button>
    </Flex>
  );
};

const Asset = ({
  portfolioName,
  symbol,
  name,
  totalCash,
}: {
  portfolioName: string;
  symbol: string;
  name: string;
  totalCash: number;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [latestPrice, setLatestPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [history, setHistory] = useState<AssetPriceHistory>([]);

  const [amount, setAmount] = useState(0);
  const fetch = async (symbol: string) => {
    setIsLoading(true);
    const [price, desc, history] = await Promise.all([
      getAssetPrice(symbol),
      getAssetDescription(symbol),
      getAssetHistory(symbol),
    ]);
    setLatestPrice(price);
    setDesc(desc);
    setHistory(history);
    setIsLoading(false);
  };

  const valid = amount * latestPrice <= totalCash;

  const handleBuy = async () => {
    const successful = await buyAsset(portfolioName, symbol, name, amount);
    if (successful) {
      toast("Asset bought successfully!");
      setAmount(0);
      router.refresh();
    } else {
      toast("Failed to buy asset!");
    }
  };
  return (
    <List.Item key={symbol}>
      <DialogRoot size={"lg"} onOpenChange={() => fetch(symbol)}>
        <DialogTrigger asChild>
          <Flex
            borderRadius="xl"
            borderWidth="1px"
            bgColor="white"
            px="5"
            py="3"
            gap="2"
            cursor="pointer"
            fontWeight={"semibold"}
            flexDir={"column"}
            _hover={{ bgColor: "gray.50" }}
            w="72"
          >
            <Flex
              w="100%"
              justifyContent={"flex-start"}
              fontSize="lg"
              className={raleway.className}
              borderBottomWidth={2}
              borderColor="gray.400"
              pb="1"
            >
              {symbol}
            </Flex>
            <Flex
              fontSize="sm"
              w="100%"
              justifyContent={"flex-end"}
              className={raleway.className}
            >
              {name}
            </Flex>
          </Flex>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader>
            <DialogTitle
              display="flex"
              flexDir="column"
              gap="2"
              className={quicksand.className}
              borderBottomWidth="2px"
              borderColor="black"
              pb="3"
            >
              <Text fontSize="lg" fontWeight={"bold"}>
                {name} - {symbol}
              </Text>
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            className={raleway.className}
            display="flex"
            flexDir="column"
            gap="4"
          >
            {isLoading ? (
              <ClipLoader size={25} />
            ) : (
              <Text
                fontWeight="normal"
                fontSize="md"
                lineHeight={"tall"}
                alignItems={"center"}
              >
                {desc}
              </Text>
            )}

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Available Cash: </Text>

              <Text>${totalCash.toFixed(2)}</Text>
            </Flex>

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Latest Price: </Text>
              {isLoading ? (
                <ClipLoader size={25} />
              ) : (
                <Text>${latestPrice.toFixed(2)}</Text>
              )}
            </Flex>
            <Flex gap="2" alignItems="center">
              <Text
                fontWeight="semibold"
                fontSize="md"
                alignItems={"center"}
                w="40"
              >
                Share Amount:
              </Text>
              <InputGroup bgColor="blue.50" px="4" py="1" borderRadius="lg">
                <Input
                  className={quicksand.className}
                  type="number"
                  fontWeight="semibold"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="0"
                  max="1000000"
                  width={40}
                  height={8}
                  fontSize="lg"
                  px="2"
                />
              </InputGroup>

              {!valid && (
                <Text w="60" color="red.600">
                  Not enough cash in the portfolio! Top up more or reduce the
                  amount
                </Text>
              )}
            </Flex>

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Total Cost: </Text>
              {isLoading ? (
                <ClipLoader size={25} />
              ) : (
                <Text>${(amount * latestPrice).toFixed(2)}</Text>
              )}
            </Flex>

            <Flex
              gap="8"
              flexDir="column"
              py="4"
              px="2"
              borderWidth="1px"
              borderColor="black"
              bgColor="blue.50"
            >
              <Text
                fontSize="md"
                className={quicksand.className}
                fontWeight="semibold"
              >
                Historical Performance
              </Text>
              <PriceChart data={history} totalInvested={0} />
            </Flex>
          </DialogBody>
          <DialogFooter
            className={raleway.className}
            fontWeight={"semibold"}
            display="flex"
            gap="3"
          >
            <Button
              bgColor={valid ? "green.50" : "gray.50"}
              disabled={!valid}
              px="4"
              py="1"
              w="28"
              borderRadius={"lg"}
              onClick={handleBuy}
            >
              Buy
            </Button>
            <DialogActionTrigger asChild>
              <Button
                bgColor="green.50"
                px="4"
                py="1"
                w="28"
                borderRadius={"lg"}
              >
                Close
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </List.Item>
  );
};
export default BuyAssets;
