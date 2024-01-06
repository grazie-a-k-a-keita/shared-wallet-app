import calendarMonthOff from '../assets/footerIcon/calendar_month_off.svg';
import calendarMonthOn from '../assets/footerIcon/calendar_month_on.svg';
import noteAltOff from '../assets/footerIcon/note_alt_off.svg';
import noteAltOn from '../assets/footerIcon/note_alt_on.svg';
import syncAltOff from '../assets/footerIcon/sync_alt_off.svg';
import syncAltOn from '../assets/footerIcon/sync_alt_on.svg';
import walletOff from '../assets/footerIcon/wallet_off.svg';
import walletOn from '../assets/footerIcon/wallet_on.svg';

import classes from './Footer.module.scss';

import type { FooterProps } from '../types/props';

function Footer(props: FooterProps) {
  const { pageState, setPageState } = props;

  const handleChangePage = (input: 'Input' | 'Wallet' | 'Calendar' | 'Payments') => {
    const setObj = { state: input };
    setPageState(setObj);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.iconButton}
        onClick={() => handleChangePage('Input')}
        onKeyDown={() => handleChangePage('Input')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pageState.state === 'Input' ? noteAltOn : noteAltOff}
          className={classes.icon}
          alt=''
        />
        <p className={pageState.state === 'Input' ? classes.iconLabel_on : classes.iconLabel_off}>
          入力
        </p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => handleChangePage('Wallet')}
        onKeyDown={() => handleChangePage('Wallet')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pageState.state === 'Wallet' ? walletOn : walletOff}
          className={classes.icon}
          alt=''
        />
        <p className={pageState.state === 'Wallet' ? classes.iconLabel_on : classes.iconLabel_off}>
          資産
        </p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => handleChangePage('Calendar')}
        onKeyDown={() => handleChangePage('Calendar')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pageState.state === 'Calendar' ? calendarMonthOn : calendarMonthOff}
          className={classes.icon}
          alt=''
        />
        <p
          className={pageState.state === 'Calendar' ? classes.iconLabel_on : classes.iconLabel_off}
        >
          カレンダー
        </p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => handleChangePage('Payments')}
        onKeyDown={() => handleChangePage('Payments')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pageState.state === 'Payments' ? syncAltOn : syncAltOff}
          className={classes.icon}
          alt=''
        />
        <p
          className={pageState.state === 'Payments' ? classes.iconLabel_on : classes.iconLabel_off}
        >
          入出金
        </p>
      </div>
    </div>
  );
}

export default Footer;
