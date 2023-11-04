import { useState } from 'react';

// 現在日付取得
const now: Date = new Date();
const YYYY: string = now.getFullYear().toString();
const MM: string = (now.getMonth() + 1).toString().padStart(2, '0');
const DD: string = now.getDate().toString().padStart(2, '0');
const today: string = `${YYYY}-${MM}-${DD}`;

function useInputPage() {
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(today);
  const [category, setCategory] = useState<string>('');
  const [majorItem, setMajorItem] = useState<string>('');
  const [minorItems, setMinorItems] = useState<{ memo: string; amount: number }[]>([]);
  const [minorItemCount] = useState<number>(10);

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleMajorItemChange = (value: string) => {
    setMajorItem(value);
  };

  /**
   * カード内のTextFieldの更新時に"minorItems", "totalAmount"を更新する関数
   * @param index カードの順番/番号
   * @param value 更新された値
   */
  const handleMinorItemsChange = (index: number, value: { memo: string; amount: number }) => {
    const prevItems = [...minorItems];
    if (index > prevItems.length) {
      for (let i = prevItems.length + 1; i <= index; i += 1) {
        prevItems.push({ memo: '', amount: 0 });
      }
    }
    if (value.memo) prevItems[index - 1].memo = value.memo;
    if (value.memo === '') prevItems[index - 1].amount = value.amount;
    setMinorItems(prevItems);

    // 合計金額の算出
    let totalAmountTemp = 0;
    prevItems.forEach((item) => {
      totalAmountTemp += item.amount;
    });
    setTotalAmount(totalAmountTemp);
  };

  return {
    // State
    toggleState,
    setToggleState,
    totalAmount,
    setTotalAmount,
    date,
    category,
    majorItem,
    minorItems,
    setMinorItems,
    minorItemCount,
    // Function
    handleDateChange,
    handleCategoryChange,
    handleMajorItemChange,
    handleMinorItemsChange,
  };
}

export default useInputPage;
