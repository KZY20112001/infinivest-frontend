import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Flex, Input, List, Text } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

import { getAssetDescription, getAssetPrice } from "@/app/api/assets";
import { quicksand, raleway } from "@/app/fonts";
import { ManualPortfolioAsset } from "@/types/manual-portfolio";
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
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { sellAsset } from "@/app/api/manual-portfolio";
import { useRouter } from "next/navigation";

const ManualAsset = ({
  asset,
  portfolioName,
}: {
  asset: ManualPortfolioAsset;
  portfolioName: string;
}) => {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latestPrice, setLatestPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const valid = amount <= asset.sharesOwned;
  const fetch = async () => {
    setIsLoading(true);
    const [desc, latestPrice] = await Promise.all([
      getAssetDescription(asset.symbol),
      getAssetPrice(asset.symbol),
    ]);

    setDesc(desc);
    setLatestPrice(latestPrice);
    setIsLoading(false);
  };

  const handleSell = async () => {
    const successful = await sellAsset(portfolioName, asset.symbol, amount);
    if (successful) {
      toast(
        `Assets sold successfully for ${(amount * latestPrice).toFixed(2)}!`
      );
      setAmount(0);
      router.refresh();
    } else {
      toast("Failed to sell asset!");
    }
  };

  return (
    <List.Item>
      <ToastContainer />
      <DialogRoot size={"lg"} onOpenChange={fetch}>
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
              {asset.symbol}
            </Flex>
            <Flex
              w="100%"
              justifyContent={"flex-end"}
              className={quicksand.className}
            >
              Shares Owned: {asset.sharesOwned.toFixed(2)}
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
                {asset.name} - {asset.symbol}
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
              <Text w="40">Total Shares Owned:</Text>
              <Text>{asset.sharesOwned.toFixed(2)}</Text>
            </Flex>

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Average Buy Price:</Text>
              {isLoading ? (
                <ClipLoader size={25} />
              ) : (
                <Text>${asset.avgBuyPrice.toFixed(2)}</Text>
              )}
            </Flex>

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Estimated Value: </Text>
              {isLoading ? (
                <ClipLoader size={25} />
              ) : (
                <Text>${(asset.sharesOwned * latestPrice).toFixed(2)}</Text>
              )}
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
                Sell Share Amount:
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
                  Not enough shares to sell! Reduce the amount
                </Text>
              )}
            </Flex>

            <Flex
              gap="2"
              fontSize="md"
              className={quicksand.className}
              fontWeight="semibold"
            >
              <Text w="40">Total Cash Gain: </Text>
              {isLoading ? (
                <ClipLoader size={25} />
              ) : (
                <Text>${(amount * latestPrice).toFixed(2)}</Text>
              )}
            </Flex>
          </DialogBody>
          <DialogFooter className={raleway.className} fontWeight={"semibold"}>
            <Button
              bgColor={valid ? "green.50" : "gray.50"}
              disabled={!valid || amount === 0}
              px="4"
              py="1"
              w="28"
              borderRadius={"lg"}
              onClick={handleSell}
            >
              Sell
            </Button>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
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

export default ManualAsset;
