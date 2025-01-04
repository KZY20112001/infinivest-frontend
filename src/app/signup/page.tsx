import type { Metadata } from "next";

import { quicksand } from "@/app/fonts";
import { SignUpForm } from "@/components/form";

import { Flex, Text } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up as a new year",
};

const SignUp = () => {
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        fontSize="5xl"
        className={quicksand.className}
        fontWeight={"bold"}
        color={"black"}
      >
        Are you a new user?
      </Text>
      <SignUpForm />
    </Flex>
  );
};

export default SignUp;
