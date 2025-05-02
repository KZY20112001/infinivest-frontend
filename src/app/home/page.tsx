import { getProfile } from "@/app/api/profile";
import {
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Metadata } from "next";
import Link from "next/link";
import { raleway } from "@/app/fonts";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getManualPortfolios } from "@/app/api/manual-portfolio";
import {
  getRoboPortfolio,
  getRoboPortfolioSummary,
  getRebalanceEvents,
} from "@/app/api/robo-portfolio";

export const metadata: Metadata = {
  title: "Infinivest",
  description: "Home Page for Infinivest",
};

const Home = async () => {
  const profile = await getProfile();
  const manualPortfolios = await getManualPortfolios();
  const roboPortfolio = await getRoboPortfolio();
  const rebalanceEvents = await getRebalanceEvents();
  console.log("rebalanceEvents", rebalanceEvents);
  console.log("roboPortfolio", roboPortfolio);
  console.log("manualPortfolios", manualPortfolios);
  return (
    <Flex direction="column" align="center" px="4" pt="2" gap="8">
      <Card.Root w="100%" maxW="4xl">
        <Box borderBottom="1px solid black" p="4">
          <Heading size="lg">
            {profile
              ? `Welcome Back, ${profile.firstName} 👋`
              : "Welcome To InfiniVest!"}
          </Heading>
        </Box>
        <Box p="4">
          <Flex justify="space-between" align="center" wrap="wrap" gap="6">
            <Avatar
              size="2xl"
              src={
                profile && profile.profileUrl !== ""
                  ? profile.profileUrl ?? "/profile-placeholder.jpg"
                  : "/default-profile.png"
              }
            />
            <Link href="/profile/update">
              <Button>{profile ? "Update" : "Create"} Your Profile</Button>
            </Link>
            <Link href="/portfolio">
              <Button bg="blue.100">Go to Portfolios</Button>
            </Link>
          </Flex>
        </Box>
      </Card.Root>

      {/* Robo Portfolio Summary */}
      <Card.Root w="100%" maxW="4xl">
        <Box borderBottom="1px solid #ccc" p="4">
          <Text fontSize="xl" fontWeight="bold">
            Robo Portfolio
          </Text>
        </Box>
        <Box p="4">
          <Text>Total Value: $12,500</Text>
          <Text>Gain/Loss: +5.3%</Text>
          <Text>Last Rebalanced: Apr 25, 2025</Text>
          <Box mt="2">
            <Link href="/portfolio/robo">
              <Button>View Full Robo Portfolio</Button>
            </Link>
          </Box>
        </Box>
      </Card.Root>

      {/* Manual Portfolios Summary */}
      <Card.Root w="100%" maxW="4xl">
        <Box borderBottom="1px solid #ccc" p="4">
          <Text fontSize="xl" fontWeight="bold">
            Manual Portfolios
          </Text>
        </Box>
        <Box p="4">
          <VStack gap="4">
            {[1, 2].map((id) => (
              <Box key={id} p="4" borderWidth="1px" borderRadius="md">
                <Text>Portfolio {id}</Text>
                <Text>Total Value: $7,800</Text>
                <Text>Gain/Loss: -2.1%</Text>
                <Link href={`/portfolio/manual/${id}`}>
                  <Button size="sm" mt="2">
                    View Portfolio
                  </Button>
                </Link>
              </Box>
            ))}
          </VStack>
        </Box>
      </Card.Root>

      {/* Insights & Activities */}
      <Card.Root w="100%" maxW="4xl">
        <Box borderBottom="1px solid #ccc" p="4">
          <Text fontSize="xl" fontWeight="bold">
            AI Insights & Recent Activity
          </Text>
        </Box>
        <Box p="4">
          <Text mb="4">
            💡 Insight: Your Robo Portfolio is well-diversified. Consider adding
            more bonds for lower risk.
          </Text>
          <Separator />
          <Text mt="4">📌 Recent Activity:</Text>
          <VStack gap="2" mt="2">
            <Text>- Bought $500 of AAPL in Manual Portfolio 1</Text>
            <Text>- Robo Portfolio rebalanced on Apr 25, 2025</Text>
          </VStack>
        </Box>
      </Card.Root>
    </Flex>
  );
};

export default Home;
