import classes from './date.module.scss';

type DateProps = {
  date: number;
  today: boolean;
  spending: number;
  income: number;
  underLine: boolean;
};

export default function Date(props: DateProps) {
  const { date, today, spending, income, underLine } = props;

  return (
    <div className={underLine ? classes.container_under : classes.container_none}>
      <div className={today ? classes.circle_today : classes.circle_none}>
        <p>{date || ''}</p>
      </div>

      <div className={classes.margin6} />

      {income ? (
        <p className={classes.amount_income}>&yen; {Number(income).toLocaleString()}</p>
      ) : (
        <p className={classes.amount_hide}>&yen; {Number(income).toLocaleString()}</p>
      )}

      <div className={classes.margin2} />

      {spending ? (
        <p className={classes.amount_spending}>&yen; {Number(spending).toLocaleString()}</p>
      ) : (
        <p className={classes.amount_hide}>&yen; {Number(income).toLocaleString()}</p>
      )}
    </div>
  );
}
