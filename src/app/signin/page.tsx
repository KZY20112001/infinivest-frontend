import { Flex, Text } from "@chakra-ui/react";
import { quicksand } from "@/app/fonts";
import { AuthForm } from "@/components/form";
import type { Metadata } from "next";
import { signIn } from "@/app/api/auth";
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
      <AuthForm type="Sign In" onSubmit={signIn} />
    </Flex>
  );
};

export default SignIn;
