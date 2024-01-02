import { useEffect, useState } from 'react';

import { getMonthDetails } from '../../configs/util';

import Day from './Day';
import classes from './Month.module.scss';

import type { MonthProps } from '../../types/props';
import type { Days } from '../../types/type';

function Month(props: MonthProps) {
  const { year, month, monthlyBalance } = props;
  const [monthDetails, setMonthDetails] = useState<Days>([]);

  useEffect(() => {
    setMonthDetails(getMonthDetails(year, month));
  }, [year, month]);

  const renderMonthList = () => {
    const calender: JSX.Element[] = [];
    const tempArray: Days = [];
    monthDetails.forEach((e1) => {
      monthlyBalance.forEach((e2) => {
        const tempObj = e1;
        if (e1.date === Number(e2.date.slice(-2))) {
          tempObj.spendingTotal = e2.spendingTotal;
          tempObj.incomeTotal = e2.incomeTotal;
        }
        tempArray.push(tempObj);
      });
      calender.push(
        <div key={e1.id} className={classes.container_day}>
          <Day date={e1.date} spendingTotal={e1.spendingTotal} incomeTotal={e1.incomeTotal} />
        </div>
      );
    });
    return calender;
  };

  return <div className={classes.container_month}>{renderMonthList()}</div>;
}

export default Month;
