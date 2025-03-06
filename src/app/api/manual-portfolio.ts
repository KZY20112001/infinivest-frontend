"use server";
import { apiClient } from "@/app/api/client";
import {
  ManualPortfolio,
  ManualPortfoliosResponse,
} from "@/types/manual-portfolio";

export async function fetchManualPortfolios(): Promise<ManualPortfolio[]> {
  try {
    const response = await apiClient<ManualPortfoliosResponse>(
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
