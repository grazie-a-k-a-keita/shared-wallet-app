import type { Dispatch, SetStateAction } from 'react';

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
  onValueChange?: (value: string) => void;
};

// TextFieldDate Props type
export type TextFieldDateProps = {
  onValueChange?: (value: string) => void;
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

// ========================
// components
// ========================

// Header Props type
export type HeaderProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};
