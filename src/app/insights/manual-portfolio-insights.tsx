"use client";
import { FC, useMemo, useState } from "react";
import NextLink from "next/link";

import ReactMarkdown from "react-markdown";
import {
  Flex,
  Stack,
  Text,
  Link as ChakraLink,
  Box,
  DialogOpenChangeDetails,
} from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

import {
  ManualPortfolio,
  ManualPortfolioSummary,
} from "@/types/manual-portfolio";

import { quicksand, raleway } from "@/app/fonts";
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
import { getManualPortfolio } from "@/app/api/manual-portfolio";
import {
  getPortfolioSummaryInsights,
  getPortfolioTopInsights,
} from "@/app/api/insights";

interface ManualPortfolioProps {
  summary: ManualPortfolioSummary;
}

const ManualPortfolioInsights: FC<ManualPortfolioProps> = ({ summary }) => {
  const { totalValue, totalInvested } = summary;
  let gainOrLossPercentage;
  if (totalInvested === 0) gainOrLossPercentage = 0;
  else
    gainOrLossPercentage = ((totalValue - totalInvested) / totalInvested) * 100;
  const isGain = gainOrLossPercentage >= 0;

  const [summaryInsights, setSummaryInsights] = useState("");
  const [topInsights, setTopInsights] = useState("");
  const [isLoading, setIsLoading] = useState({
    portfolio: false,
    summary: false,
    top: false,
  });

  const [manualPortfolio, setManualPortfolio] =
    useState<ManualPortfolio | null>(null);

  const assets = useMemo(() => {
    const assets: {
      name: string;
      symbol: string;
      sharesOwned: number;
      avgBuyPrice: number;
    }[] = [];
    if (!manualPortfolio) return assets;
    for (const asset of manualPortfolio.assets) {
      assets.push({
        name: asset.name,
        symbol: asset.symbol,
        sharesOwned: asset.sharesOwned,
        avgBuyPrice: asset.avgBuyPrice,
      });
    }
    return assets;
  }, [manualPortfolio]);

  const fetchManualPortfolio = async (details: DialogOpenChangeDetails) => {
    console.log(details.open);
    if (details.open) {
      setIsLoading((prev) => ({
        ...prev,
        portfolio: true,
      }));
      const portfolio = await getManualPortfolio(summary.name);
      console.log(portfolio);
      setManualPortfolio(portfolio);
      setIsLoading((prev) => ({
        ...prev,
        portfolio: false,
      }));
    } else {
      setManualPortfolio(null);
    }
  };

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
    <Stack
      key={summary.name}
      borderWidth="1px"
      rounded="lg"
      p="4"
      boxShadow="md"
      bg="gray.50"
      w="25rem"
      gap="4"
    >
      <Text
        className={quicksand.className}
        ml="auto"
        mr="auto"
        fontWeight={"bold"}
      >
        {summary.name}
      </Text>
      <Flex gap="2">
        <Text w="28" className={raleway.className} fontWeight="semibold">
          Current Value:
        </Text>
        <Text fontWeight="bold">${totalValue.toFixed(2)}</Text>
      </Flex>

      <Flex gap="2">
        <Text w="28" className={raleway.className} fontWeight="semibold">
          Estimated ROI:
        </Text>
        <Text fontWeight="bold" color={isGain ? "green.500" : "red.500"}>
          {isGain ? "Gain" : "Loss"} ({gainOrLossPercentage.toFixed(2)}%)
        </Text>
      </Flex>

      <DialogRoot onOpenChange={fetchManualPortfolio} size={"xl"}>
        <DialogTrigger asChild>
          <Button
            bgColor="blue.100"
            px="4"
            py="2"
            w="40"
            display="flex"
            justifyContent="center"
            ml="auto"
            mr="auto"
            rounded="lg"
            fontWeight="semibold"
            className={raleway.className}
          >
            Insights
          </Button>
        </DialogTrigger>
        <DialogContent color="black">
          <DialogHeader>
            <DialogTitle
              className={quicksand.className}
              fontSize="xl"
              fontWeight={"bold"}
              borderBottomWidth="2px"
              borderColor="black"
              pb="3"
            >
              Insights
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            className={raleway.className}
            display="flex"
            flexDir="column"
            gap="8"
          >
            {isLoading.portfolio ? (
              <ClipLoader size={25} />
            ) : (
              <>
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
                    <Text
                      w="40"
                      className={raleway.className}
                      fontWeight="semibold"
                    >
                      Current Value:
                    </Text>
                    <Text fontWeight="bold">${totalValue.toFixed(2)}</Text>
                  </Flex>
                  <Flex gap="2">
                    <Text
                      w="40"
                      className={raleway.className}
                      fontWeight="semibold"
                    >
                      Estimated ROI:
                    </Text>
                    <Text
                      fontWeight="bold"
                      color={isGain ? "green.500" : "red.500"}
                    >
                      {isGain ? "Gain" : "Loss"} (
                      {gainOrLossPercentage.toFixed(2)}%)
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
                    {isLoading.summary ? (
                      <ClipLoader size={25} />
                    ) : (
                      "Get Insights"
                    )}
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
              </>
            )}
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
            <ChakraLink
              asChild
              as="button"
              bgColor="blue.100"
              px="4"
              py="2"
              w="40"
              display="flex"
              justifyContent="center"
              ml="auto"
              mr="auto"
              rounded="lg"
              fontWeight="semibold"
              className={raleway.className}
            >
              <NextLink href={`/portfolio/manual-portfolio/${summary.name}`}>
                Go to {summary.name}
              </NextLink>
            </ChakraLink>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
};

export default ManualPortfolioInsights;
