import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  fetchManualPortfolio,
  fetchManualPortfolioValue,
} from "@/app/api/manual-portfolio";
import { Flex, Text } from "@chakra-ui/react";
import { raleway } from "@/app/fonts";
import DisplayManualPorfolio from "./display-manual-portfolio";

export const metadata: Metadata = {
  title: "Infinivest | Manual Portfolio",
  description: "Your Manual Portfolio",
};

const ManualPortfolio = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const manualPortfolio = await fetchManualPortfolio(slug);
  const totalValue = await fetchManualPortfolioValue(slug);
  if (!manualPortfolio || totalValue === -1) {
    redirect("/portfolio");
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
        Portfolio - {manualPortfolio.name}
      </Text>
      <DisplayManualPorfolio
        manualPortfolio={manualPortfolio}
        totalValue={totalValue}
      />
    </Flex>
  );
};

export default ManualPortfolio;
