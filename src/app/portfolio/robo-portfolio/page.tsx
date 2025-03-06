import { Metadata } from "next";
import { redirect } from "next/navigation";

import { FaArrowRight } from "react-icons/fa";
import { Card, Flex, Text, Button } from "@chakra-ui/react";

import { fetchRoboPortfolio } from "@/app/api/robo-portfolio";
import { geistMono, quicksand, raleway } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Robo-advised Portfolio",
};

const RoboPortfolio = async () => {
  const roboPortfolio = await fetchRoboPortfolio();
  if (!roboPortfolio) {
    redirect("/portfolio/robo-portfolio/create");
  }
  console.log(roboPortfolio);
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
            <FaArrowRight className="text-blue-500 cursor-pointer" />
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
              <Text className={quicksand.className}>test</Text>
              <Text className={geistMono.className}>test</Text>
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
            <Card.Root
              borderRadius="xl"
              _hover={{ bg: "blue.100" }}
              className="group"
              backgroundColor="blue.50"
            >
              <Card.Header
                fontSize="xl"
                fontWeight="semibold"
                className={raleway.className}
                _groupHover={{ fontWeight: "bold" }}
                display="flex"
                flexDir="row"
                justifyContent="space-between"
              >
                <Text>My Portfolio 1</Text>
                <FaArrowRight className="text-blue-500 cursor-pointer" />
              </Card.Header>
              <Card.Body
                display="flex"
                flexDir="row"
                justifyContent={"space-between"}
                _groupHover={{ fontWeight: "semibold" }}
              >
                <p />
                <Text className={geistMono.className}>
                  Current Estimated Value: $1000
                </Text>
              </Card.Body>
            </Card.Root>
          </Card.Body>
          <Card.Footer display={"flex"} justifyContent={"center"}>
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
              Add a new manual portfolio
            </Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Flex>
  );
};

export default RoboPortfolio;
