import { microserviceClient } from "@/app/api/client";

export async function getPortfolioSummaryInsights(
  value: number,
  gainOrLossPercentage: number,
  assets: {
    name: string;
    symbol: string;
    sharesOwned: number;
    avgBuyPrice: number;
  }[]
): Promise<string> {
  try {
    const body = JSON.stringify({
      value,
      gain_or_loss_percentage: gainOrLossPercentage,
      assets,
    });
    const response = await microserviceClient<{ message: string }>(
      "/insights/portfolio/summary",
      {
        method: "POST",
        body,
      }
    );

    return response?.message ?? "";
  } catch (error) {
    console.error("Error in getting a reply", error);
    return "";
  }
}

export async function getPortfolioTopInsights(
  assets: {
    name: string;
    symbol: string;
    sharesOwned: number;
    avgBuyPrice: number;
  }[]
): Promise<string> {
  try {
    const body = JSON.stringify({
      assets,
    });
    const response = await microserviceClient<{ message: string }>(
      "/insights/portfolio/top",
      {
        method: "POST",
        body,
      }
    );

    return response?.message ?? "";
  } catch (error) {
    console.error("Error in getting a reply", error);
    return "";
  }
}
