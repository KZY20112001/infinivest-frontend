import type { Metadata } from "next";

import { Flex, Text } from "@chakra-ui/react";

import { quicksand } from "@/app/fonts";
import SignInForm from "@/app/signin/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in as a returning user",
};

const SignIn = () => {
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
        Are you an existing user?
      </Text>
      <SignInForm />
    </Flex>
  );
};

export default SignIn;
