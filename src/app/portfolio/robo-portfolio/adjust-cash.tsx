import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Flex, Text, Input } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import {
  addMoneyToRoboPortfolio,
  withdrawMoneyFromRoboPortfolio,
} from "@/app/api/robo-portfolio";
import { quicksand, raleway } from "@/app/fonts";
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
import { InputGroup } from "@/components/ui/input-group";

const AdjustCash = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [amountWithdrawn, setAmountWithdrawn] = useState(0);

  const isMutating = isLoading || isPending;
  const addMoney = async () => {
    setIsLoading(true);
    const isSuccessful = await addMoneyToRoboPortfolio(amount);
    if (isSuccessful) {
      toast("Money Added Successfully");
      setAmount(0);
    } else {
      toast("Failed to add money");
    }
    startTransition(() => {
      router.refresh();
    });
    setIsLoading(false);
  };

  const withDrawMoney = async () => {
    setIsLoading(true);
    const result = await withdrawMoneyFromRoboPortfolio(amount);
    if (result !== null) {
      toast(`Withdrawn $${result}`);
      setAmountWithdrawn(() => amountWithdrawn + result);
      setAmount(0);
    } else {
      toast("Failed to withdraw money");
    }
    startTransition(() => {
      router.refresh();
    });
    setIsLoading(false);
  };
  return (
    <Flex gap="8" justifyContent={"center"}>
      <ToastContainer />
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            fontWeight={"semibold"}
            bgColor="green.50"
            className={raleway.className}
            px="4"
            borderRadius="lg"
          >
            Deposit Money to Robo-Portfolio
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
              Deposit Money
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            className={raleway.className}
            display="flex"
            flexDir="column"
            gap="8"
          >
            <Flex gap="12" alignItems="center">
              <Text fontWeight="semibold" fontSize="md" alignItems={"center"}>
                Amount
              </Text>
              <InputGroup
                startElement="$"
                bgColor="blue.50"
                px="4"
                py="1"
                borderRadius="lg"
              >
                <Input
                  className={quicksand.className}
                  type="number"
                  fontWeight="semibold"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="0"
                  max="1000000"
                  width={40}
                  height={8}
                  fontSize="lg"
                />
              </InputGroup>
            </Flex>
            <Text fontWeight="semibold" fontSize="md" lineHeight={"tall"}>
              The deposited money will be split based on the allocated
              percentages. Some will be used to buy more assets, and some will
              be kept as liquid cash.
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
              onClick={addMoney}
              disabled={isMutating || amount === 0}
            >
              {isMutating ? <ClipLoader size={25} /> : "Add"}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <DialogRoot onExitComplete={() => setAmountWithdrawn(0)}>
        <DialogTrigger asChild>
          <Button
            fontWeight={"semibold"}
            bgColor="green.50"
            className={raleway.className}
            px="4"
            borderRadius="lg"
          >
            Withdraw Money from Robo-Portfolio
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
              Withdraw Money
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            className={raleway.className}
            display="flex"
            flexDir="column"
            gap="8"
          >
            <Flex gap="12" alignItems="center">
              <Text fontWeight="semibold" fontSize="md" alignItems={"center"}>
                Amount
              </Text>
              <InputGroup
                startElement="$"
                bgColor="blue.50"
                px="4"
                py="1"
                borderRadius="lg"
              >
                <Input
                  className={quicksand.className}
                  type="number"
                  fontWeight="semibold"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="0"
                  max="1000000"
                  width={40}
                  height={8}
                  fontSize="lg"
                />
              </InputGroup>
            </Flex>

            <Text fontWeight="semibold" fontSize="md" lineHeight={"tall"}>
              The withdrawn money will be taken from the liquid cash first.
              Assets will be sold proportionally to cover the remaining amount.
            </Text>
            <Text fontWeight="semibold" fontSize="md" lineHeight={"tall"}>
              Note that you may not be able to withdraw the full amount if it
              exceeds the total value of the portfolio.
            </Text>
            <Text fontWeight="semibold" fontSize="md" lineHeight={"tall"}>
              Total Withdrawn: ${amountWithdrawn}
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
              onClick={withDrawMoney}
              disabled={isMutating || amount === 0}
            >
              {isMutating ? <ClipLoader size={25} /> : "Withdraw"}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
};

export default AdjustCash;
