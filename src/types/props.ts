import type { Dispatch, SetStateAction } from 'react';

// Header Props type
export type HeaderProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: Dispatch<SetStateAction<boolean>>;
};
