import { Metadata } from "next";
import NextLink from "next/link";
import {
  Box,
  Card,
  Flex,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";

import {
  getRoboPortfolioSummary,
  getRebalanceEvents,
} from "@/app/api/robo-portfolio";
import { getManualPortfolios } from "@/app/api/manual-portfolio";
import { getProfile } from "@/app/api/profile";

export const metadata: Metadata = {
  title: "Infinivest",
  description: "Home Page for Infinivest",
};

const Home = async () => {
  const profile = await getProfile();
  const manualPortfolios = await getManualPortfolios();
  const roboPortfolioSummary = await getRoboPortfolioSummary();
  const rebalanceEvents = await getRebalanceEvents();

  console.log("rebalanceEvents", rebalanceEvents);
  console.log("manualPortfolios", manualPortfolios);
  return (
    <Flex direction="column" align="center" p="4" gap="8">
      <Card.Root w="100%" maxW="4xl">
        <Card.Title
          borderBottom="1px solid black"
          className={quicksand.className}
          fontSize="xl"
          fontWeight={"semibold"}
          p="4"
          display="flex"
          justifyContent={"center"}
        >
          {profile
            ? `Welcome Back, ${profile.firstName} 👋`
            : "Welcome To InfiniVest!"}
        </Card.Title>
        <Card.Body p="4">
          {profile ? (
            <Flex align="center" gap="12">
              <Image
                src={
                  profile.profileUrl !== ""
                    ? profile.profileUrl
                    : "/profile-placeholder.jpg"
                }
                alt="profile picture"
                boxSize="200px"
                fit="cover"
                rounded="xl"
              />
              <Flex
                direction="column"
                gap="2"
                flex="1"
                className={raleway.className}
              >
                <Text fontSize="xl" fontWeight="bold">
                  {profile.firstName} {profile.lastName}
                </Text>
                {profile.riskTolerance && (
                  <Text>
                    Risk Tolerance: <strong>{profile.riskTolerance}</strong>
                  </Text>
                )}
                {profile.investmentStyle && (
                  <Text>
                    Investment Style: <strong>{profile.investmentStyle}</strong>
                  </Text>
                )}
                {profile.investmentHorizon && (
                  <Text>
                    Horizon: <strong>{profile.investmentHorizon}</strong>
                  </Text>
                )}
                {profile.experienceLevel && (
                  <Text>
                    Experience: <strong>{profile.experienceLevel}</strong>
                  </Text>
                )}
                <Box mt="2">
                  <ChakraLink
                    asChild
                    as="button"
                    bgColor="blue.100"
                    px="4"
                    py="2"
                    rounded="lg"
                    fontWeight="semibold"
                    className={raleway.className}
                  >
                    <NextLink href="/profile/update">
                      Update Your Profile
                    </NextLink>
                  </ChakraLink>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <Flex justify="center" align={"center"} gap="6">
              <Text fontWeight="semibold" className={raleway.className}>
                You do not have a profile yet.
              </Text>

              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/profile/update">Create Your Profile</NextLink>
              </ChakraLink>
            </Flex>
          )}
        </Card.Body>
      </Card.Root>

      <Card.Root w="100%" maxW="4xl">
        <Card.Title
          borderBottom="1px solid black"
          className={quicksand.className}
          fontSize="xl"
          fontWeight={"semibold"}
          p="4"
          display="flex"
          justifyContent={"center"}
        >
          Robo-Portfolio Summary
        </Card.Title>
        <Card.Body p="4">
          {roboPortfolioSummary ? (
            (() => {
              const { totalValue, totalInvested } = roboPortfolioSummary;
              const gainOrLossPercentage =
                ((totalValue - totalInvested) / totalInvested) * 100;
              const isGain = gainOrLossPercentage >= 0;

              return (
                <>
                  <Stack
                    borderWidth="1px"
                    rounded="lg"
                    p="4"
                    boxShadow="md"
                    bg="gray.50"
                    mb="6"
                  >
                    <Flex gap="4">
                      <Text
                        w="40"
                        className={raleway.className}
                        fontWeight="semibold"
                      >
                        Current Value:
                      </Text>
                      <Text fontWeight="bold">${totalValue}</Text>
                    </Flex>

                    <Flex gap="2">
                      <Text
                        w="40"
                        className={raleway.className}
                        fontWeight="semibold"
                      >
                        Estimated ROI:
                      </Text>
                      <Text
                        fontWeight="bold"
                        color={isGain ? "green.500" : "red.500"}
                      >
                        {isGain ? "Gain" : "Loss"} (
                        {gainOrLossPercentage.toFixed(2)}%)
                      </Text>
                    </Flex>
                    <Flex gap="2">
                      <Text
                        w="40"
                        className={raleway.className}
                        fontWeight="semibold"
                      >
                        Last Rebalanced On:
                      </Text>
                      <Text fontWeight="bold">
                        {rebalanceEvents.length > 0
                          ? new Intl.DateTimeFormat("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(new Date(rebalanceEvents[0].CreatedAt))
                          : "Has not been rebalanced yet"}
                      </Text>
                    </Flex>
                  </Stack>
                  <ChakraLink
                    asChild
                    as="button"
                    bgColor="blue.100"
                    px="4"
                    py="2"
                    w="80"
                    display="flex"
                    justifyContent="center"
                    ml="auto"
                    mr="auto"
                    rounded="lg"
                    fontWeight="semibold"
                    className={raleway.className}
                  >
                    <NextLink href="/portfolio/robo-portfolio">
                      Go to Robo-Portfolio
                    </NextLink>
                  </ChakraLink>
                </>
              );
            })()
          ) : (
            <Flex justify="center" align={"center"} gap="6">
              <Text fontWeight="semibold" className={raleway.className}>
                You do not a robo-portfolio yet.
              </Text>

              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/portfolio/robo-portfolio/create">
                  Create Robo-Portfolio
                </NextLink>
              </ChakraLink>
            </Flex>
          )}
        </Card.Body>
      </Card.Root>

      {/* Manual Portfolios Summary */}
      <Card.Root w="100%" maxW="4xl">
        <Card.Title
          borderBottom="1px solid black"
          className={quicksand.className}
          fontSize="xl"
          fontWeight={"semibold"}
          p="4"
          display="flex"
          justifyContent={"center"}
        >
          Manual-Portfolios Summary
        </Card.Title>
        <Card.Body p="4">
          {manualPortfolios.length > 0 ? (
            <>
              {" "}
              <Stack
                borderWidth="1px"
                rounded="lg"
                p="4"
                boxShadow="md"
                bg="gray.50"
                mb="6"
              >
                <Flex gap="4">
                  <Text
                    w="40"
                    className={raleway.className}
                    fontWeight="semibold"
                  >
                    Current Value:
                  </Text>
                  <Text fontWeight="bold">$1000</Text>
                </Flex>
              </Stack>
              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                w="80"
                display="flex"
                justifyContent="center"
                ml="auto"
                mr="auto"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/portfolio/manual-portfolio/">
                  Go to Portfolio
                </NextLink>
              </ChakraLink>
            </>
          ) : (
            <Flex justify="center" align={"center"} gap="6">
              <Text fontWeight="semibold" className={raleway.className}>
                You do not manual-portfolios. Add them first.
              </Text>

              <ChakraLink
                asChild
                as="button"
                bgColor="blue.100"
                px="4"
                py="2"
                rounded="lg"
                fontWeight="semibold"
                className={raleway.className}
              >
                <NextLink href="/portfolio">Go to Manual-Portfolios</NextLink>
              </ChakraLink>
            </Flex>
          )}
        </Card.Body>
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
          <Stack gap="2" mt="2">
            <Text>- Bought $500 of AAPL in Manual Portfolio 1</Text>
            <Text>- Robo Portfolio rebalanced on Apr 25, 2025</Text>
          </Stack>
        </Box>
      </Card.Root>
    </Flex>
  );
};

export default Home;
