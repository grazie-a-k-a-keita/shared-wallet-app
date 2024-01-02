import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import type { Days } from '../types/type';

export function getMonthDetails(year: number, month: number) {
  const daysArray: Days = [];
  const startDate: dayjs.Dayjs = dayjs(`${year}-${month}-01`);
  const endDate: dayjs.Dayjs = startDate.endOf('month');
  let currentDate: dayjs.Dayjs = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    daysArray.push({
      id: uuid(),
      date: currentDate.date(),
      day: currentDate.format('ddd'),
      thisMonth: true,
    });
    currentDate = currentDate.add(1, 'day');
  }

  // 日曜始まりになるように配列の数を合わせる
  if (daysArray[0].day !== 'Sun') {
    let addCount = 0;
    switch (daysArray[0].day) {
      case 'Sat':
        addCount = 6;
        break;
      case 'Fri':
        addCount = 5;
        break;
      case 'Thu':
        addCount = 4;
        break;
      case 'Wed':
        addCount = 3;
        break;
      case 'Tue':
        addCount = 2;
        break;
      case 'Mon':
        addCount = 1;
        break;
      default:
        break;
    }

    for (let i = 0; i < addCount; i += 1) {
      daysArray.unshift({
        id: uuid(),
        thisMonth: false,
      });
    }
  }

  // daysArrayの配列が42コになるようにpush()する
  if (daysArray.length !== 42) {
    for (let i = daysArray.length; i < 42; i += 1) {
      daysArray.push({
        id: uuid(),
        thisMonth: false,
      });
    }
  }
  return daysArray;
}

export function getCurrentDay() {
  const now: Date = new Date();
  const yyyy: string = now.getFullYear().toString();
  const mm: string = (now.getMonth() + 1).toString().padStart(2, '0');
  const dd: string = now.getDate().toString().padStart(2, '0');
  const today: string = `${yyyy}-${mm}-${dd}`;
  return today;
}
