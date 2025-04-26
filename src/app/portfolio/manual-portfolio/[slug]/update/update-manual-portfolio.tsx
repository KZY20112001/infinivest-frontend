"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

import { BsInfoCircle } from "react-icons/bs";
import { FC, useState, useTransition } from "react";
import { Card, Flex, Input, Text } from "@chakra-ui/react";

import { quicksand, raleway } from "@/app/fonts";
import { updateManualPortfolio } from "@/app/api/manual-portfolio";
import AdjustCash from "@/app/portfolio/manual-portfolio/[slug]/adjust-cash";
import DisplayAssets from "@/app/portfolio/manual-portfolio/[slug]/update/display-assets";
import BuyAssets from "@/app/portfolio/manual-portfolio/[slug]/update/buy-assets";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ManualPortfolio } from "@/types/manual-portfolio";

interface UpdateManualPortfolioProps {
  manualPortfolio: ManualPortfolio;
}
const UpdateManualPortfolio: FC<UpdateManualPortfolioProps> = ({
  manualPortfolio,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(manualPortfolio?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMutating = isLoading || isPending || manualPortfolio?.name === name;

  const handleNameSubmit = async () => {
    setIsLoading(true);
    const isSuccessful = await updateManualPortfolio(
      manualPortfolio.name,
      name
    );

    if (isSuccessful) setError(null);
    else if (manualPortfolio) setError("Failed to update portfolio name");
    else setError("Failed to create portfolio");

    startTransition(() => {
      router.refresh();
    });
    if (name != manualPortfolio.name) {
      router.replace(
        `/portfolio/manual-portfolio/${encodeURIComponent(name)}/update`
      );
    }
    setIsLoading(false);
  };

  return (
    <Card.Root w="60%">
      <Card.Header
        borderBottomWidth="2px"
        borderColor="gray.400"
        pb="4"
        display="flex"
        flexDir="row"
      >
        <Link href={`/portfolio/manual-portfolio/${manualPortfolio.name}`}>
          <Button>
            <FaArrowLeft className="text-blue-500 cursor-pointer" />
          </Button>
        </Link>
        <Text
          className={quicksand.className}
          fontSize="2xl"
          fontWeight={"bold"}
        >
          Update
        </Text>
      </Card.Header>
      <Card.Body display="flex" flexDirection="column" gap={8}>
        <Flex flexDir="column" gap={4}>
          <Flex
            borderBottomWidth={2}
            borderColor="black"
            pb="2"
            alignItems={"center"}
            gap="4"
          >
            <Text fontSize="xl" className={raleway.className} fontWeight="bold">
              Name
            </Text>
            <Tooltip content="This is the unique name for your portfolio!">
              <BsInfoCircle className="cursor-pointer" />
            </Tooltip>
          </Flex>
          <Flex
            gap="4"
            alignItems="center"
            fontWeight={"semibold"}
            className={raleway.className}
          >
            <Input
              placeholder="Unique Name"
              p="2"
              size="xs"
              w="40%"
              backgroundColor="gray.50"
              borderRadius="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              bgColor={isMutating ? "gray.50" : "green.50"}
              px="4"
              py="2"
              borderRadius="lg"
              disabled={isMutating}
              onClick={handleNameSubmit}
            >
              Update
            </Button>
          </Flex>
          {error && (
            <Text
              color="red.400"
              fontSize="sm"
              w="40%"
              fontWeight="semibold"
              className={raleway.className}
            >
              {error}
            </Text>
          )}
          <Flex
            pb="6"
            flexDirection="column"
            gap="4"
            borderWidth={1}
            borderColor="black"
            borderRadius="xl"
            px="4"
            py="2"
            bgColor="blue.50"
          >
            <Flex className={quicksand.className} alignItems={"center"} gap="2">
              <Text fontWeight="bold" fontSize="xl">
                Liquid Cash
              </Text>
              <Tooltip content="Liquid cash is the amount of buffer money put aside as a buffer">
                <BsInfoCircle
                  color="black"
                  size="20"
                  className="cursor-pointer"
                />
              </Tooltip>
            </Flex>
            <Flex
              fontSize="md"
              fontWeight={"semibold"}
              gap="4"
              alignItems={"center"}
            >
              <Text w="48" className={raleway.className}>
                Currently Available:
              </Text>
              <Text
                px="8"
                borderRadius="xl"
                py="1"
                fontSize="lg"
                className={quicksand.className}
              >
                $ {manualPortfolio.totalCash.toFixed(2)}
              </Text>
            </Flex>
            <AdjustCash
              name={manualPortfolio.name}
              liquidCash={manualPortfolio.totalCash}
            />
          </Flex>{" "}
        </Flex>

        <DisplayAssets
          assets={manualPortfolio.assets}
          portfolioName={manualPortfolio.name}
        />
        <BuyAssets
          totalCash={manualPortfolio.totalCash}
          portfolioName={manualPortfolio.name}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default UpdateManualPortfolio;
