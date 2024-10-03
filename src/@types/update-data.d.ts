declare type UpdateData = {
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
