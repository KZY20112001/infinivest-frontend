import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Flex, Text } from "@chakra-ui/react";

import { getManualPortfolio } from "@/app/api/manual-portfolio";
import { raleway } from "@/app/fonts";
import UpdateManualPortfolio from "@/app/portfolio/manual-portfolio/[slug]/update/update-manual-portfolio";

export const metadata: Metadata = {
  title: "Infinivest | Manual Portfolio",
  description: "Your Manual Portfolio",
};

const UpdateManualPortfolioPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const manualPortfolio = await getManualPortfolio(slug);
  if (!manualPortfolio) {
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
        {manualPortfolio.name}
      </Text>
      <UpdateManualPortfolio manualPortfolio={manualPortfolio} />
    </Flex>
  );
};

export default UpdateManualPortfolioPage;
