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
  state: string | number;
  setStateString?: React.Dispatch<React.SetStateAction<string>>;
  setStateNumber?: React.Dispatch<React.SetStateAction<number>>;
};

// TextFieldDate Props type
export type TextFieldDateProps = {
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

// ========================
// components
// ========================

// Header Props type
export type HeaderProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};
