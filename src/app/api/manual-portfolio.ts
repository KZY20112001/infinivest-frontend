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

export async function createManualPortfolio(name: string): Promise<boolean> {
  try {
    const response = await backendClient<{ message: string }>(
      `/portfolio/manual-portfolio/`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    return response?.message ? true : false;
  } catch (error) {
    console.error("Failed to create manual portfolio", error);
    return false;
  }
}

export async function updateManualPortfolio(
  oldName: string,
  newName: string
): Promise<boolean> {
  try {
    const response = await backendClient<{ message: string }>(
      `/portfolio/manual-portfolio/${oldName}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: newName }),
      }
    );
    return response?.message ? true : false;
  } catch (error) {
    console.error("Failed to update manual portfolio", error);
    return false;
  }
}

export async function buyAsset(
  portfolioName: string,
  symbol: string,
  name: string,
  sharesAmount: number
): Promise<boolean> {
  try {
    const response = await backendClient<boolean>(
      `/portfolio/manual-portfolio/${portfolioName}/buy`,
      {
        method: "PUT",
        body: JSON.stringify({ symbol, name, sharesAmount }),
      }
    );
    return response ? response : false;
  } catch (error) {
    console.error("Failed to buy asset", error);
    return false;
  }
}

export async function sellAsset(
  portfolioName: string,
  symbol: string,
  sharesAmount: number
) {
  try {
    const response = await backendClient<boolean>(
      `/portfolio/manual-portfolio/${portfolioName}/sell`,
      {
        method: "PUT",
        body: JSON.stringify({ symbol, sharesAmount }),
      }
    );
    return response ? response : false;
  } catch (error) {
    console.error("Failed to sell asset", error);
    return false;
  }
}
