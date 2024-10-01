import classes from './footer.module.scss';

import calendarMonthOff from '@/assets/footer-icon/calendar-month-off.svg';
import calendarMonthOn from '@/assets/footer-icon/calendar-month-on.svg';
import noteAltOff from '@/assets/footer-icon/note-alt-off.svg';
import noteAltOn from '@/assets/footer-icon/note-alt-on.svg';
import syncAltOff from '@/assets/footer-icon/sync-alt-off.svg';
import syncAltOn from '@/assets/footer-icon/sync-alt-on.svg';
import walletOff from '@/assets/footer-icon/wallet-off.svg';
import walletOn from '@/assets/footer-icon/wallet-on.svg';

type FooterProps = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

export default function Footer(props: FooterProps) {
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
