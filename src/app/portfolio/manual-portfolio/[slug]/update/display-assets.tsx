import { FC } from "react";

import { Flex, List, Text } from "@chakra-ui/react";
import { Info } from "lucide-react";

import { quicksand, raleway } from "@/app/fonts";
import ManualAsset from "@/app/portfolio/manual-portfolio/[slug]/update/manual-asset";
import { ManualPortfolioAsset } from "@/types/manual-portfolio";
import { Tooltip } from "@/components/ui/tooltip";

interface DisplayAssetsProps {
  assets: ManualPortfolioAsset[];
  portfolioName: string;
}
const DisplayAssets: FC<DisplayAssetsProps> = ({ assets, portfolioName }) => {
  return (
    <Flex flexDir="column">
      <Flex
        borderBottomWidth={2}
        borderColor="black"
        pb="2"
        alignItems={"center"}
        gap="4"
      >
        <Text fontSize="xl" className={raleway.className} fontWeight="bold">
          Assets
        </Text>
        <Tooltip content="Click on individual assets to see the details and sell them">
          <Info className="cursor-pointer" />
        </Tooltip>
      </Flex>
      {assets.length > 0 ? (
        <List.Root
          display="flex"
          flexDir="row"
          gap={12}
          p={4}
          flexWrap={"wrap"}
        >
          {assets.map((asset) => (
            <ManualAsset
              asset={asset}
              key={asset.name}
              portfolioName={portfolioName}
            />
          ))}
        </List.Root>
      ) : (
        <Text fontWeight="bold" className={quicksand.className}>
          Currently you have no assets.
        </Text>
      )}
    </Flex>
  );
};

export default DisplayAssets;
