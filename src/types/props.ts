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

// TextFieldSelect Props type
export type TextFieldSelectProps = {
  label: string;
};

// TextField Props type
export type TextFieldProps = {
  label: string;
};

// TextFieldDate Props type

// TextFieldNumber Props type
export type TextFieldNumberProps = {
  label: string;
};

// Button Props type
export type ButtonProps = {
  buttonName: string;
  onclick: () => void;
};

// Card Props type
export type CardProps = {
  itemNumber: number;
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

// IconButton Props type
export type IconButtonProps = {
  iconType: 'navigateBefore' | 'navigateNext' | 'delete' | 'libraryAdd';
  iconSize: 24 | 32;
};

// ========================
// components
// ========================

// Header Props type
export type HeaderProps = {
  headerType: 'Default' | 'Input';
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
