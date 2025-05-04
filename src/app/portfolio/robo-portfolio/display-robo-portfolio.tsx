"use client";
import { FC, useMemo } from "react";
import NextLink from "next/link";
import { Link as ChakraLink, Card, Flex, Text } from "@chakra-ui/react";

import { ArrowLeft } from "lucide-react";

import { quicksand, raleway } from "@/app/fonts";
import AdjustCash from "@/app/portfolio/robo-portfolio/adjust-cash";
import DisplayCash from "@/app/portfolio/robo-portfolio/display-cash";
import DisplayCategories from "@/app/portfolio/robo-portfolio/display-categories";
import { RoboPortfolio, RoboPortfolioSummary } from "@/types/robo-portfolio";

interface DisplayRoboPortfolioProps {
  roboPortfolio: RoboPortfolio;
  roboPortfolioSummary: RoboPortfolioSummary;
}

const DisplayRoboPortfolio: FC<DisplayRoboPortfolioProps> = ({
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
        borderBottomWidth="2px"
        borderColor="gray.400"
        pb="4"
        display="flex"
        flexDir="row"
      >
        <ChakraLink asChild>
          <NextLink href="/portfolio">
            <ArrowLeft className="text-blue-500 cursor-pointer" />
          </NextLink>
        </ChakraLink>
        <Text
          className={quicksand.className}
          fontSize="2xl"
          fontWeight={"bold"}
        >
          Summary
        </Text>

        <ChakraLink
          mr="0"
          ml="auto"
          asChild
          as="button"
          bgColor="blue.100"
          px="4"
          py="2"
          rounded="lg"
          fontWeight="semibold"
          className={raleway.className}
        >
          <NextLink href="/portfolio/robo-portfolio/transactions">
            Check Transactions
          </NextLink>
        </ChakraLink>
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
            <Text>${roboPortfolioSummary.totalValue.toFixed(2)}</Text>
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

export default DisplayRoboPortfolio;
