declare type CreateData = {
  paymentDate: string;
  paymentType: boolean;
  totalAmount: number;
  categoryID: number;
  memo: string;
  memos: { memo: string; amount: number }[];
};
