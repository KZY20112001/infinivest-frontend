"use client";
import Link from "next/link";
import { FC, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { Card, Flex, List, Text } from "@chakra-ui/react";

import { ArrowLeft, Info } from "lucide-react";

import { quicksand, raleway } from "@/app/fonts";
import AdjustCash from "@/app/portfolio/manual-portfolio/[slug]/adjust-cash";
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
import {
  ManualPortfolio,
  ManualPortfolioAsset,
} from "@/types/manual-portfolio";
import { AssetPriceHistory } from "@/types/asset";
import {
  getAssetDescription,
  getAssetHistory,
  getAssetPrice,
} from "@/app/api/assets";
import PriceChart from "@/app/portfolio/price-chart";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

interface DisplayManualPorfolioProps {
  manualPortfolio: ManualPortfolio;
  totalValue: number;
}
const DisplayManualPorfolio: FC<DisplayManualPorfolioProps> = ({
  manualPortfolio,
  totalValue,
}) => {
  return (
    <Card.Root width="60%">
      <Card.Header
        borderBottomWidth="2px"
        borderColor="gray.400"
        pb="4"
        display="flex"
        flexDir="row"
      >
        <Link href="/portfolio">
          <Button>
            <ArrowLeft className="text-blue-500 cursor-pointer" />
          </Button>
        </Link>
        <Text
          className={quicksand.className}
          fontSize="2xl"
          fontWeight={"bold"}
        >
          Summary
        </Text>
      </Card.Header>
      <Card.Body display="flex" flexDir="column" gap="8">
        <Flex
          pb="6"
          borderWidth={1}
          borderColor="black"
          borderRadius="xl"
          px="4"
          py="2"
          bgColor="blue.50"
          fontWeight={"bold"}
          flexDir="column"
          gap="6"
        >
          <Flex gap="2" py="4">
            <Text w="48" className={raleway.className}>
              Estimated Total Value:
            </Text>
            <Text className={quicksand.className}>
              ${totalValue.toFixed(2)}
            </Text>
          </Flex>
          <AdjustCash
            name={manualPortfolio.name}
            liquidCash={manualPortfolio.totalCash}
          />
        </Flex>

        <Flex
          pb="6"
          flexDirection="column"
          gap="2"
          borderWidth={1}
          borderColor="black"
          borderRadius="xl"
          px="4"
          py="2"
          bgColor="green.50"
        >
          <Flex className={quicksand.className} alignItems={"center"} gap="2">
            <Text fontWeight="bold" fontSize="xl">
              Liquid Cash
            </Text>
            <Tooltip content="Liquid cash is the amount of buffer money put aside as a buffer">
              <Info color="black" size="20" className="cursor-pointer" />
            </Tooltip>
          </Flex>
          <Flex
            fontSize="md"
            fontWeight={"semibold"}
            gap="4"
            alignItems={"center"}
          >
            <Text w="48" className={raleway.className}>
              Currently Available:
            </Text>
            <Text
              px="8"
              borderRadius="xl"
              py="1"
              fontSize="lg"
              className={quicksand.className}
            >
              $ {manualPortfolio.totalCash.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gap="4"
          borderWidth={1}
          borderColor="black"
          borderRadius="xl"
          px="4"
          py="2"
          bgColor="blue.50"
        >
          <Text
            fontWeight="bold"
            fontSize="xl"
            className={quicksand.className}
            borderBottomWidth={1}
            borderColor="gray.400"
            pb="3"
          >
            Assets
          </Text>
          <List.Root
            display="flex"
            flexDir="row"
            gap={12}
            p={4}
            flexWrap={"wrap"}
          >
            {manualPortfolio.assets.map((asset) => (
              <Asset asset={asset} key={asset.name} />
            ))}
          </List.Root>
        </Flex>
      </Card.Body>
      <Card.Footer
        borderBottomWidth="2px"
        borderColor="gray.400"
        display="flex"
        flexDir="row"
        justifyContent={"center"}
      >
        <Link
          href={`/portfolio/manual-portfolio/${manualPortfolio.name}/update`}
        >
          <Button
            className={raleway.className}
            fontSize="lg"
            fontWeight={"semibold"}
            backgroundColor={"blue.50"}
            cursor={"pointer"}
            _hover={{ bg: "blue.100" }}
            px="8"
            py="4"
            borderRadius={"lg"}
          >
            Update
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
};

const Asset = ({ asset }: { asset: ManualPortfolioAsset }) => {
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latestPrice, setLatestPrice] = useState(0);
  const [history, setHistory] = useState<AssetPriceHistory>([]);
  const fetch = async () => {
    setIsLoading(true);
    const [desc, latestPrice, history] = await Promise.all([
      getAssetDescription(asset.symbol),
      getAssetPrice(asset.symbol),
      getAssetHistory(asset.symbol),
    ]);

    setDesc(desc);
    setLatestPrice(latestPrice);
    setHistory(history);
    setIsLoading(false);
  };
  return (
    <List.Item>
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
            gap="8"
          >
            <Flex gap="4" flexDir="column">
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
                <Text w="40">Average Price:</Text>
                {isLoading ? (
                  <ClipLoader size={25} />
                ) : (
                  <Text>${asset.avgBuyPrice.toFixed(2)}</Text>
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
                <PriceChart
                  data={history}
                  totalInvested={asset.totalInvested}
                />
              </Flex>
            </Flex>
          </DialogBody>
          <DialogFooter className={raleway.className} fontWeight={"semibold"}>
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

export default DisplayManualPorfolio;
