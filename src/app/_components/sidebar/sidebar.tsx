"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Box, IconButton, VStack } from "@chakra-ui/react";
import {
  Lightbulb,
  UserPen,
  House,
  DollarSign,
  ChevronLeft,
} from "lucide-react";

import { PUBLIC_ROUTES } from "@/config";
import SidebarItem from "@/app/_components/sidebar/sidebar-item";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const pathname = usePathname();

  if (PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  return (
    <Box position="fixed" left="0" w={isCollapsed ? "0rem" : "20rem"}>
      <Box
        transition="width 0.3s ease"
        w={isCollapsed ? "0rem" : "20rem"}
        position="fixed"
        h="20rem"
        bg="green.50"
        left="0"
        top="10rem"
        p={isCollapsed ? "0" : "4"}
        rounded="xl"
      >
        {!isCollapsed && (
          <VStack align="stretch" gap={4}>
            <SidebarItem
              CustomIcon={House}
              href="/home"
              text="Home"
              isActive={pathname.startsWith("/home")}
            />

            <SidebarItem
              CustomIcon={UserPen}
              href="/profile"
              text="Profile"
              isActive={pathname.startsWith("/profile")}
            />
            <SidebarItem
              CustomIcon={DollarSign}
              href="/portfolio"
              text="Portfolios"
              isActive={pathname.startsWith("/portfolio")}
            />
            <SidebarItem
              CustomIcon={Lightbulb}
              href="/insights"
              text="Insights"
              isActive={pathname.startsWith("/insights")}
            />
          </VStack>
        )}
      </Box>
      <IconButton
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        size="sm"
        position="fixed"
        top="10rem"
        left={isCollapsed ? "1rem" : "21.5rem"}
        transform="translateX(-50%)"
        transition="left 0.3s ease"
        zIndex="overlay"
        bg="green.50"
      >
        <Box
          transition="transform 0.3s ease"
          transform={!isCollapsed ? "rotate(0deg)" : "rotate(180deg)"}
          transformOrigin="center"
          color="black"
        >
          <ChevronLeft />
        </Box>
      </IconButton>
    </Box>
  );
};

export default Sidebar;
