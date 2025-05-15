export type Transaction = {
  CreatedAt: string;
  transactionType: string; // "buy" or "sell" or "deposit" or "withdrawal"
  totalAmount: number;

  symbol?: string;
  name?: string;
  price?: number;
  sharesAmount?: number;
};

export type TransactionsResponse = {
  transactions: Transaction[];
};
