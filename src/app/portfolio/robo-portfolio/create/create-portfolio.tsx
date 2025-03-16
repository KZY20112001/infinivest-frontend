"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

import { Card, Flex, NativeSelect, Text, Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

import {
  ROBO_CATEGORY,
  RoboPortfolioCategoryAssets,
  RoboPortfolioSplit,
} from "@/types/robo-portfolio";
import GeneratePortfolioSplit from "@/app/portfolio/robo-portfolio/create/generate-portfolio-split";
import GenerateAssets from "@/app/portfolio/robo-portfolio/create/generate-assets";
import { quicksand, raleway } from "@/app/fonts";
import { createRoboPortfolio } from "@/app/api/robo-portfolio";

const CreatePortfolio = () => {
  const router = useRouter();
  const [portfolioSplit, setPortfolioSplit] = useState<RoboPortfolioSplit>({
    largeCapBlend: 0,
    smallCapBlend: 0,
    internationalStocks: 0,
    emergingMarkets: 0,
    intermediateBonds: 0,
    internationalBonds: 0,
    cash: 0,
  });
  const [portfolioAssets, setPortfolioAssets] = useState<
    Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>
  >({} as Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>);
  const totalPercentage = useMemo(
    () => Object.values(portfolioSplit).reduce((sum, value) => sum + value, 0),
    [portfolioSplit]
  );
  const [recommendationReason, setRecommendationReason] = useState<string>("");
  const [rebalanceFreq, setRebalanceFreq] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const isSuccessful = await createRoboPortfolio(
      rebalanceFreq,
      portfolioSplit,
      portfolioAssets
    );
    setIsLoading(false);
    if (isSuccessful) {
      toast("Robo-Portfolio Created Successfully");
      setTimeout(() => {
        router.push("/portfolio/robo-portfolio");
      }, 1000);
    } else {
      toast("Failed to create Robo-Portfolio");
    }
  };
  return (
    <Flex flexDirection="column" w="60%" gap="4">
      <ToastContainer />
      <GeneratePortfolioSplit
        setPortfolioSplit={setPortfolioSplit}
        setRecommendationReason={setRecommendationReason}
      />
      <Flex bgColor="blue.50" borderRadius={"lg"}>
        <GenerateAssets
          portfolioSplit={portfolioSplit}
          setPortfolioSplit={setPortfolioSplit}
          recommendationReason={recommendationReason}
          portfolioAssets={portfolioAssets}
          setPortfolioAssets={setPortfolioAssets}
        />
      </Flex>

      <Card.Root borderRadius={"lg"} bgColor="blue.50">
        <Card.Body display="flex" flexDir="row" gap="40">
          <Flex
            alignItems={"center"}
            w="50%"
            gap="4"
            borderRightWidth="2px"
            borderColor="gray.400"
          >
            <Text className={raleway.className} fontWeight={"semibold"}>
              Rebalance Frequency
            </Text>
            <NativeSelect.Root w="40">
              <NativeSelect.Field
                className={quicksand.className}
                placeholder="Select"
                onChange={(event) => setRebalanceFreq(event.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="biannually">Bi-Annually</option>
                <option value="annually">Annually</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
          <Button
            backgroundColor={totalPercentage !== 100 ? "red.50" : "green.50"}
            disabled={
              totalPercentage !== 100 || rebalanceFreq === "" || isLoading
            }
            px="4"
            py="6"
            w="72"
            onClick={handleClick}
            className={raleway.className}
            fontSize="sm"
            fontWeight={"semibold"}
          >
            {isLoading ? <ClipLoader size={25} /> : "Create Robo-Portfolio"}
          </Button>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default CreatePortfolio;
