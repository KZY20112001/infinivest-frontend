"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Box, IconButton } from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";

import { PUBLIC_ROUTES } from "@/config";
import ChatWindow from "@/app/_components/chat/chat-window";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <Box position="fixed" bottom="8" right="8" zIndex="1000" display="relative">
      <IconButton
        aria-label="Chat"
        borderRadius="full"
        size="xl"
        boxShadow="md"
        bgColor="blue.100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="invert" />
      </IconButton>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

export default Chat;
