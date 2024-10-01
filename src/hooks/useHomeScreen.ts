import { useState } from 'react';

import { getCurrentDay } from '@/configs/util';

function useHomeScreen() {
  const [year, setYear] = useState<number>(Number(getCurrentDay().substring(0, 4)));
  const [month, setMonth] = useState<number>(Number(getCurrentDay().substring(5, 7)));

  const handlePreviousMonth = () => {
    if (month === 1 && year <= 2024) {
      // 2024年 ~ 現在の年の範囲しか設定させない
    } else if (month !== 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };

  const handleNextMonth = () => {
    if (month === 12 && year >= Number(getCurrentDay().substring(0, 4))) {
      // 2024年 ~ 現在の年の範囲しか設定させない
    } else if (month !== 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };

  return { year, setYear, month, setMonth, handlePreviousMonth, handleNextMonth };
}

export default useHomeScreen;
