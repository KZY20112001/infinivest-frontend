"use server";
import { backendClient } from "@/app/api/client";
import {
  ManualPortfolio,
  ManualPortfolioResponse,
  ManualPortfoliosSummariesResponse,
  ManualPortfolioSummary,
} from "@/types/manual-portfolio";

export async function fetchManualPortfolios(): Promise<
  ManualPortfolioSummary[]
> {
  try {
    const response = await backendClient<ManualPortfoliosSummariesResponse>(
      "/portfolio/manual-portfolio/summaries",
      {
        method: "GET",
      }
    );
    return response?.portfolios ?? [];
  } catch (error) {
    console.error("No manual portfolio exists", error);
    return [];
  }
}

export async function fetchManualPortfolio(
  name: string
): Promise<ManualPortfolio | null> {
  try {
    const response = await backendClient<ManualPortfolioResponse>(
      `/portfolio/manual-portfolio/${name}`,
      {
        method: "GET",
      }
    );
    return response?.portfolio ?? null;
  } catch (error) {
    console.error("No manual portfolio exists", error);
    return null;
  }
}

export async function fetchManualPortfolioValue(name: string): Promise<number> {
  try {
    const response = await backendClient<{ amount: number }>(
      `/portfolio/manual-portfolio/${name}/value`,
      {
        method: "GET",
      }
    );
    return response?.amount ?? -1;
  } catch (error) {
    console.error("No manual portfolio exists", error);
    return -1;
  }
}

export async function addMoneyToManualPortfolio(
  name: string,
  amount: number
): Promise<boolean> {
  try {
    const response = await backendClient<{ message: string }>(
      `/portfolio/manual-portfolio/${name}/add`,
      {
        method: "POST",
        body: JSON.stringify({ amount }),
      }
    );
    return response?.message ? true : false;
  } catch (error) {
    console.error("Failed to add money", error);
    return false;
  }
}

export async function withdrawMoneyFromManualPortfolio(
  name: string,
  amount: number
): Promise<number | null> {
  try {
    const response = await backendClient<{ amount: number }>(
      `/portfolio/manual-portfolio/${name}/withdraw`,
      {
        method: "POST",
        body: JSON.stringify({ amount }),
      }
    );
    return response?.amount ?? null;
  } catch (error) {
    console.error("Failed to withdraw money", error);
    return null;
  }
}
