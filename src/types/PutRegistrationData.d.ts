// POST /v1/payment/put
declare type PutRegistrationData = {
  paymentDate: string;
  paymentType: boolean;
  totalAmount: number;
  categoryID: number;
  memo: string;
  memos: { memo: string; amount: number }[];
};
