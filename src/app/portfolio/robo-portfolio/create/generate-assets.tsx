import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Button, Flex, Input, List, Text } from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

import { quicksand, raleway } from "@/app/fonts";
import {
  ROBO_CATEGORY,
  RoboPortfolioCategoryAssets,
  RoboPortfolioSplit,
} from "@/types/robo-portfolio";

import { InputGroup } from "@/components/ui/input-group";
import { Tooltip } from "@/components/ui/tooltip";
import { generatePortfolioAssets } from "@/app/api/robo-portfolio";
import DisplayAssets from "./display-assets";

interface GenerateAssetsProps {
  recommendationReason: string;

  portfolioSplit: RoboPortfolioSplit;
  setPortfolioSplit: Dispatch<SetStateAction<RoboPortfolioSplit>>;

  portfolioAssets: Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>;
  setPortfolioAssets: Dispatch<
    SetStateAction<Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>>
  >;
}
const camelToSnake = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};

const GenerateAssets: FC<GenerateAssetsProps> = ({
  portfolioSplit,
  setPortfolioSplit,
  recommendationReason,

  portfolioAssets,
  setPortfolioAssets,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalPercentage = useMemo(
    () => Object.values(portfolioSplit).reduce((sum, value) => sum + value, 0),
    [portfolioSplit]
  );
  const handleInputChange = (
    category: keyof RoboPortfolioSplit,
    value: string
  ) => {
    const newValue = parseFloat(value) || 0;
    setPortfolioSplit({ ...portfolioSplit, [category]: newValue });
  };
  const handleClick = async () => {
    setIsLoading(true);
    const assets = await generatePortfolioAssets(portfolioSplit);
    if (assets) setPortfolioAssets(assets);
    setIsLoading(false);
  };
  return (
    <Flex
      flexDirection="column"
      color="black"
      py="4"
      px="8"
      borderRadius="md"
      w="full"
    >
      <Text
        className={raleway.className}
        fontWeight="bold"
        fontSize="lg"
        mb="4"
      >
        Recommended Allocation for Each Category (%)
      </Text>

      <Flex flexDirection="column" gap="4">
        {recommendationReason !== "" && (
          <Text className={quicksand.className} fontWeight="semibold">
            {recommendationReason}
          </Text>
        )}
        <List.Root flexDirection="column" gap="4">
          {Object.entries(portfolioSplit).map(([category, percentage]) => {
            const roboCategory = camelToSnake(category) as ROBO_CATEGORY;
            const categoryAssets = portfolioAssets[roboCategory];
            return (
              <List.Item
                display="flex"
                flexDir="column"
                key={category}
                borderBottomWidth="1px"
                borderColor="gray.400"
                pb="2"
              >
                <Flex gap={16} alignItems="center">
                  <Flex w="16rem">
                    <Text
                      width={48}
                      fontWeight="semibold"
                      textTransform="capitalize"
                      className={quicksand.className}
                    >
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </Text>
                    <InputGroup endElement="%">
                      <Input
                        className={quicksand.className}
                        type="number"
                        fontWeight="semibold"
                        value={percentage}
                        onChange={(e) =>
                          handleInputChange(
                            category as keyof RoboPortfolioSplit,
                            e.target.value
                          )
                        }
                        px="2"
                        min="0"
                        max="100"
                        width={20}
                        height={4}
                      />
                    </InputGroup>
                  </Flex>
                  {categoryAssets && (
                    <DisplayAssets assets={categoryAssets.assets} />
                  )}
                </Flex>
                {categoryAssets && categoryAssets.reason !== "" && (
                  <Text
                    bgColor="green.50"
                    rounded="lg"
                    className={raleway.className}
                    fontWeight="semibold"
                    h="5rem"
                    my="2"
                    mx="8"
                    px="4"
                    py="2"
                    overflow={"scroll"}
                  >
                    {categoryAssets.reason}
                  </Text>
                )}
              </List.Item>
            );
          })}
        </List.Root>
        <Tooltip
          disabled={totalPercentage === 100}
          content={`Total percentage should be 100% (currently at ${totalPercentage}%)`}
        >
          <Button
            backgroundColor={totalPercentage !== 100 ? "red.50" : "green.50"}
            disabled={totalPercentage !== 100 || isLoading}
            px="4"
            py="6"
            w="72"
            onClick={handleClick}
            className={raleway.className}
            fontSize="sm"
            fontWeight={"semibold"}
          >
            {isLoading ? <ClipLoader size={25} /> : "Generate Asset Allocation"}
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default GenerateAssets;
