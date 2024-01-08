import classes from './Date.module.scss';

import type { DateProps } from '../../types/props';

function Date(props: DateProps) {
  const { date, today, underLine } = props;

  return (
    <div className={underLine ? classes.container_under : classes.container_none}>
      <div className={today ? classes.circle_today : classes.circle_none}>
        <p>{date || ''}</p>
      </div>

      <div className={classes.margin6} />

      <p className={classes.amount_income}>&yen; {Number(10000).toLocaleString()}</p>

      <div className={classes.margin2} />

      <p className={classes.amount_spending}>&yen; {Number(10000).toLocaleString()}</p>
    </div>
  );
}

export default Date;
