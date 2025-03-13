import { Metadata } from "next";
import Link from "next/link";

import { Flex, Text } from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";
import CreatePortfolio from "@/app/portfolio/robo-portfolio/create/create-portfolio";
import { fetchRoboPortfolioSummary } from "@/app/api/robo-portfolio";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Create Robo-advised Portfolio",
};

const CreateRoboPortfolio = async () => {
  const roboPortfolio = await fetchRoboPortfolioSummary();
  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      flexDirection="column"
      py="8"
      color="black"
    >
      <Text
        className={raleway.className}
        fontWeight={"bold"}
        fontSize={"3xl"}
        mb="12"
      >
        Set-Up Your Robo-Portfolio
      </Text>
      {roboPortfolio ? (
        <Flex
          bgColor="white"
          py="8"
          px="16"
          borderRadius={"lg"}
          flexDir="column"
          gap="8"
          alignItems={"center"}
        >
          <Text
            className={quicksand.className}
            fontWeight="semibold"
            fontSize="lg"
          >
            There is an existing Robo-Portfolio
          </Text>
          <Link href="/portfolio/robo-portfolio">
            <Button
              px="4"
              py="6"
              className={raleway.className}
              fontSize="md"
              fontWeight={"semibold"}
              bgColor={"green.50"}
            >
              Go to Robo-Portfolio
            </Button>
          </Link>
        </Flex>
      ) : (
        <CreatePortfolio />
      )}
    </Flex>
  );
};

export default CreateRoboPortfolio;
