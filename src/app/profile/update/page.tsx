import type { Metadata } from "next";

import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Profile",
  description: "Set Up Profile",
};

const UpdateProfile = async () => {
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      Update Profile Page
    </Flex>
  );
};

export default UpdateProfile;
