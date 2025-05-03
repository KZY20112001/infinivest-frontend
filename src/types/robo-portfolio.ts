export type ROBO_CATEGORY =
  | "large_cap_blend"
  | "small_cap_blend"
  | "international_stocks"
  | "emerging_markets"
  | "intermediate_bonds"
  | "international_bonds";

export type RebalanceEvent = {
  CreatedAt: string;
  totalBuyAmount: number;
  totalSellAmount: number;
  netChange: number;

  success: boolean;
  reason?: string;

  portfolioValueBefore: number;
  portfolioValueAfter: number;
  gainOrLoss: number;
};

export type RebalanceEventsResponse = {
  rebalance_details: RebalanceEvent[];
};

export type RoboPortfolioAsset = {
  symbol: string;
  name: string;
  percentage: number;

  sharesOwned: number;
  totalInvested: number;
  avgBuyPrice: number;
};

export type RoboPortfolioCategory = {
  name: string;
  totalAmount: number;
  totalPercentage: number;
  assets: RoboPortfolioAsset[];
};

export type RoboPortfolio = {
  categories: RoboPortfolioCategory[];
  rebalanceFreq?: string;
};

export type RoboPortfolioSummary = {
  rebalanceFreq: string;
  totalValue: number;
  totalInvested: number;
};

export type RoboPortfolioResponse = {
  portfolio: RoboPortfolio;
};

export type RoboPortfolioSummaryResponse = {
  summary: RoboPortfolioSummary;
};

export type RoboPortfolioSplit = {
  largeCapBlend: number;
  smallCapBlend: number;
  internationalStocks: number;
  emergingMarkets: number;
  intermediateBonds: number;
  internationalBonds: number;
  cash: number;
};

export type RoboPortfolioSplitResponse = {
  portfolio: RoboPortfolioSplit;
  reason: string;
};

export type RoboPortfolioAssetSummary = {
  name: string;
  symbol: string;
  percentage: number;
};

export type RoboPortfolioCategoryAssets = {
  assets: RoboPortfolioAssetSummary[];
};

export type RoboPortfolioAssetAllocationResponse = {
  allocations: Record<ROBO_CATEGORY, RoboPortfolioCategoryAssets>;
};
