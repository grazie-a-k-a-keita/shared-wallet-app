declare type PaymentsInfo = {
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
