import { useLocation, useNavigate } from 'react-router-dom';

import calendarOffIcon from '../assets/calendar_off.svg';
import calendarOnIcon from '../assets/calendar_on.svg';
import graphOffIcon from '../assets/graph_off.svg';
import graphOnIcon from '../assets/graph_on.svg';
import inputOffIcon from '../assets/input_off.svg';
import inputOnIcon from '../assets/input_on.svg';
import settingOffIcon from '../assets/setting_off.svg';
import settingOnIcon from '../assets/setting_on.svg';

import classes from './Footer.module.scss';

function Footer() {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      {/* inputIcon */}
      <div
        className={pathName === '/' ? classes.iconBoxOn : classes.iconBoxOff}
        onClick={() => navigate('/')}
        onKeyDown={() => navigate('/')}
        role='button'
        tabIndex={-1}
      >
        <img src={pathName === '/' ? inputOnIcon : inputOffIcon} className={classes.icon} alt='' />
      </div>
      {/* calendarIcon */}
      <div
        className={pathName === '/calendar' ? classes.iconBoxOn : classes.iconBoxOff}
        onClick={() => navigate('/calendar')}
        onKeyDown={() => navigate('/calendar')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pathName === '/calendar' ? calendarOnIcon : calendarOffIcon}
          className={classes.icon}
          alt=''
        />
      </div>
      {/* graphIcon */}
      <div
        className={pathName === '/graph' ? classes.iconBoxOn : classes.iconBoxOff}
        onClick={() => navigate('/graph')}
        onKeyDown={() => navigate('/graph')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pathName === '/graph' ? graphOnIcon : graphOffIcon}
          className={classes.icon}
          alt=''
        />
      </div>
      {/* settingIcon */}
      <div
        className={pathName === '/setting' ? classes.iconBoxOn : classes.iconBoxOff}
        onClick={() => navigate('/setting')}
        onKeyDown={() => navigate('/setting')}
        role='button'
        tabIndex={-1}
      >
        <img
          src={pathName === '/setting' ? settingOnIcon : settingOffIcon}
          className={classes.icon}
          alt=''
        />
      </div>
    </div>
  );
}

export default Footer;
