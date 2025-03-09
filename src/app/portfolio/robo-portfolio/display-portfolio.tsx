"use client";
import { FC, useMemo } from "react";

import { Card, Flex, Text } from "@chakra-ui/react";

import { quicksand } from "@/app/fonts";

import AdjustCash from "@/app/portfolio/robo-portfolio/adjust-cash";
import DisplayCash from "@/app/portfolio/robo-portfolio/display-cash";
import DisplayCategories from "@/app/portfolio/robo-portfolio/display-categories";

import { RoboPortfolio, RoboPortfolioSummary } from "@/types/robo-portfolio";

interface DisplayPortfolioProps {
  roboPortfolio: RoboPortfolio;
  roboPortfolioSummary: RoboPortfolioSummary;
}

const DisplayPortfolio: FC<DisplayPortfolioProps> = ({
  roboPortfolio,
  roboPortfolioSummary,
}) => {
  const cashCategory = useMemo(
    () =>
      roboPortfolio.categories.find((category) => category.name === "cash")!,
    [roboPortfolio]
  );
  return (
    <Card.Root width="60%">
      <Card.Header
        className={quicksand.className}
        fontSize="2xl"
        fontWeight={"bold"}
        borderBottomWidth="2px"
        borderColor="gray.400"
        pb="4"
      >
        Summary
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
          className={quicksand.className}
          flexDir="column"
          gap="6"
        >
          <Flex gap="2">
            <Text w="48">Estimated Total Value: </Text>
            <Text>
              $
              {Math.round(
                (roboPortfolioSummary.totalValue + Number.EPSILON) * 100
              ) / 100}
            </Text>
          </Flex>

          <Flex gap="2">
            <Text w="48">Auto-Rebalances: </Text>
            <Text>{roboPortfolio.rebalanceFreq}</Text>
          </Flex>
          <AdjustCash />
        </Flex>
        <DisplayCash
          cash={cashCategory.totalAmount}
          totalPercentage={cashCategory.totalPercentage}
        />
        <DisplayCategories roboPortfolio={roboPortfolio} />
      </Card.Body>
      <Card.Footer display="flex" gap="8"></Card.Footer>
    </Card.Root>
  );
};

export default DisplayPortfolio;
