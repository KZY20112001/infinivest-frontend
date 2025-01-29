"use server";
import { apiClient } from "@/app/api/client";
import { Profile, ProfileResponse } from "@/types/profile";

function parseResponse(profileResponse: ProfileResponse): Profile {
  return {
    firstName: profileResponse.profile.FirstName,
    lastName: profileResponse.profile.LastName,
    address: profileResponse.profile.Address,
    profileUrl: profileResponse.profile.ProfileUrl,
  };
}

export async function fetchProfile(): Promise<Profile | null> {
  try {
    const response = await apiClient<ProfileResponse>("/profile", {
      method: "GET",
    });
    if (!response) return null;
    return parseResponse(response!);
  } catch (error) {
    console.error("No profile exists", error);
    return null;
  }
}

export async function createProfile(profile: Profile): Promise<boolean> {
  try {
    const profileRequest = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      address: profile.address,
      profile_url: profile.profileUrl,
      profile_id: profile.profileID,
    };
    const response = await apiClient<ProfileResponse>("/profile", {
      method: "POST",
      body: JSON.stringify(profileRequest),
    });
    if (!response) return false;
    return true;
  } catch (error) {
    console.error("No profile exists", error);
    return false;
  }
}

export async function updateProfile(profile: Profile): Promise<boolean> {
  try {
    const profileRequest = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      address: profile.address,
      profile_url: profile.profileUrl,
      profile_id: profile.profileID,
    };
    const response = await apiClient<ProfileResponse>("/profile", {
      method: "PATCH",
      body: JSON.stringify(profileRequest),
    });
    if (!response) return false;
    return true;
  } catch (error) {
    console.error("No profile exists", error);
    return false;
  }
}

export async function generateProfilePictureUploadUrl(
  name: string
): Promise<string> {
  try {
    const profilePicRequest = {
      bucket_name: "infinivest",
      object_key: "profile-pics/" + name,
    };
    const response = await apiClient<{ url: string }>("/s3/upload-url", {
      method: "POST",
      body: JSON.stringify(profilePicRequest),
    });
    if (!response) return "";
    return response.url;
  } catch (error) {
    console.error("Failed to generate presigned url for upload", error);
    return "";
  }
}
