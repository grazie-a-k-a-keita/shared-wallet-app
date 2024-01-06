// ========================
// Home
// ========================
export type PageState = {
  state: 'Input' | 'Wallet' | 'Calendar' | 'Payments';
};
export type BarInfo = {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

// ========================
// Input Page
// ========================
export type CardInfo = {
  memo: string;
  amount: number;
  valid: boolean;
  errorInfo: {
    memoErr: boolean;
    memoMessage: string;
    amountErr: boolean;
    amountMessage: string;
  };
}[];
export type SpendingAmountErrorInfo = {
  memoErr: boolean;
  memoMessage: string;
};
export type IncomeAmountErrorInfo = {
  memoErr: boolean;
  memoMessage: string;
  amountErr: boolean;
  amountMessage: string;
};

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
