import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Flex, Text } from "@chakra-ui/react";

import {
  fetchRoboPortfolio,
  fetchRoboPortfolioSummary,
} from "@/app/api/robo-portfolio";
import { raleway } from "@/app/fonts";

import DisplayPortfolio from "@/app/portfolio/robo-portfolio/display-portfolio";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Robo-advised Portfolio",
};

const RoboPortfolio = async () => {
  const roboPortfolio = await fetchRoboPortfolio();
  const roboPortfolioSummary = await fetchRoboPortfolioSummary();
  if (!roboPortfolio || !roboPortfolioSummary) {
    redirect("/portfolio/robo-portfolio/create");
  }

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
        Robo-Advised Portfolio Details
      </Text>
      <DisplayPortfolio
        roboPortfolio={roboPortfolio}
        roboPortfolioSummary={roboPortfolioSummary}
      />
    </Flex>
  );
};

export default RoboPortfolio;
