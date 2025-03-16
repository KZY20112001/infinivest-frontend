"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { PiFinnTheHuman } from "react-icons/pi";
import { IoClose, IoSend } from "react-icons/io5";

import {
  Box,
  VStack,
  Input,
  Button,
  HStack,
  Text,
  Spacer,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { quicksand, raleway } from "@/app/fonts";
import { fetchProfile } from "@/app/api/profile";
import { RoboPortfolio } from "@/types/robo-portfolio";
import { Profile } from "@/types/profile";
import { ManualPortfolio } from "@/types/manual-portfolio";
import { fetchRoboPortfolio } from "@/app/api/robo-portfolio";
import { fetchManualPortfolio } from "@/app/api/manual-portfolio";

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

type Message = { role: "user" | "assistant"; content: string };

type QueryContext = {
  profile?: Profile;
  roboPortfolio?: RoboPortfolio;
  manualPortfolio?: ManualPortfolio;
};
const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = JSON.parse(
        localStorage.getItem("chatMessages") || "[]"
      );
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const additionalContext: QueryContext = {};
    const userProfile = await fetchProfile();
    if (userProfile) additionalContext.profile = userProfile;
    if (pathname.includes("/robo-portfolio")) {
      const roboPortfolioData = await fetchRoboPortfolio();
      if (roboPortfolioData)
        additionalContext.roboPortfolio = roboPortfolioData;
    } else if (pathname.includes("/manual-portfolio")) {
      const segments = pathname?.split("/");

      // If the URL ends with /update, get the second-to-last segment
      // Otherwise, get the last segment
      const portfolioName =
        segments?.[
          segments.length - (segments[segments.length - 1] === "update" ? 2 : 1)
        ]?.toLowerCase();
      console.log(portfolioName);
      const manualPortfolio = await fetchManualPortfolio(portfolioName!);
      if (manualPortfolio) additionalContext.manualPortfolio = manualPortfolio;
    }
    console.log(additionalContext);
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "TEST RESPONSE" },
      ]);
    }, 500);
  };

  return (
    <Flex
      position="absolute"
      bottom={isOpen ? "3.5rem" : "-35rem"}
      right="0"
      w="25rem"
      minH="20rem"
      maxH="30rem"
      bg="white"
      boxShadow="xl"
      borderRadius="lg"
      p="4"
      flexDirection="column"
      gap="6"
      transition="bottom 0.3s ease-in-out"
      alignItems="stretch"
    >
      <HStack gap={8}>
        <Text fontWeight="semibold" color="black" className={raleway.className}>
          InfiniAssistant
        </Text>
        <Text
          fontWeight="normal"
          fontSize="sm"
          color="black"
          backgroundColor="blue.50"
          borderRadius="md"
          px="2"
          py="1"
          className={raleway.className}
          _hover={{ cursor: "pointer" }}
          onClick={() => setMessages([])}
        >
          Clear Messages
        </Text>
        <Spacer />
        <IconButton
          aria-label="Chat"
          borderRadius="sm"
          size="xs"
          boxShadow="md"
          bgColor="blue.50"
          onClick={onClose}
        >
          <IoClose className="invert" />
        </IconButton>
      </HStack>

      <VStack flex="1" overflowY="auto" align="start" w="100%" pt={2} gap={5}>
        {messages.map((msg, index) => (
          <HStack
            key={msg.content + msg.role + index}
            gap={5}
            alignItems="flex-start"
            justify={msg.role === "user" ? "flex-end" : "flex-start"}
            w="100%"
          >
            {msg.role === "assistant" && (
              <PiFinnTheHuman color="gray" size="1.5rem" />
            )}

            <Box
              alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
              bg={msg.role === "user" ? "blue.500" : "gray.200"}
              color={msg.role === "user" ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              maxW="85%"
            >
              <Text
                fontSize="md"
                fontWeight="normal"
                lineHeight={2}
                className={quicksand.className}
              >
                {msg.content}
              </Text>
            </Box>
          </HStack>
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      <HStack>
        <Input
          placeholder="Type your message..."
          value={input}
          color="black"
          className={quicksand.className}
          px="4"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={sendMessage}>
          <IoSend className="invert" />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ChatWindow;
