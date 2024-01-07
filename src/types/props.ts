import type { Dispatch, SetStateAction } from 'react';

import type { MonthlyBalance } from './api';
import type { BarInfo, CardInfo, PageState } from './type';

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
  selectYear: number;
  selectMonth: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

// MuiSnackbar Props type
export type SnackbarProps = {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
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
// MUI Components
// ========================

// PieChart Props type
export type PieChartProps = {
  graphData: { 1: number; 2: number; 3: number; 4: number; 5: number; 6: number; 7: number };
};

// ========================
// Components
// ========================

// Footer Props type
export type FooterProps = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

// Header1 Props type
export type Header1Props = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
  amount: number;
  onClick: () => void;
};

// Header2 Props type
export type Header2Props = {
  year: number;
  month: number;
  onClick1: () => void;
  onClick2: () => void;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

// ========================
// Pages
// ========================

// InputPage Props type
export type InputPageProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
};

// WalletPage Props type
export type WalletPageProps = {
  //
};

// CalendarPage Props type
export type CalendarPageProps = {
  //
};

// PaymentsPage Props type
export type PaymentsPageProps = {
  //
};
