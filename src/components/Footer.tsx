import { useLocation, useNavigate } from 'react-router-dom';

import calendarMonthOff from '../assets/footerIcon/calendar_month_off.svg';
import calendarMonthOn from '../assets/footerIcon/calendar_month_on.svg';
import noteAltOff from '../assets/footerIcon/note_alt_off.svg';
import noteAltOn from '../assets/footerIcon/note_alt_on.svg';
import syncAltOff from '../assets/footerIcon/sync_alt_off.svg';
import syncAltOn from '../assets/footerIcon/sync_alt_on.svg';
import walletOff from '../assets/footerIcon/wallet_off.svg';
import walletOn from '../assets/footerIcon/wallet_on.svg';

import classes from './Footer.module.scss';

function Footer() {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div
        className={classes.iconButton}
        onClick={() => navigate('/')}
        onKeyDown={() => navigate('/')}
        role='button'
        tabIndex={-1}
      >
        <img src={pathName === '/' ? noteAltOn : noteAltOff} className={classes.icon} alt='' />
        <p className={pathName === '/' ? classes.iconLabel_on : classes.iconLabel_off}>入力</p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => navigate('/wallet')}
        onKeyDown={() => navigate('/wallet')}
        role='button'
        tabIndex={-1}
      >
        <img src={pathName === '/wallet' ? walletOn : walletOff} className={classes.icon} alt='' />
        <p className={pathName === '/wallet' ? classes.iconLabel_on : classes.iconLabel_off}>
          資産
        </p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => navigate('/calendar')}
        onKeyDown={() => navigate('/calendar')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pathName === '/calendar' ? calendarMonthOn : calendarMonthOff}
          className={classes.icon}
          alt=''
        />
        <p className={pathName === '/calendar' ? classes.iconLabel_on : classes.iconLabel_off}>
          カレンダー
        </p>
      </div>
      <div
        className={classes.iconButton}
        onClick={() => navigate('/payments')}
        onKeyDown={() => navigate('/payments')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pathName === '/payments' ? syncAltOn : syncAltOff}
          className={classes.icon}
          alt=''
        />
        <p className={pathName === '/payments' ? classes.iconLabel_on : classes.iconLabel_off}>
          入出金
        </p>
      </div>
    </div>
  );
}

export default Footer;
