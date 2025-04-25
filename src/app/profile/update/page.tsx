import type { Metadata } from "next";

import { Flex } from "@chakra-ui/react";
import { getProfile } from "@/app/api/profile";
import ProfileForm from "@/app/profile/update/profile-form";

export const metadata: Metadata = {
  title: "Profile",
  description: "Set Up Profile",
};

const UpdateProfile = async () => {
  const profile = await getProfile();
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
