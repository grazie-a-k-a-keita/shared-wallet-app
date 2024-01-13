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

export type WalletPageDisplayInfo = {
  totalAssets: number;
  monthSpending: number;
  monthIncome: number;
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
// Payments Page
// ========================
export type PaymentsInfoItem = {
  id: string;
  date: number;
  day: string;
  dayTotalSpending: number;
  dayTotalIncome: number;
  paymentData: {
    seqId: number;
    paymentType: boolean;
    totalAmount: number;
    categoryID: number;
    memo: string;
    subMemo: string;
    subAmount: number;
    memosOrder: number;
  }[];
};

export type PaymentsInfo = {
  id: string;
  date: number;
  day: string;
  dayTotalSpending: number;
  dayTotalIncome: number;
  paymentData: {
    seqId: number;
    paymentType: boolean;
    totalAmount: number;
    categoryID: number;
    memo: string;
    subMemo: string;
    subAmount: number;
    memosOrder: number;
  }[];
}[];

// ========================
// Calendar
// ========================

export type Days = {
  id: string;
  date: number;
  day: string;
  thisMonth: boolean;
  today: boolean;
}[];

// ========================
// Chart
// ========================

export type PieChartGraphData = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
};
