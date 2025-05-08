"use server";
import { backendClient } from "@/app/api/client";
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
  RebalanceEvent,
  RebalanceEventsResponse,
} from "@/types/robo-portfolio";
import { Transaction, TransactionsResponse } from "@/types/transaction";

export async function getRoboPortfolioSummary(): Promise<RoboPortfolioSummary | null> {
  try {
    const response = await backendClient<RoboPortfolioSummaryResponse>(
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

export async function getRoboPortfolio(): Promise<RoboPortfolio | null> {
  try {
    const response = await backendClient<RoboPortfolioResponse>(
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

export async function getRoboPortfolioTransactions(): Promise<Transaction[]> {
  try {
    const response = await backendClient<TransactionsResponse>(
      "/portfolio/robo-portfolio/transactions",
      {
        method: "GET",
      }
    );
    return response?.transactions ?? [];
  } catch (error) {
    console.log("Error in fetching transactions.", error);
    return [];
  }
}

export async function getRebalanceEvents(): Promise<RebalanceEvent[]> {
  try {
    const response = await backendClient<RebalanceEventsResponse>(
      "/portfolio/robo-portfolio/rebalance/details",
      {
        method: "GET",
      }
    );
    return response ? response.rebalance_details : [];
  } catch (error) {
    console.error("No rebalance events exist", error);
    return [];
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
    const response = await backendClient<RoboPortfolioSplitResponse>(
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
    const response = await backendClient<RoboPortfolioAssetAllocationResponse>(
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
    const response = await backendClient<{ message: string }>(
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

export async function addMoneyToRoboPortfolio(
  amount: number
): Promise<boolean> {
  try {
    const response = await backendClient<{ message: string }>(
      "/portfolio/robo-portfolio/add",
      {
        method: "POST",
        body: JSON.stringify({ amount }),
      }
    );

    if (!response) return false;
    return true;
  } catch (error) {
    console.error("Error in adding money to robo portfolio", error);
    return false;
  }
}

export async function withdrawMoneyFromRoboPortfolio(
  amount: number
): Promise<number | null> {
  try {
    const response = await backendClient<{ amount: number }>(
      "/portfolio/robo-portfolio/withdraw",
      { method: "POST", body: JSON.stringify({ amount }) }
    );
    if (!response) return null;
    return response.amount;
  } catch (error) {
    console.error("Error in withdrawing money from robo portfolio", error);
    return null;
  }
}

export async function forceRebalance(): Promise<string> {
  try {
    const response = await backendClient<RoboPortfolioResponse | null>(
      "/portfolio/robo-portfolio/rebalance",
      { method: "GET" }
    );
    return response ? "Portfolio rebalanced" : "Error when rebalancing";
  } catch (error) {
    console.error("Error in force rebalancing", error);
    return "Error when rebalancing";
  }
}
