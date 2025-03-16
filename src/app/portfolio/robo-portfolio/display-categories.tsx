import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { BsInfoCircle } from "react-icons/bs";

import { quicksand } from "@/app/fonts";
import DisplayCategory from "@/app/portfolio/robo-portfolio/display-category";
import { Tooltip } from "@/components/ui/tooltip";
import { AccordionRoot } from "@/components/ui/accordion";
import { RoboPortfolio } from "@/types/robo-portfolio";

interface DisplayCategoriesProps {
  roboPortfolio: RoboPortfolio;
}

const DisplayCategories: FC<DisplayCategoriesProps> = ({ roboPortfolio }) => {
  return (
    <Flex
      flexDirection="column"
      gap="4"
      borderWidth={1}
      borderColor="black"
      borderRadius="xl"
      px="4"
      py="2"
      bgColor="blue.50"
    >
      <Flex className={quicksand.className} alignItems={"center"} gap="2">
        <Text fontWeight="bold" fontSize="xl">
          Assets
        </Text>
        <Tooltip content="Summary of your assets">
          <BsInfoCircle color="black" size="20" className="cursor-pointer" />
        </Tooltip>
      </Flex>

      <AccordionRoot
        collapsible
        multiple
        display="flex"
        flexDir="column"
        gap={4}
        mb="2"
      >
        {roboPortfolio.categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => {
            if (category.name === "cash") return null;
            return <DisplayCategory key={category.name} category={category} />;
          })}
      </AccordionRoot>
    </Flex>
  );
};

export default DisplayCategories;
