import { Flex, Text } from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";

import { quicksand, raleway } from "@/app/fonts";
import { Tooltip } from "@/components/ui/tooltip";
import { FC } from "react";

interface DisplayCashProps {
  cash: number;
  totalPercentage: number;
}

const DisplayCash: FC<DisplayCashProps> = ({ cash, totalPercentage }) => {
  return (
    <Flex
      pb="6"
      flexDirection="column"
      gap="2"
      borderWidth={1}
      borderColor="black"
      borderRadius="xl"
      px="4"
      py="2"
      bgColor="green.50"
    >
      <Flex className={quicksand.className} alignItems={"center"} gap="2">
        <Text fontWeight="bold" fontSize="xl">
          Liquid Cash
        </Text>
        <Tooltip content="Liquid cash is the amount of buffer money put aside as a buffer">
          <BsInfoCircle color="black" size="20" className="cursor-pointer" />
        </Tooltip>
      </Flex>
      <Flex
        fontSize="md"
        fontWeight={"semibold"}
        gap="4"
        alignItems={"center"}
        className={raleway.className}
      >
        <Text w="48">Currently Available:</Text>
        <Text px="8" borderRadius="xl" py="1" fontSize="lg">
          $ {cash}
        </Text>

        {cash < 50 && (
          <Text
            color="red.400"
            fontSize="sm"
            px="5"
            borderBottomRadius="xl"
            borderTopRightRadius="xl"
            py="1"
            borderWidth="1px"
            borderColor="gray.200"
          >
            Your liquid cash is too low! Deposit More Money into the portfolio
            to avoid potential issues when rebalancing
          </Text>
        )}
      </Flex>
      <Flex
        fontSize="md"
        fontWeight={"semibold"}
        gap="4"
        alignItems={"center"}
        className={raleway.className}
      >
        <Text w="48">Allocated Percentage:</Text>
        <Text px="8" py="1" fontSize="lg">
          {totalPercentage} %
        </Text>
      </Flex>
    </Flex>
  );
};

export default DisplayCash;
