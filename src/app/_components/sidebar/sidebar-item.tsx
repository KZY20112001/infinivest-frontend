import Link from "next/link";
import { FlexProps, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { quicksand } from "@/app/fonts";

interface SidebarItemProps extends FlexProps {
  CustomIcon: IconType;
  href: string;
  text: string;
  isActive: boolean;
}

const SidebarItem = ({
  CustomIcon,
  text,
  href,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? "cyan.200" : "transparent"}
        _hover={{
          bg: isActive ? "cyan.200" : "green.100",
          color: "white",
        }}
      >
        <Icon mr={"4"} fontSize="16" color="black">
          <CustomIcon />
        </Icon>
        <Text
          className={quicksand.className}
          fontWeight={"semibold"}
          color="black"
        >
          {text}
        </Text>
      </Flex>
    </Link>
  );
};

export default SidebarItem;
