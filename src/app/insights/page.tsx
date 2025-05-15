import { Metadata } from "next";
import NextLink from "next/link";

import { Card, Flex, Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";

import {
  getRoboPortfolio,
  getRoboPortfolioSummary,
} from "@/app/api/robo-portfolio";

import { getManualPortfolios } from "@/app/api/manual-portfolio";
import RoboPortfolioInsights from "./robo-portfolio-insights";
import ManualPortfolioInsights from "./manual-portfolio-insights";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Infinivest | Insights",
  description: "Insights",
};

const Insights = async () => {
  const roboPortfolio = await getRoboPortfolio();
  const roboPortfolioSummary = await getRoboPortfolioSummary();
  const manualPortfolios = await getManualPortfolios();

  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      flexDirection="column"
      py="4"
      gap="6"
    >
      <Text
        className={raleway.className}
        fontWeight={"bold"}
        fontSize={"3xl"}
        color="black"
      >
        Insights
      </Text>
      <Card.Root w="100%" maxW="4xl">
        <ChakraLink asChild position="absolute" left="4" top="4">
          <NextLink href="/home">
            <ArrowLeft className="text-blue-500 cursor-pointer" />
          </NextLink>
        </ChakraLink>
        <Card.Title
          borderBottom="1px solid black"
          className={quicksand.className}
          fontSize="xl"
          fontWeight={"semibold"}
          p="4"
          display="flex"
          justifyContent={"center"}
        >
          Robo-Portfolio Insights
        </Card.Title>
        <Card.Body p="4">
          {roboPortfolio && roboPortfolioSummary ? (
            <RoboPortfolioInsights
              summary={roboPortfolioSummary}
              portfolio={roboPortfolio}
            />
          ) : (
            <Flex justify="center" align={"center"} gap="6">
              <Text fontWeight="semibold" className={raleway.className}>
                You do not a robo-portfolio yet.
              </Text>

              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/portfolio/robo-portfolio/create">
                  Create Robo-Portfolio
                </NextLink>
              </ChakraLink>
            </Flex>
          )}
        </Card.Body>
      </Card.Root>
      <Card.Root w="100%" maxW="4xl">
        <Card.Title
          borderBottom="1px solid black"
          className={quicksand.className}
          fontSize="xl"
          fontWeight={"semibold"}
          p="4"
          display="flex"
          justifyContent={"center"}
        >
          Manual-Portfolios Insights
        </Card.Title>
        <Card.Body p="4">
          {manualPortfolios.length > 0 ? (
            <Flex gap="8" flexWrap="wrap">
              {manualPortfolios.map((portfolio, index) => (
                <ManualPortfolioInsights
                  summary={portfolio}
                  key={portfolio.name + index}
                />
              ))}
            </Flex>
          ) : (
            <Flex justify="center" align={"center"} gap="6">
              <Text fontWeight="semibold" className={raleway.className}>
                You do not manual-portfolios. Add them first.
              </Text>

              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/portfolio">Go to Manual-Portfolios</NextLink>
              </ChakraLink>
            </Flex>
          )}
        </Card.Body>
      </Card.Root>{" "}
    </Flex>
  );
};

export default Insights;
