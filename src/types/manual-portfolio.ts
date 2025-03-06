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

export type ManualPortfoliosResponse = {
  portfolios: ManualPortfolio[];
};
