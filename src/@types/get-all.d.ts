declare type GetAll = {
  totalAssets: number;
  monthlyBalance: { yearMonth: string; monthSpending: number; monthIncome: number }[];
};
