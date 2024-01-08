import { useEffect, useState } from 'react';

import Month from '../../components/Calendar/Month';
import { getMonthDetails } from '../../configs/util';

import type { CalendarPageProps, MonthProps } from '../../types/props';

function Calendar(props: CalendarPageProps) {
  const { year, month, fetchDataState } = props;

  const [monthDetail, setMonthDetail] = useState<MonthProps>({ daysInfo: [] });

  useEffect(() => {
    const daysInfo: MonthProps = { daysInfo: [] };
    const days = getMonthDetails(year, month);

    days.forEach((item) => {
      const tempObj = {
        id: item.id,
        date: item.date,
        thisMonth: item.thisMonth,
        today: item.today,
        spending: 0,
        income: 0,
      };
      daysInfo.daysInfo.push(tempObj);
    });

    const filterArray = fetchDataState.filter(
      (item) => item.yearMonth === `${year}-${String(month).padStart(2, '0')}`
    );

    if (filterArray[0]?.monthlyPayments.length >= 1) {
      filterArray[0].monthlyPayments.forEach((item) => {
        for (let i = 0; i < daysInfo.daysInfo.length; i += 1) {
          // 支出金額の設定
          if (
            item.paymentType &&
            daysInfo.daysInfo[i].date === Number(item.paymentDate.substring(8, 10))
          ) {
            daysInfo.daysInfo[i].spending += item.totalAmount;
          }

          // 収入金額の設定
          if (
            !item.paymentType &&
            daysInfo.daysInfo[i].date === Number(item.paymentDate.substring(8, 10))
          ) {
            daysInfo.daysInfo[i].income += item.totalAmount;
          }
        }
      });
    }

    setMonthDetail(daysInfo);
  }, [year, month, fetchDataState]);

  return (
    <main>
      <Month daysInfo={monthDetail.daysInfo} />
    </main>
  );
}

export default Calendar;
