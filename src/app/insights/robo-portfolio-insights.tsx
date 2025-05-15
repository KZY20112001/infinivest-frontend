"use client";
import { FC, useMemo, useState } from "react";
import NextLink from "next/link";

import ReactMarkdown from "react-markdown";
import { Flex, Stack, Text, Link as ChakraLink, Box } from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

import { RoboPortfolio, RoboPortfolioSummary } from "@/types/robo-portfolio";

import { quicksand, raleway } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import {
  getPortfolioSummaryInsights,
  getPortfolioTopInsights,
} from "@/app/api/insights";

interface RoboPortfolioInsightsProps {
  summary: RoboPortfolioSummary;
  portfolio: RoboPortfolio;
}

const RoboPortfolioInsights: FC<RoboPortfolioInsightsProps> = ({
  portfolio,
  summary,
}) => {
  const { totalValue, totalInvested } = summary;
  const gainOrLossPercentage =
    ((totalValue - totalInvested) / totalInvested) * 100;

  const [summaryInsights, setSummaryInsights] = useState("");
  const [topInsights, setTopInsights] = useState("");
  const [isLoading, setIsLoading] = useState({ summary: false, top: false });

  const isGain = gainOrLossPercentage >= 0;

  const assets = useMemo(() => {
    const assets: {
      name: string;
      symbol: string;
      sharesOwned: number;
      avgBuyPrice: number;
    }[] = [];
    for (const category of portfolio.categories) {
      if (category.name === "cash") continue;
      for (const asset of category.assets) {
        assets.push({
          name: asset.name,
          symbol: asset.symbol,
          sharesOwned: asset.sharesOwned,
          avgBuyPrice: asset.avgBuyPrice,
        });
      }
    }
    return assets;
  }, [portfolio]);
  const handleSummaryClick = async () => {
    setIsLoading((prev) => ({
      ...prev,
      summary: true,
    }));
    const message = await getPortfolioSummaryInsights(
      totalValue,
      gainOrLossPercentage,
      assets
    );
    setSummaryInsights(message);
    setIsLoading((prev) => ({
      ...prev,
      summary: false,
    }));
  };

  const handleTopClick = async () => {
    setIsLoading((prev) => ({
      ...prev,
      top: true,
    }));
    const message = await getPortfolioTopInsights(assets);
    setTopInsights(message);
    setIsLoading((prev) => ({
      ...prev,
      top: false,
    }));
  };
  return (
    <Flex flexDir="column">
      <Stack
        borderWidth="1px"
        rounded="lg"
        p="4"
        boxShadow="md"
        bg="gray.50"
        mb="6"
      >
        <Text fontWeight="bold" className={raleway.className}>
          Summary
        </Text>
        <Flex gap="2">
          <Text w="40" className={raleway.className} fontWeight="semibold">
            Current Value:
          </Text>
          <Text fontWeight="bold">${totalValue.toFixed(2)}</Text>
        </Flex>
        <Flex gap="2">
          <Text w="40" className={raleway.className} fontWeight="semibold">
            Estimated ROI:
          </Text>
          <Text fontWeight="bold" color={isGain ? "green.500" : "red.500"}>
            {isGain ? "Gain" : "Loss"} ({gainOrLossPercentage.toFixed(2)}%)
          </Text>
        </Flex>
        <Button
          onClick={handleSummaryClick}
          variant="outline"
          bgColor="green.50"
          px="4"
          py="1"
          w="28"
          borderRadius={"lg"}
          disabled={isLoading.summary}
          className={raleway.className}
          rounded="lg"
          fontWeight="semibold"
        >
          {isLoading.summary ? <ClipLoader size={25} /> : "Get Insights"}
        </Button>
        {summaryInsights !== "" && (
          <Text
            bgColor="gray.100"
            p="4"
            rounded={"lg"}
            className={quicksand.className}
            maxH="10rem"
            overflowY="scroll"
          >
            {summaryInsights}
          </Text>
        )}
      </Stack>

      <Stack
        borderWidth="1px"
        rounded="lg"
        p="4"
        boxShadow="md"
        bg="gray.50"
        mb="6"
      >
        <Text fontWeight="bold" className={raleway.className}>
          Assets
        </Text>

        <Button
          onClick={handleTopClick}
          variant="outline"
          bgColor="green.50"
          px="4"
          py="1"
          w="28"
          borderRadius={"lg"}
          disabled={isLoading.top}
          className={raleway.className}
          rounded="lg"
          fontWeight="semibold"
        >
          {isLoading.top ? <ClipLoader size={25} /> : "Get Insights"}
        </Button>

        {topInsights !== "" && (
          <Box
            bgColor="gray.100"
            p="4"
            rounded={"lg"}
            className={quicksand.className}
            maxH="20rem"
            overflowY="scroll"
          >
            <ReactMarkdown>{topInsights}</ReactMarkdown>
          </Box>
        )}
      </Stack>
      <ChakraLink
        asChild
        as="button"
        bgColor="blue.100"
        px="4"
        py="2"
        w="80"
        display="flex"
        justifyContent="center"
        ml="auto"
        mr="auto"
        rounded="lg"
        fontWeight="semibold"
        className={raleway.className}
      >
        <NextLink href="/portfolio/robo-portfolio">
          Go to Robo-Portfolio
        </NextLink>
      </ChakraLink>
    </Flex>
  );
};

export default RoboPortfolioInsights;
