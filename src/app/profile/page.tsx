import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getProfile } from "@/app/api/profile";
import ProfileCard from "@/app/profile/profile-card";

export const metadata: Metadata = {
  title: "Profile",
  description: "Set Up Profile",
};

const Profile = async () => {
  const profile = await getProfile();
  if (!profile) {
    redirect("/profile/update");
  }
  return <ProfileCard profile={profile} />;
};

export default Profile;
