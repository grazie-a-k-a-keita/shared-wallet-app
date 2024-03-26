declare type CardInfo = {
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
