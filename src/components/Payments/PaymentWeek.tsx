import classes from './PaymentWeek.module.scss';

import type { PaymentWeekProps } from '../../types/props';

function PaymentsWeek(props: PaymentWeekProps) {
  const { currentWeek } = props;
  return (
    <div className={classes.container}>
      <p className={classes.text}>Week{currentWeek}</p>
    </div>
  );
}

export default PaymentsWeek;
