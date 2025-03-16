"use server";

import { microserviceClient } from "@/app/api/client";
import { AssetPriceHistory } from "@/types/asset";

export async function getAssetDescription(symbol: string): Promise<string> {
  try {
    const response = await microserviceClient<string>(
      `/assets/description/${symbol}`,
      {
        method: "GET",
      }
    );
    return response ? response : "";
  } catch (error) {
    console.error("No asset description exists", error);
    return "";
  }
}

export async function getAssetPrice(symbol: string): Promise<number> {
  try {
    const response = await microserviceClient<number>(
      `/assets/latest-price/${symbol}`,
      {
        method: "GET",
      }
    );
    return response ? response : -1;
  } catch (error) {
    console.error("No asset price exists", error);
    return -1;
  }
}

export async function getAssetHistory(
  symbol: string
): Promise<AssetPriceHistory> {
  try {
    const response = await microserviceClient<AssetPriceHistory>(
      `/assets/price-history/${symbol}`,
      {
        method: "GET",
      }
    );
    return response ? response : [];
  } catch (error) {
    console.error("No asset history exists", error);
    return [];
  }
}

export async function getAssetsByKeyword(
  keyword: string
): Promise<[string, string][]> {
  try {
    const response = await microserviceClient<[string, string][]>(
      `/assets/${keyword}`,
      {
        method: "GET",
      }
    );
    return response ?? [];
  } catch (error) {
    console.error("No assets found", error);
    return [];
  }
}
