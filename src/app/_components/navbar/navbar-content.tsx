"use client";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Popover,
  Badge,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

import { PUBLIC_ROUTES } from "@/config";
import { Button } from "@/components/ui/button";
import { quicksand, raleway } from "@/app/fonts";
import { deleteNotifications } from "@/app/api/notifications";

interface NavbarContentProps {
  notifications: string[];
}

const NavbarContent: FC<NavbarContentProps> = ({ notifications }) => {
  const pathname = usePathname();
  const router = useRouter();

  if (PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  const handleClearNotifications = async () => {
    await deleteNotifications();
    router.refresh();
  };

  const handleLogout = () => {
    router.push("/");
  };

  const handleNotificationClick = (type: string) => {
    switch (type) {
      case "rebalance":
        router.push("/portfolio/robo-portfolio");
    }
  };
  return (
    <Flex
      position="fixed"
      top="1rem"
      right="5rem"
      as="nav"
      backgroundColor="blue.50"
      rounded="lg"
      p="2"
      alignItems="center"
      gap="8"
      zIndex={1000}
    >
      <Popover.Root>
        <Popover.Trigger asChild>
          <Box position="relative">
            <IconButton aria-label="Notifications" color="blue.500">
              <FaBell />
            </IconButton>
            {notifications.length > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                fontSize="xs"
                className={raleway.className}
                fontWeight={"bold"}
                color="black"
              >
                {notifications.length}
              </Badge>
            )}
          </Box>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content
            width="28rem"
            bgColor="gray.100"
            rounded="lg"
            className={quicksand.className}
          >
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body color="black" fontWeight={"semibold"}>
              <Popover.Title
                fontWeight="semibold"
                borderBottomWidth="1px"
                pb="2"
                mb="3"
                fontSize="lg"
              >
                Notifications
              </Popover.Title>
              <Box maxH="20rem" overflowY="auto">
                {notifications.length > 0 ? (
                  <VStack gap="3">
                    {notifications.map((notification, index) => {
                      const parts = notification.split(";");
                      const timestamp = parts[0].trim();
                      const type = parts[1].trim();
                      const capitalizedType =
                        type.charAt(0).toUpperCase() + type.slice(1);

                      const message = parts.slice(2).join(";").trim();

                      const date = new Date(timestamp);
                      const formattedTime = date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const formattedDate = date.toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      });
                      return (
                        <Flex
                          key={index}
                          _hover={{ bg: "blue.50", cursor: "pointer" }}
                          py="3"
                          px="2"
                          w="full"
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          borderBottomWidth="0.5px"
                          borderColor="gray.200"
                          borderRadius="lg"
                          onClick={() => handleNotificationClick(type)}
                        >
                          <Text
                            w="5rem"
                            fontSize="xs"
                            fontWeight={"bold"}
                            borderRadius="lg"
                            color={"gray.700"}
                            bgColor="green.50"
                            display="flex"
                            justifyContent={"center"}
                            py="3"
                          >
                            {capitalizedType}
                          </Text>
                          <Text w="13rem" color="black" fontWeight={"normal"}>
                            {message}
                          </Text>
                          <Flex
                            w="4rem"
                            direction="column"
                            alignItems="flex-end"
                            fontSize="sm"
                            fontWeight={"normal"}
                            color="gray.500"
                          >
                            <Text>{formattedTime}</Text>
                            <Text>{formattedDate}</Text>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </VStack>
                ) : (
                  <Box p="3">
                    <Text>No notifications yet</Text>
                  </Box>
                )}
              </Box>
            </Popover.Body>
            <Separator borderColor={"gray.300"} borderWidth={"2px"} />
            <Popover.Footer
              color="gr"
              display={"flex"}
              justifyContent="center"
              mt="2"
            >
              <Button
                bgColor="lightblue"
                color="gray.700"
                px="4"
                py="2"
                fontWeight={"bold"}
                disabled={notifications.length === 0}
                onClick={handleClearNotifications}
              >
                Clear All
              </Button>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
      <Button
        className={raleway.className}
        fontWeight="semibold"
        color="black"
        bgColor="blue.100"
        borderColor="black"
        px="4"
        py="2"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default NavbarContent;
