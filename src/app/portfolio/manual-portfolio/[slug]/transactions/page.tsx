import { Metadata } from "next";
import { Flex, Text } from "@chakra-ui/react";

import {
  getManualPortfolio,
  getManualPortfolioTransactions,
} from "@/app/api/manual-portfolio";
import { redirect } from "next/navigation";
import { raleway } from "@/app/fonts";
import DisplayTransactions from "@/app/portfolio/manual-portfolio/[slug]/transactions/display-ransactions";

export const metadata: Metadata = {
  title: "Infinivest | Robo-Portfolio",
  description: "Manual Portfolio",
};

const ManualPortfolioTransactions = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const manualPortfolio = await getManualPortfolio(slug);
  if (!manualPortfolio) {
    redirect("/portfolio");
  }
  const transactions = await getManualPortfolioTransactions(slug);
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
        {slug} Transaction History
      </Text>
      <DisplayTransactions name={slug} transactions={transactions} />
    </Flex>
  );
};

export default ManualPortfolioTransactions;
