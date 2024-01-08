import Date from './Date';
import Day from './Day';
import classes from './Month.module.scss';

import type { MonthProps } from '../../types/props';

function Month(props: MonthProps) {
  const { daysInfo } = props;

  const renderDayList = () => {
    const dayList: JSX.Element[] = [];
    dayList.push(<Day key='Sun' day='Sun' />);
    dayList.push(<Day key='Mon' day='Mon' />);
    dayList.push(<Day key='Tue' day='Tue' />);
    dayList.push(<Day key='Wed' day='Wed' />);
    dayList.push(<Day key='Thu' day='Thu' />);
    dayList.push(<Day key='Fri' day='Fri' />);
    dayList.push(<Day key='Sat' day='Sat' />);
    return dayList;
  };

  const renderDateList = () => {
    const dateList: JSX.Element[] = [];
    let weekList: JSX.Element[] = [];
    let columnCount = 1;

    daysInfo.forEach((item) => {
      weekList.push(
        <Date
          key={item.id}
          date={item.date}
          today={item.today}
          spending={item.spending}
          income={item.income}
          underLine={!(columnCount >= 36)}
        />
      );

      if (columnCount % 7 === 0) {
        dateList.push(
          <div key={columnCount} className={classes.container_week}>
            {weekList}
          </div>
        );
        weekList = [];
      }

      columnCount += 1;
    });

    return dateList;
  };

  return (
    <div className={classes.container}>
      <div className={classes.container_day}>{renderDayList()}</div>
      <div className={classes.container_date}>{renderDateList()}</div>
    </div>
  );
}

export default Month;
