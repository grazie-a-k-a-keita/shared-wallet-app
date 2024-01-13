import classes from './PaymentDay.module.scss';

import type { PaymentDayProps } from '../../types/props';

function PaymentDay(props: PaymentDayProps) {
  const { date, day, income, spending } = props;

  return (
    <div className={classes.container}>
      <div className={classes.container_left}>
        <p className={classes.date}>{String(date).padStart(2, '0')}</p>
        <p className={classes.day}>({day})</p>
      </div>
      <div className={classes.container_right}>
        <p className={classes.income}>&yen; {income.toLocaleString()}</p>
        <p className={classes.spending}>&yen; {spending.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default PaymentDay;
