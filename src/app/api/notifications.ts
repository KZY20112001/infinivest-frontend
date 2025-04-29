"use server";
import { backendClient } from "@/app/api/client";
import { NotificationReponse } from "@/types/notification";

export async function getNotifications(): Promise<string[]> {
  try {
    const response = await backendClient<NotificationReponse>(
      "/portfolio/notifications",
      {
        method: "GET",
      }
    );
    return response?.notifications ?? [];
  } catch (error) {
    console.error("No notifications yet, ", error);
    return [];
  }
}
