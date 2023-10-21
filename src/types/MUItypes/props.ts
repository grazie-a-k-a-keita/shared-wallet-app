import type { Dispatch, SetStateAction } from 'react';

// ToggleButton Props type
export type ToggleButtonProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};
