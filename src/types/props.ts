import type { Dispatch, SetStateAction } from 'react';

import type { MonthlyBalance } from './api';
import type { CardInfo } from './type';

// ========================
// Calendar
// ========================

// Calendar-Day Props type
export type DayProps = {
  date?: number;
  spendingTotal?: number;
  incomeTotal?: number;
};

// Calendar-Month Props type
export type MonthProps = {
  year: number;
  month: number;
  monthlyBalance: MonthlyBalance;
};

// ========================
// MUI Components
// ========================

// MuiButton Props type
export type ButtonProps = {
  buttonName: string;
  onclick: () => void;
};

// MuiDialog Props type
export type DialogProps = {
  setYearTop: React.Dispatch<React.SetStateAction<number>>;
  setMonthTop: React.Dispatch<React.SetStateAction<number>>;
};

// MuiIconButton Props type
export type IconButtonProps = {
  iconType: 'navigateBefore' | 'navigateNext' | 'delete' | 'libraryAdd';
  iconSize: 24 | 32;
  onClick: () => void;
};

// MuiInputCard Props type
export type InputCardProps = {
  itemNumber: number;
  refObject: React.RefObject<HTMLDivElement>;
  cardInfo: CardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
};

// MuiTextField Props type
export type TextFieldProps = {
  label: string;
  value?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  errorInfo: { error: boolean; message: string };
};

// MuiTextFieldDate Props type
export type TextFieldDateProps = {
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

// MuiTextFieldNumber Props type
export type TextFieldNumberProps = {
  label: string;
  value?: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isValue: boolean;
  errorInfo: { error: boolean; message: string };
};

// MuiTextFieldSelect Props type
export type TextFieldSelectProps = {
  label: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<number>>;
};

// MuiToggleButton Props type
export type ToggleButtonProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};

// ========================
// Components
// ========================

// Header Props type
export type HeaderProps = {
  headerType: 'Default' | 'Input';
  leftButtonName?: string;
  rightButtonName?: string;
  setToggleStatus?: Dispatch<SetStateAction<boolean>>;
  amount?: number;
  onClick1?: () => void;
  onClick2?: () => void;
  onClick3?: () => void;
};
