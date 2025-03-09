"use server";
import { backendClient } from "@/app/api/client";
import {
  ManualPortfolio,
  ManualPortfoliosResponse,
} from "@/types/manual-portfolio";

export async function fetchManualPortfolios(): Promise<ManualPortfolio[]> {
  try {
    const response = await backendClient<ManualPortfoliosResponse>(
      "/portfolio/manual/",
      {
        method: "GET",
      }
    );
    return response ? response.portfolios : [];
  } catch (error) {
    console.error("No manual portfolio exists", error);
    return [];
  }
}
