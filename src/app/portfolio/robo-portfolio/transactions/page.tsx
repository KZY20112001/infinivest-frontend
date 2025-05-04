import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Flex, Text } from "@chakra-ui/react";

import {
  getRoboPortfolio,
  getRoboPortfolioTransactions,
} from "@/app/api/robo-portfolio";
import DisplayTransactions from "@/app/portfolio/robo-portfolio/transactions/display-transactions";
import { raleway } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Robo-advised Portfolio",
};
const RoboPortfolioTransactions = async () => {
  const roboPortfolio = await getRoboPortfolio();
  const transactions = await getRoboPortfolioTransactions();
  if (!roboPortfolio) {
    redirect("/portfolio/robo-portfolio/create");
  }
  console.log(transactions);
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
        Robo-Portfolio Transaction History
      </Text>
      <DisplayTransactions transactions={transactions} />
    </Flex>
  );
};

export default RoboPortfolioTransactions;
