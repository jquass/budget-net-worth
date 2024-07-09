export interface Transaction {
  id: number;
  date: string[];
  memo: string;
  amount: number;
  accountId: number;
  uploadId: number;
  uploadRowId: number;
  budgetId: number;
}
