import { useEffect, useState } from 'react';

import Month from '../../components/Calendar/Month';
import { getMonthDetails } from '../../configs/util';

import type { CalendarPageProps } from '../../types/props';
import type { Days } from '../../types/type';

function Calendar(props: CalendarPageProps) {
  const { year, month } = props;

  const [monthDetail, setMonthDetail] = useState<Days>([]);

  useEffect(() => {
    setMonthDetail(getMonthDetails(year, month));
  }, [year, month]);

  return (
    <main>
      <Month days={monthDetail} />
    </main>
  );
}

export default Calendar;
