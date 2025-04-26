import { Metadata } from "next";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa";
import { Card, Flex, Text } from "@chakra-ui/react";

import { fetchRoboPortfolioSummary } from "@/app/api/robo-portfolio";
import { getManualPortfolios } from "@/app/api/manual-portfolio";
import { geistMono, quicksand, raleway } from "@/app/fonts";

import CreateManualPortfolio from "@/app/portfolio/create-manual-portfolio";

export const metadata: Metadata = {
  title: "Infinivest | Portfolios",
  description: "Your Portfolios",
};

const Portfolio = async () => {
  const roboPortfolioSummary = await fetchRoboPortfolioSummary();
  const manualPortfolios = await getManualPortfolios();
  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      flexDirection="column"
      py="8"
    >
      <Text
        className={raleway.className}
        fontWeight={"bold"}
        fontSize={"3xl"}
        color="black"
        mb="12"
      >
        My Portfolios
      </Text>
      <Flex flexDirection="column" w="60%" gap="16">
        <Card.Root
          borderRadius="xl"
          _hover={{ bg: "green.100" }}
          className="group"
          backgroundColor="green.50"
        >
          <Card.Header
            fontSize="xl"
            fontWeight="bold"
            className={raleway.className}
            _groupHover={{ fontWeight: "extrabold" }}
            display="flex"
            flexDir="row"
            justifyContent="space-between"
          >
            <Text>Robo-advised Portfolio</Text>
            <Link href="/portfolio/robo-portfolio">
              <FaArrowRight className="text-blue-500 cursor-pointer" />
            </Link>
          </Card.Header>
          <Card.Body
            display="flex"
            flexDir="column"
            gap="12"
            _groupHover={{ fontWeight: "semibold" }}
          >
            <Text className={geistMono.className} fontSize="lg">
              An AI-driven portfolio that automatically manages, and rebalances
              your investments with minimal setup.
            </Text>
            <Flex justifyContent={"space-between"}>
              <Text className={geistMono.className}>
                {roboPortfolioSummary
                  ? `Auto-Rebalances ${roboPortfolioSummary?.rebalanceFreq}`
                  : ""}
              </Text>
              <Text className={geistMono.className}>
                {roboPortfolioSummary
                  ? `Current Estimated Value: $${roboPortfolioSummary?.totalValue.toFixed(
                      2
                    )}`
                  : "Set-up your Robo-advised Portfolio now!"}
              </Text>
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root
          borderRadius="xl"
          backgroundColor={"gray.50"}
          _hover={{ bg: "white" }}
        >
          <Card.Header
            className={raleway.className}
            fontSize="xl"
            fontWeight="semibold"
          >
            Manual Portfolios
          </Card.Header>

          <Card.Body mb="4" flexDir="column" gap="8">
            <Text className={geistMono.className} fontSize="lg">
              Take full control of your investments by managing assets, cash,
              and allocations yourself.
            </Text>
            {manualPortfolios.map((portfolio) => (
              <Card.Root
                key={portfolio.name}
                borderRadius="xl"
                _hover={{ bg: "blue.100" }}
                className="group"
                backgroundColor="blue.50"
              >
                <Card.Header
                  fontSize="lg"
                  fontWeight="semibold"
                  _groupHover={{ fontWeight: "bold" }}
                  display="flex"
                  flexDir="row"
                  justifyContent="space-between"
                >
                  <Text className={quicksand.className}>{portfolio.name}</Text>
                  <Link href={`/portfolio/manual-portfolio/${portfolio.name}`}>
                    <FaArrowRight className="text-blue-500 cursor-pointer" />
                  </Link>
                </Card.Header>
                <Card.Body
                  display="flex"
                  flexDir="row"
                  justifyContent={"space-between"}
                  _groupHover={{ fontWeight: "semibold" }}
                >
                  <p />
                  <Text className={geistMono.className}>
                    Current Estimated Value: ${portfolio.totalValue.toFixed(2)}
                  </Text>
                </Card.Body>
              </Card.Root>
            ))}
          </Card.Body>
          <Card.Footer display={"flex"} justifyContent={"center"}>
            <CreateManualPortfolio />
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Flex>
  );
};

export default Portfolio;
