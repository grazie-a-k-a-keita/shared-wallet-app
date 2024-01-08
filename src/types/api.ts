// POST /v1/payment/registration
export type RegistrationData = {
  paymentDate: string;
  paymentType: boolean;
  totalAmount: number;
  categoryID: number;
  memo: string;
  memos: { memo: string; amount: number }[];
};

// POST /v1/payment/get/all
export type GetAll = {
  totalAssets: number;
  monthlyBalance: { yearMonth: string; monthSpending: number; monthIncome: number }[];
};

// POST /v1/payment/get/detail
export type GetDetail = {
  yearMonth: string;
  monthlyPayments: {
    seqId: number;
    paymentDate: string;
    paymentType: boolean;
    totalAmount: number;
    categoryID: number;
    memo: string;
    memos: { memo: string; amount: number }[];
  }[];
}[];
