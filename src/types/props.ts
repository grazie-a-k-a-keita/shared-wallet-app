import type { Dispatch, SetStateAction } from 'react';

import type { MonthlyBalance } from './fetchData';

// ========================
// MUI components
// ========================

// ToggleButton Props type
export type ToggleButtonProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};

// TextField Props type
export type TextFieldProps = {
  label: string;
  type: 'text' | 'number';
  select?: boolean;
  state: string | number;
  setStateString?: React.Dispatch<React.SetStateAction<string>>;
  setStateNumber?: React.Dispatch<React.SetStateAction<number>>;
};

// TextFieldDate Props type
export type TextFieldDateProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

// Button Props type
export type ButtonProps = {
  buttonName: string;
  onclick: () => void;
};

// Card Props type
export type CardProps = {
  itemNumber: number;
  deleteButtonClick: (index: number) => void;
  minorItems: { memo: string; amount: number }[];
  setMinorItems: React.Dispatch<React.SetStateAction<{ memo: string; amount: number }[]>>;
};

// AddCircleOutlineButton Props type
export type AddCircleOutlineButtonProps = {
  addButtonClick: () => void;
};

// DeleteButton Props type
export type DeleteButtonProps = {
  itemNumber: number;
  deleteButtonClick: (index: number) => void;
};

// Dialog Props type
export type DialogProps = {
  setYearTop: React.Dispatch<React.SetStateAction<number>>;
  setMonthTop: React.Dispatch<React.SetStateAction<number>>;
};

// ========================
// components
// ========================

// Header Props type
export type HeaderProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};

// Calendar-Month Props type
export type MonthProps = {
  year: number;
  month: number;
  monthlyBalance: MonthlyBalance;
};

// Calendar-Day Props type
export type DayProps = {
  date?: number;
  spendingTotal?: number;
  incomeTotal?: number;
};
