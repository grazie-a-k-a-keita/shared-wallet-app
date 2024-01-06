import { useState } from 'react';

import classes from './Header.module.scss';
import MuiButton from './MUIcomponents/MuiButton';
import MuiIconButton from './MUIcomponents/MuiIconButton';
import ToggleButton from './MUIcomponents/MuiToggleButton';

import type { HeaderProps } from '../types/props';

function Header(props: HeaderProps) {
  const {
    headerType,
    leftButtonName,
    rightButtonName,
    setToggleStatus,
    amount,
    onClick1,
    onClick2,
    onClick3,
  } = props;

  const [, setDummy] = useState<boolean>(true);
  const dummyFunc = () => {};

  return (
    <div>
      {headerType === 'Input' ? (
        <>
          <div className={classes.toggleButtonContainer}>
            <div className={classes.toggleButtonBackground}>
              <ToggleButton
                leftButtonName={String(leftButtonName)}
                rightButtonName={String(rightButtonName)}
                setToggleStatus={setToggleStatus || setDummy}
              />
            </div>
          </div>
          <div className={classes.totalAmountContainer}>
            <p className={classes.totalAmount}>&yen; {Number(amount).toLocaleString()}</p>
            <div className={classes.totalAmount_Button}>
              <MuiButton buttonName='保存' onclick={onClick1 || dummyFunc} />
            </div>
          </div>
        </>
      ) : (
        <div className={classes.year_month_container}>
          <MuiIconButton iconType='navigateBefore' iconSize={32} onClick={onClick2 || dummyFunc} />
          <p className={classes.year_month_text}>2024年 01月</p>
          <MuiIconButton iconType='navigateNext' iconSize={32} onClick={onClick3 || dummyFunc} />
        </div>
      )}
    </div>
  );
}

export default Header;
