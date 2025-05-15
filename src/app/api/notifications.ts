"use server";
import { backendClient } from "@/app/api/client";
import { NotificationReponse } from "@/types/notification";

export async function getNotifications(): Promise<string[]> {
  try {
    const response = await backendClient<NotificationReponse>(
      "/portfolio/notifications/",
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

export async function deleteNotifications(): Promise<void> {
  try {
    await backendClient("/portfolio/notifications/", {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting notifications: ", error);
  }
}
