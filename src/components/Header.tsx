import classes from './Header.module.scss';
import MuiButton from './MUIcomponents/MuiButton';
import MuiIconButton from './MUIcomponents/MuiIconButton';
import ToggleButton from './MUIcomponents/MuiToggleButton';

import type { HeaderProps } from '../types/props';

function Header(props: HeaderProps) {
  const { headerType, leftButtonName, rightButtonName, setToggleStatus } = props;

  const onClick = () => console.log('warning');

  return (
    <div>
      {headerType === 'Input' ? (
        <>
          <div className={classes.toggleButtonContainer}>
            <div className={classes.toggleButtonBackground}>
              <ToggleButton
                leftButtonName={leftButtonName}
                rightButtonName={rightButtonName}
                setToggleStatus={setToggleStatus}
              />
            </div>
          </div>
          <div className={classes.totalAmountContainer}>
            <p className={classes.totalAmount}>&yen; 10,000</p>
            <div className={classes.totalAmount_Button}>
              <MuiButton buttonName='保存' onclick={onClick} />
            </div>
          </div>
        </>
      ) : (
        <div className={classes.year_month_container}>
          <MuiIconButton iconType='navigateBefore' iconSize={32} />
          <p className={classes.year_month_text}>2024年 01月</p>
          <MuiIconButton iconType='navigateNext' iconSize={32} />
        </div>
      )}
    </div>
  );
}

export default Header;
