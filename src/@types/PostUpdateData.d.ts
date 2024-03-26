// POST /v1/payment/post/item
declare type PostUpdateData = {
  updateFlag: 'Update' | 'Delete';
  seqId: number;
  paymentDate: string;
  paymentType: boolean;
  totalAmount?: number;
  categoryID: number;
  memo: string;
  memosOrder: number;
  memos?: { memo: string; amount: number };
};
