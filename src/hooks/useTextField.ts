import { useState } from 'react';

// 現在日付取得
const now: Date = new Date();
const YYYY: string = now.getFullYear().toString();
const MM: string = (now.getMonth() + 1).toString().padStart(2, '0');
const DD: string = now.getDate().toString().padStart(2, '0');
const today: string = `${YYYY}-${MM}-${DD}`;

function useTextField() {
  const [date, setDate] = useState<string>(today);
  const [category, setCategory] = useState<string>('');
  const [majorItem, setMajorItem] = useState<string>('');

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleMajorItemChange = (value: string) => {
    setMajorItem(value);
  };

  return {
    date,
    handleDateChange,
    category,
    handleCategoryChange,
    majorItem,
    handleMajorItemChange,
  };
}

export default useTextField;
