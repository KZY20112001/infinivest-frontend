"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Input, Text } from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";

import { createManualPortfolio } from "@/app/api/manual-portfolio";
import { raleway, quicksand } from "@/app/fonts";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CreateManualPortfolio = () => {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPortfolio = async () => {
    setIsLoading(true);
    const result = await createManualPortfolio(name);
    if (result !== null) {
      toast(`Created a new manual portfolio`);
      setName("");
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    } else {
      toast("Error when creating a manual portfolio");
    }
    setIsLoading(false);
    router.refresh();
  };
  return (
    <DialogRoot>
      <ToastContainer />
      <DialogTrigger asChild>
        <Button
          className={raleway.className}
          fontSize="lg"
          fontWeight={"semibold"}
          backgroundColor={"blue.50"}
          cursor={"pointer"}
          _hover={{ bg: "blue.100" }}
          px="8"
          py="4"
          borderRadius={"lg"}
        >
          Add a new manual portfolio
        </Button>
      </DialogTrigger>
      <DialogContent bgColor="white" color="black">
        <DialogHeader>
          <DialogTitle
            className={quicksand.className}
            fontSize="xl"
            fontWeight={"bold"}
            borderBottomWidth="2px"
            borderColor="black"
            pb="3"
          >
            Create a Manual Portfolio
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          className={raleway.className}
          display="flex"
          flexDir="column"
          gap="8"
        >
          <Flex flexDir="column" gap="4">
            <Text fontWeight="normal" fontSize="md" alignItems={"center"}>
              Name (must be unique)
            </Text>

            <Input
              ml="3"
              className={quicksand.className}
              backgroundColor="gray.100"
              type="text"
              fontWeight="semibold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width={40}
              height={8}
              fontSize="lg"
            />
          </Flex>
          <Text fontWeight="semibold" fontSize="md" lineHeight={"tall"}>
            An empty manual portfolio will be created. You can add stocks to it
            by accessing its page.
          </Text>
        </DialogBody>
        <DialogFooter className={raleway.className} fontWeight={"semibold"}>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              bgColor="green.50"
              px="4"
              py="1"
              w="28"
              borderRadius={"lg"}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            variant="outline"
            bgColor="green.50"
            px="4"
            py="1"
            w="28"
            borderRadius={"lg"}
            disabled={isLoading || name === ""}
            onClick={createPortfolio}
          >
            {isLoading ? <ClipLoader size={25} /> : "Create"}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger ref={closeButtonRef} />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateManualPortfolio;
