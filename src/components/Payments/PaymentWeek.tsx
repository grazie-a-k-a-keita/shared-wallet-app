import classes from './PaymentWeek.module.scss';

type PaymentWeekProps = {
  currentWeek: number;
};

function PaymentsWeek(props: PaymentWeekProps) {
  const { currentWeek } = props;
  return (
    <div className={classes.container}>
      <p className={classes.text}>Week{currentWeek}</p>
    </div>
  );
}

export default PaymentsWeek;
