export type AssetPriceHistoryPoint = {
  date: string;
  close: number;
};

export type AssetPriceHistory = AssetPriceHistoryPoint[];

export interface AssetRecommendations {
  assets: [string, string][];
  reason: string;
}
