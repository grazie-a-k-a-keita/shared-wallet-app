declare type GetDetail = {
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
