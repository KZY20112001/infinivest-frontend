"use server";
import { cookies } from "next/headers";
import { apiClient } from "@/app/api/client";
import { AuthResponse } from "@/types/auth";

export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await apiClient<AuthResponse>("/user/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response) return false;

    const cookieStore = await cookies();
    cookieStore.set("access_token", response.tokens.access_token, {
      path: "/",
      maxAge: 3 * 60 * 60,
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    cookieStore.set("refresh_token", response.tokens.refresh_token, {
      path: "/",
      maxAge: 8 * 60 * 60,
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const response = await apiClient<AuthResponse>("/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (!response) return false;

    const cookieStore = await cookies();
    cookieStore.set("access_token", response.tokens.access_token, {
      path: "/",
      maxAge: 3 * 60 * 60,
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    cookieStore.set("refresh_token", response.tokens.refresh_token, {
      path: "/",
      maxAge: 8 * 60 * 60,
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return true;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
}
