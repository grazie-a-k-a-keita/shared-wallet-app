// ========================
// Input Page
// ========================
export type CardInfo = { memo: string; amount: number; valid: boolean }[];

// ========================
//
// ========================
export type Days = {
  id: string;
  date?: number;
  day?: string;
  thisMonth: boolean;
  spendingTotal?: number;
  incomeTotal?: number;
}[];
