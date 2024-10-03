import classes from './payment-week.module.scss';

type PaymentWeekProps = {
  currentWeek: number;
};

export default function PaymentWeek(props: PaymentWeekProps) {
  const { currentWeek } = props;
  return (
    <div className={classes.container}>
      <p className={classes.text}>Week{currentWeek}</p>
    </div>
  );
}
