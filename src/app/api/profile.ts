import { apiClient } from "@/app/api/client";
import { Profile, ProfileResponse } from "@/types/profile";

function parseResponse(profileResponse: ProfileResponse): Profile {
  return {
    firstName: profileResponse.profile.first_name,
    lastName: profileResponse.profile.last_name,
    email: profileResponse.profile.email,
    profileUrl: profileResponse.profile.profile_url,
  };
}

const test: Profile = {
  firstName: "john",
  lastName: "cena",
  email: "john@gmail.com",
  profileUrl:
    "https://www.shutterstock.com/shutterstock/photos/2107967969/display_1500/stock-vector-young-smiling-man-adam-avatar-d-vector-people-character-illustration-cartoon-minimal-style-2107967969.jpg",
};

export async function fetchProfile(): Promise<Profile | null> {
  try {
    return test;
    const response = await apiClient<ProfileResponse>("/profile", {
      method: "GET",
    });
    if (!response) return null;
    return parseResponse(response);
  } catch (error) {
    console.error("No profile exists", error);
    return null;
  }
}
