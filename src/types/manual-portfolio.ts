export type ManualPortfolioAsset = {
  symbol: string;
  name: string;
  sharesOwned: number;
  totalInvested: number;
  avgBuyPrice: number;
};

export type ManualPortfolio = {
  name: string;
  assets: ManualPortfolioAsset[];
  totalCash: number;
};

export type ManualPortfolioResponse = {
  portfolio: ManualPortfolio;
};

export type ManualPortfolioSummary = {
  name: string;
  totalValue: number;
};

export type ManualPortfoliosSummariesResponse = {
  portfolios: ManualPortfolioSummary[];
};
