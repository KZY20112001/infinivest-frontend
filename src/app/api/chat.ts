import { QueryContext } from "@/types/chat";
import { microserviceClient } from "./client";

export async function getReply(
  input: string,
  context?: QueryContext
): Promise<string> {
  try {
    const body = JSON.stringify({ input, ...(context && { context }) });
    console.log(body);
    const response = await microserviceClient<{ message: string }>("/chat/", {
      method: "POST",
      body,
    });

    return response?.message ?? "Sorry, I am unable to respond to that.";
  } catch (error) {
    console.error("Error in getting a reply", error);
    return "Sorry, I am unable to respond to that.";
  }
}
