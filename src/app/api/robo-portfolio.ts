"use server";
import { apiClient } from "@/app/api/client";
import {
  RoboPortfolioCategoryAssets,
  RoboPortfolio,
  RoboPortfolioAssetAllocationResponse,
  RoboPortfolioResponse,
  RoboPortfolioSplit,
  RoboPortfolioSplitResponse,
  RoboPortfolioSummary,
  RoboPortfolioSummaryResponse,
  ROBO_CATEGORY,
} from "@/types/robo-portfolio";

export async function fetchRoboPortfolioSummary(): Promise<RoboPortfolioSummary | null> {
  try {
    const response = await apiClient<RoboPortfolioSummaryResponse>(
      "/portfolio/robo-portfolio/summary",
      {
        method: "GET",
      }
    );
    return response ? response.summary : null;
  } catch (error) {
    console.error("No robo portfolio exists", error);
    return null;
  }
}

export async function fetchRoboPortfolio(): Promise<RoboPortfolio | null> {
  try {
    const response = await apiClient<RoboPortfolioResponse>(
      "/portfolio/robo-portfolio/details",
      {
        method: "GET",
      }
    );
    return response ? response.portfolio : null;
  } catch (error) {
    console.error("No robo portfolio exists", error);
    return null;
  }
}

export async function generatePortfolioSplit(
  file: File,
  bankName: string,
  riskTolerance: string
): Promise<RoboPortfolioSplitResponse | null> {
  try {
    const formData = new FormData();
    formData.append("risk_tolerance_level", riskTolerance);
    formData.append("bank_name", bankName);
    formData.append("bank_statement", file);
    const response = await apiClient<RoboPortfolioSplitResponse>(
      "/portfolio/robo-portfolio/generate/categories",
      {
        method: "POST",
        body: formData,
      }
    );

    return response;
  } catch (error) {
    console.error("Error in generating portfolio split", error);
    return null;
  }
}

export async function generatePortfolioAssets(
  categorySplit: RoboPortfolioSplit
): Promise<Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets> | null> {
  try {
    const req = {
      portfolio: {
        large_cap_blend: categorySplit.largeCapBlend,
        small_cap_blend: categorySplit.smallCapBlend,
        international_stocks: categorySplit.internationalStocks,
        emerging_markets: categorySplit.emergingMarkets,
        intermediate_bonds: categorySplit.intermediateBonds,
        international_bonds: categorySplit.internationalBonds,
        cash: categorySplit.cash,
      },
    };
    const response = await apiClient<RoboPortfolioAssetAllocationResponse>(
      "/portfolio/robo-portfolio/generate/assets",
      {
        method: "POST",
        body: JSON.stringify(req),
      }
    );

    return response ? response.allocations : null;
  } catch (error) {
    console.error("Error in generating portfolio assets", error);
    return null;
  }
}

export async function createRoboPortfolio(
  freq: string,
  categorySplit: RoboPortfolioSplit,
  allocations: Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>
): Promise<boolean> {
  try {
    const req = {
      frequency: freq,
      portfolio: {
        large_cap_blend: categorySplit.largeCapBlend,
        small_cap_blend: categorySplit.smallCapBlend,
        international_stocks: categorySplit.internationalStocks,
        emerging_markets: categorySplit.emergingMarkets,
        intermediate_bonds: categorySplit.intermediateBonds,
        international_bonds: categorySplit.internationalBonds,
        cash: categorySplit.cash,
      },
      allocations,
    };
    console.log("here: ", req);
    const response = await apiClient<{ message: string }>(
      "/portfolio/robo-portfolio/confirm",
      { method: "POST", body: JSON.stringify(req) }
    );

    if (!response) return false;
    return true;
  } catch (error) {
    console.error("Error in creating robo portfolio", error);
    return false;
  }
}
