"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { PiFinnTheHuman } from "react-icons/pi";
import { IoClose, IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

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
import { Message, QueryContext } from "@/types/chat";
import { fetchRoboPortfolio } from "@/app/api/robo-portfolio";
import { fetchManualPortfolio } from "@/app/api/manual-portfolio";
import { getReply } from "@/app/api/chat";

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

const introMessage = {
  role: "assistant",
  content: "Hi! I am Infini-Assistant. How can I help you today?",
};

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([
    introMessage as Message,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const additionalContext: QueryContext = {};
    const userProfile = await fetchProfile();

    if (userProfile) additionalContext.profile = userProfile;

    if (pathname.includes("/robo-portfolio")) {
      const roboPortfolioData = await fetchRoboPortfolio();
      if (roboPortfolioData)
        additionalContext.roboPortfolio = roboPortfolioData;
    } else if (pathname.includes("/manual-portfolio")) {
      const segments = pathname?.split("/");
      const portfolioName =
        segments?.[
          segments.length - (segments[segments.length - 1] === "update" ? 2 : 1)
        ]?.toLowerCase();
      console.log(portfolioName);
      const manualPortfolio = await fetchManualPortfolio(portfolioName!);
      if (manualPortfolio) additionalContext.manualPortfolio = manualPortfolio;
    }

    setInput("");
    setIsLoading(true);
    const response = await getReply(
      input,
      Object.keys(additionalContext).length ? additionalContext : undefined
    );
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  return (
    <Flex
      position="absolute"
      bottom={isOpen ? "3.5rem" : "-50rem"}
      right="0"
      w="30rem"
      minH="20rem"
      maxH="50rem"
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
          Infini-Assistant
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
          onClick={() => setMessages([introMessage as Message])}
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
              className={quicksand.className}
            >
              {/* <Text fontSize="md" fontWeight="normal" lineHeight={2}> */}
              <ReactMarkdown>{msg.content}</ReactMarkdown>
              {/* </Text> */}
            </Box>
          </HStack>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && <TypingIndicator />}
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

const TypingIndicator = () => (
  <Box
    display="flex"
    alignItems="center"
    gap="1"
    ml="3"
    px={3}
    py={2}
    bg="gray.200"
    borderRadius="lg"
    w="3rem"
  >
    <Box
      w="6px"
      h="6px"
      bg="gray.500"
      borderRadius="full"
      animation="bounce 1s infinite alternate"
    />
    <Box
      w="6px"
      h="6px"
      bg="gray.500"
      borderRadius="full"
      animation="bounce 1s infinite alternate 0.2s"
    />
    <Box
      w="6px"
      h="6px"
      bg="gray.500"
      borderRadius="full"
      animation="bounce 1s infinite alternate 0.4s"
    />
    <style>{`
      @keyframes bounce {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
      }
    `}</style>
  </Box>
);

export default ChatWindow;
