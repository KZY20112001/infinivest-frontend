import { FC } from "react";
import { RoboPortfolioAssetSummary } from "@/types/robo-portfolio";

import { Flex, List, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import { quicksand } from "@/app/fonts";

interface DisplayAssetsProps {
  assets: RoboPortfolioAssetSummary[];
}

const DisplayAssets: FC<DisplayAssetsProps> = ({ assets }) => {
  return (
    <Flex borderRadius={"lg"} className={quicksand.className} gap="4" w={"70%"}>
      <List.Root display="flex" flexDirection="row" gap="8" overflowX="auto">
        {assets.map((asset) => (
          <Tooltip key={asset.symbol} content={asset.name}>
            <List.Item
              _hover={{ bgColor: "yellow.100", cursor: "pointer" }}
              bgColor={"yellow.50"}
              px="3"
              py="1"
              w="24"
              borderRadius="lg"
              display="flex"
              gap="3"
              fontWeight="semibold"
            >
              <Text w="16"> {asset.symbol}:</Text>
              <Text>{asset.percentage}%</Text>
            </List.Item>
          </Tooltip>
        ))}
      </List.Root>
    </Flex>
  );
};

export default DisplayAssets;
