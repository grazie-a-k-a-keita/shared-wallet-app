// 月の支出、収入
export type MonthlyBalance = {
  date: string;
  spendingTotal: number;
  incomeTotal: number;
}[];

// POST /v1/payment/registration
export type RegistrationData = {
  paymentDate: string;
  paymentType: boolean;
  totalAmount: number;
  categoryID: number;
  memo: string;
  memos: { memo: string; amount: number }[];
};
