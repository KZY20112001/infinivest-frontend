import type { Metadata } from "next";

import { Flex } from "@chakra-ui/react";
import { fetchProfile } from "@/app/api/profile";
import { ProfileForm } from "@/components/form";

export const metadata: Metadata = {
  title: "Profile",
  description: "Set Up Profile",
};

const UpdateProfile = async () => {
  const profile = await fetchProfile();
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ProfileForm profile={profile} />
    </Flex>
  );
};

export default UpdateProfile;
