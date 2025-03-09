"use server";
import { backendClient } from "@/app/api/client";
import { Profile, ProfileResponse } from "@/types/profile";

export async function fetchProfile(): Promise<Profile | null> {
  try {
    const response = await backendClient<ProfileResponse>("/profile", {
      method: "GET",
    });
    return response ? response.profile : null;
  } catch (error) {
    console.error("No profile exists", error);
    return null;
  }
}

export async function createProfile(profile: Profile): Promise<boolean> {
  try {
    const req = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      address: profile.address,
      profile_url: profile.profileUrl,
      profile_id: profile.profileID,
    };
    const response = await backendClient<{ message: string }>("/profile", {
      method: "POST",
      body: JSON.stringify(req),
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
    const req = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      address: profile.address,
      profile_url: profile.profileUrl,
      profile_id: profile.profileID,
    };
    const response = await backendClient<{ message: string }>("/profile", {
      method: "PATCH",
      body: JSON.stringify(req),
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
    const req = {
      bucket_name: "infinivest",
      object_key: "profile-pics/" + name,
    };
    const response = await backendClient<{ url: string }>("/s3/upload-url", {
      method: "POST",
      body: JSON.stringify(req),
    });
    if (!response) return "";
    return response.url;
  } catch (error) {
    console.error("Failed to generate presigned url for upload", error);
    return "";
  }
}
