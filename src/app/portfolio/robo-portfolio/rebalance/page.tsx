import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Flex, Text } from "@chakra-ui/react";

import { raleway } from "@/app/fonts";
import {
  getRebalanceEvents,
  getRoboPortfolio,
  getRoboPortfolioTransactions,
} from "@/app/api/robo-portfolio";

import DisplayRebalanceEvents from "./display-rebalance-events";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Robo-advised Portfolio",
};
const RebalanceEvents = async () => {
  const roboPortfolio = await getRoboPortfolio();
  const transactions = await getRoboPortfolioTransactions();
  if (!roboPortfolio) {
    redirect("/portfolio/robo-portfolio/create");
  }
  console.log(transactions);
  const rebalanceEvents = await getRebalanceEvents();
  console.log(rebalanceEvents);
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
        Robo-Portfolio Rebalance Events
      </Text>
      <DisplayRebalanceEvents events={rebalanceEvents} />
    </Flex>
  );
};

export default RebalanceEvents;
