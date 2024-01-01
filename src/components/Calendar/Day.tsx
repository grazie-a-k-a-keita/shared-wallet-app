import classes from './Day.module.scss';

import type { DayProps } from '../../types/props';

function Day(props: DayProps) {
  const { date, spendingTotal, incomeTotal } = props;
  return (
    <div className={classes.container}>
      <p className={classes.date}>{date}</p>
      {incomeTotal ? (
        <p className={classes.incomeAmount}>
          <span className={classes.span}>￥</span>
          {incomeTotal.toLocaleString()}
        </p>
      ) : (
        <p className={classes.amount_hide}>-</p>
      )}
      {spendingTotal ? (
        <p className={classes.spendingAmount}>
          <span className={classes.span}>￥</span>
          {spendingTotal.toLocaleString()}
        </p>
      ) : (
        <p className={classes.amount_hide}> </p>
      )}
    </div>
  );
}

export default Day;
