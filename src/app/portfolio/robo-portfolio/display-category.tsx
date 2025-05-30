import { FC, useState } from "react";
import { Flex, List, Text } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
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
import { quicksand, raleway } from "@/app/fonts";
import {
  RoboPortfolioAsset,
  ROBO_CATEGORY,
  RoboPortfolioCategory,
} from "@/types/robo-portfolio";
import { AssetPriceHistory } from "@/types/asset";
import {
  getAssetDescription,
  getAssetHistory,
  getAssetPrice,
} from "@/app/api/assets";
import ClipLoader from "react-spinners/ClipLoader";
import PriceChart from "@/app/portfolio/price-chart";

interface DisplayCategoryProps {
  category: RoboPortfolioCategory;
}

const ROBO_CATEGORY_DESCRIPTIONS: Record<ROBO_CATEGORY, string> = {
  large_cap_blend:
    "Large-cap stocks are typically well-established companies with stable earnings. This category blends these stocks to offer growth with stability, often focusing on blue-chip companies.",
  small_cap_blend:
    "Small-cap stocks are known for their growth potential, though they come with higher risk. This category mixes various small-cap stocks from emerging and innovative sectors.",
  international_stocks:
    "International stocks are shares in companies outside the home country, providing exposure to global growth opportunities. Investing in this category offers diversification across different markets.",
  emerging_markets:
    "Emerging markets consist of stocks from developing economies with high growth potential. However, they carry higher risks due to political instability and economic volatility.",
  intermediate_bonds:
    "Intermediate bonds have a maturity period ranging from 5 to 10 years, providing a balance between risk and return. These bonds tend to offer more stability than long-term bonds while yielding higher returns than short-term bonds.",
  international_bonds:
    "International bonds are debt securities issued by foreign governments or corporations. They offer the opportunity to diversify risk by holding bonds from various economies with different interest rate environments.",
};

const DisplayCategory: FC<DisplayCategoryProps> = ({ category }) => {
  return (
    <AccordionItem
      key={category.name}
      value={category.name}
      borderBottomWidth={1}
      borderColor="black"
      pb="2"
    >
      <AccordionItemTrigger fontSize="md" fontWeight={"bold"} display="flex">
        <Text className={raleway.className} w="48" fontSize="lg">
          {category.name
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </Text>
        <Text className={quicksand.className}>
          {category.totalPercentage} %
        </Text>
      </AccordionItemTrigger>
      <AccordionItemContent
        className={raleway.className}
        display={"flex"}
        flexDir="column"
        gap="8"
      >
        <Text fontSize="md" fontWeight="md">
          {ROBO_CATEGORY_DESCRIPTIONS[category.name as ROBO_CATEGORY]}
        </Text>
        {category.assets.length > 0 ? (
          <>
            <Text className={quicksand.className} fontWeight={"semibold"}>
              Estimated Value: ${category.totalAmount.toFixed(2)}
            </Text>
            <List.Root display="flex" flexDir="row" gap="8" flexWrap={"wrap"}>
              {category.assets.map((asset) => (
                <Asset asset={asset} key={asset.symbol} />
              ))}
            </List.Root>
          </>
        ) : (
          <Text fontWeight={"semibold"}>
            Currently no assets allocated in this category
          </Text>
        )}
      </AccordionItemContent>
    </AccordionItem>
  );
};

const Asset: FC<{
  asset: RoboPortfolioAsset;
}> = ({ asset }) => {
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
              fontSize="md"
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
                <Text w="40">Target Allocation: </Text>
                <Text>{asset.percentage.toFixed(2)} %</Text>
              </Flex>
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
                <Text w="40">Average Price: </Text>
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

export default DisplayCategory;
