"use client";
import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Link as ChakraLink,
  Card,
  Flex,
  NativeSelect,
  Stack,
  Table,
  Text,
  Badge,
  Box,
} from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";
import { Transaction } from "@/types/transaction";
import { ArrowLeft, ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface DisplayTransactionsProps {
  transactions: Transaction[];
}
const DisplayTransactions: FC<DisplayTransactionsProps> = ({
  transactions,
}) => {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (filter !== "all") {
      filtered = filtered.filter((t) => t.transactionType === filter);
    }

    return filtered;
  }, [transactions, filter]);

  const { totalInflow, totalOutflow } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (["buy", "withdrawal"].includes(transaction.transactionType)) {
          return {
            ...acc,
            totalOutflow: acc.totalOutflow + transaction.totalAmount,
          };
        } else {
          return {
            ...acc,
            totalInflow: acc.totalInflow + transaction.totalAmount,
          };
        }
      },
      { totalInflow: 0, totalOutflow: 0 }
    );
  }, [transactions]);

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "buy":
        return { bgColor: "green.500", text: "Buy" };
      case "sell":
        return { bgColor: "red.400", text: "Sell" };
      case "deposit":
        return { bgColor: "green.100", text: "Deposit" };
      case "withdrawal":
        return { bgColor: "red.100", text: "Withdrawal" };
      default:
        return { bgColor: "gray", text: type };
    }
  };

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

        <Flex gap="12" px="4" mb="2">
          <Card.Root
            w="20rem"
            className={quicksand.className}
            bg="gray.100"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" color="black" fontWeight="bold">
                Net Balance
              </Text>
            </Card.Header>
            <Card.Body>
              <Text fontSize="xl" fontWeight="bold">
                $
                {(totalInflow - totalOutflow).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root
            w="20rem"
            className={quicksand.className}
            bg="green.50"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                Total Inflow
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack direction={"row"}>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  $
                  {totalInflow.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <ArrowUpIcon className="mt-1" color="green" />
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            w="20rem"
            className={quicksand.className}
            bg="red.50"
            rounded="lg"
          >
            <Card.Header>
              <Text fontSize="lg" fontWeight="bold" color="red.600">
                Total Outflow
              </Text>
            </Card.Header>
            <Card.Body>
              <Stack direction={"row"}>
                <Text fontSize="xl" fontWeight="bold" color="red.600">
                  $
                  {totalOutflow.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <ArrowDownIcon className="mt-1" color="red" />
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
            Transactions
          </Text>
          <Flex ml="auto" mr="0" align="center" className={raleway.className}>
            <Text w="5rem" fontWeight="semibold" fontSize="lg">
              Filter
            </Text>
            <NativeSelect.Root
              background="blue.100"
              rounded="2xl"
              px="4"
              py="2"
            >
              <NativeSelect.Field
                className={raleway.className}
                defaultValue={"all"}
                fontSize="md"
                onChange={(e) => setFilter(e.target.value)}
                w="10rem"
                fontWeight="normal"
              >
                <option value="all">All Transactions</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Flex>
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
                    Type
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">
                    Details
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end" fontWeight="bold">
                    Amount
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <Table.Row
                      key={index + transaction.CreatedAt}
                      className={raleway.className}
                      fontSize="md"
                      h="5rem"
                    >
                      <Table.Cell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(transaction.CreatedAt))}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          bgColor={
                            getTransactionBadge(transaction.transactionType)
                              .bgColor
                          }
                          color={"black"}
                          py={1}
                          px={2}
                          borderRadius="full"
                        >
                          {
                            getTransactionBadge(transaction.transactionType)
                              .text
                          }
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        {transaction.symbol ? (
                          <Flex flexDir="column" gap="1">
                            <Text fontWeight="medium">
                              {transaction.symbol}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {transaction.name}
                            </Text>
                            {transaction.sharesAmount && (
                              <Text fontSize="sm" color="gray.600">
                                {transaction.sharesAmount} shares @ $
                                {transaction.price?.toFixed(2)}
                              </Text>
                            )}
                          </Flex>
                        ) : (
                          <Text color="gray.600">
                            {transaction.transactionType === "deposit"
                              ? "Funds added to account"
                              : "Funds withdrawn from account"}
                          </Text>
                        )}
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Text
                          fontWeight="medium"
                          color={
                            ["buy", "withdrawal"].includes(
                              transaction.transactionType
                            )
                              ? "red.600"
                              : "green.600"
                          }
                        >
                          {["buy", "withdrawal"].includes(
                            transaction.transactionType
                          )
                            ? "-"
                            : "+"}
                          $
                          {transaction.totalAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={4} textAlign="center" py={8}>
                      <Text color="gray.500" className={quicksand.className}>
                        No transactions found matching your filters.
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

export default DisplayTransactions;
