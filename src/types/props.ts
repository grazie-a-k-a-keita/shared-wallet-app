import type { Dispatch, SetStateAction } from 'react';

import type { MonthlyBalance } from './fetchData';

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
  onClick: () => void;
};

// MuiTextField Props type
export type TextFieldProps = {
  label: string;
};

// MuiTextFieldDate Props type

// MuiTextFieldNumber Props type
export type TextFieldNumberProps = {
  label: string;
};

// MuiTextFieldSelect Props type
export type TextFieldSelectProps = {
  label: string;
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
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};
