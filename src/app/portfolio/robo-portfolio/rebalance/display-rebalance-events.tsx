"use client";
import { FC, useMemo } from "react";
import NextLink from "next/link";
import {
  Link as ChakraLink,
  Card,
  Flex,
  Stack,
  Table,
  Text,
  Badge,
  Box,
} from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";
import { RebalanceEvent } from "@/types/robo-portfolio";
import {
  ArrowLeft,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DisplayRebalanceEventsProps {
  events: RebalanceEvent[];
}

const DisplayRebalanceEvents: FC<DisplayRebalanceEventsProps> = ({
  events,
}) => {
  const { totalBuys, totalSells, netChanges } = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        return {
          totalBuys: acc.totalBuys + event.totalBuyAmount,
          totalSells: acc.totalSells + event.totalSellAmount,
          netChanges: acc.netChanges + event.netChange,
        };
      },
      { totalBuys: 0, totalSells: 0, netChanges: 0 }
    );
  }, [events]);

  const totalGainLoss = useMemo(() => {
    return events.reduce((total, event) => total + event.gainOrLoss, 0);
  }, [events]);

  return (
    <Flex w="60%" flexDir="column" gap="8">
      <Card.Root gap={4} pb={4}>
        <Card.Header
          borderBottomWidth="2px"
          borderColor="gray.400"
          pb="4"
          display="flex"
          flexDir="row"
        >
          <ChakraLink asChild>
            <NextLink href="/portfolio/robo-portfolio">
              <ArrowLeft className="text-blue-500 cursor-pointer" />
            </NextLink>
          </ChakraLink>
          <Text
            className={quicksand.className}
            fontSize="2xl"
            fontWeight={"bold"}
          >
            Summary
          </Text>
        </Card.Header>

        <Flex gap="12" px="4" mb="2" flexWrap="wrap">
          <Card.Root
            w="15rem"
            className={quicksand.className}
            bg="gray.100"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" color="black" fontWeight="bold">
                Net Change
              </Text>
            </Card.Header>
            <Card.Body>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={netChanges >= 0 ? "green.600" : "red.600"}
              >
                {netChanges.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root
            w="15rem"
            className={quicksand.className}
            bg="green.50"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                Total Buys
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack direction={"row"}>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  $
                  {totalBuys.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <ArrowUpIcon className="mt-1" color="green" />
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            w="15rem"
            className={quicksand.className}
            bg="red.50"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="red.600">
                Total Sells
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack direction={"row"}>
                <Text fontSize="xl" fontWeight="bold" color="red.600">
                  $
                  {totalSells.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <ArrowDownIcon className="mt-1" color="red" />
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            w="15rem"
            className={quicksand.className}
            bg={totalGainLoss >= 0 ? "green.50" : "red.50"}
            rounded="lg"
          >
            <Card.Header>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={totalGainLoss >= 0 ? "green.600" : "red.600"}
              >
                Total Gain/Loss
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack direction={"row"}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={totalGainLoss >= 0 ? "green.600" : "red.600"}
                >
                  $
                  {totalGainLoss.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                {totalGainLoss >= 0 ? (
                  <ArrowUpIcon className="mt-1" color="green" />
                ) : (
                  <ArrowDownIcon className="mt-1" color="red" />
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        </Flex>
      </Card.Root>

      <Card.Root mb={6}>
        <Card.Header
          borderBottomWidth="2px"
          borderColor="gray.400"
          pb="4"
          display="flex"
          flexDir="row"
          alignItems={"center"}
        >
          <Text
            className={quicksand.className}
            fontSize="xl"
            fontWeight={"bold"}
          >
            Rebalance Events
          </Text>
        </Card.Header>
        <Card.Body>
          <Box maxH="40rem" overflow="scroll">
            <Table.Root>
              <Table.Header fontSize="xl" className={quicksand.className}>
                <Table.Row>
                  <Table.ColumnHeader fontWeight={"bold"}>
                    Date
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">
                    Status
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">
                    Details
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end" fontWeight="bold">
                    Net Change
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end" fontWeight="bold">
                    Gain/Loss
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <Table.Row
                      key={index + event.CreatedAt}
                      className={raleway.className}
                      fontSize="md"
                      h="5rem"
                    >
                      <Table.Cell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(event.CreatedAt))}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          bgColor={event.success ? "green.100" : "red.100"}
                          color={"black"}
                          py={1}
                          px={2}
                          borderRadius="full"
                        >
                          <Flex align="center" gap="1">
                            {event.success ? (
                              <CheckCircle size={16} color="green" />
                            ) : (
                              <XCircle size={16} color="red" />
                            )}
                            <Text>{event.success ? "Success" : "Failed"}</Text>
                          </Flex>
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Flex flexDir="column" gap="1">
                          <Flex>
                            <Text fontWeight="medium" color="green.600" mr="4">
                              Buy: $
                              {event.totalBuyAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                            <Text fontWeight="medium" color="red.600">
                              Sell: $
                              {event.totalSellAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" color="gray.600">
                              Portfolio: $
                              {event.portfolioValueBefore.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              → $
                              {event.portfolioValueAfter.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </Text>
                          </Flex>
                          {!event.success && event.reason && (
                            <Text fontSize="sm" color="red.600">
                              Reason: {event.reason}
                            </Text>
                          )}
                        </Flex>
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Text
                          fontWeight="medium"
                          color={event.netChange >= 0 ? "green.600" : "red.600"}
                        >
                          {event.netChange >= 0 ? "+" : "-"}
                          {Math.abs(event.netChange).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          %
                        </Text>
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Text
                          fontWeight="medium"
                          color={
                            event.gainOrLoss >= 0 ? "green.600" : "red.600"
                          }
                        >
                          {event.gainOrLoss >= 0 ? "+" : "-"}$
                          {Math.abs(event.gainOrLoss).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={5} textAlign="center" py={8}>
                      <Text color="gray.500" className={quicksand.className}>
                        No rebalance events found matching your filters.
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </Box>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default DisplayRebalanceEvents;
