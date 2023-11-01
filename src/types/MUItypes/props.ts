import type { Dispatch, SetStateAction } from 'react';

// ToggleButton Props type
export type ToggleButtonProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};

// TextField Props type
export type TextFieldProps = {
  label: string;
  onValueChange?: (value: string) => void;
};

// TextFieldDate Props type
export type TextFieldDateProps = {
  onValueChange?: (value: string) => void;
};
