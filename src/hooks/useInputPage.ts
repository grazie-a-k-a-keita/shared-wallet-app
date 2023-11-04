import { useEffect, useRef, useState } from 'react';

type MinorItem = {
  memo: string;
  amount: number;
};

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
  const [minorItems, setMinorItems] = useState<MinorItem[]>([{ memo: '', amount: 0 }]);
  const [minorItemCount, setMinorItemCount] = useState<number>(1);

  const scrollTopRef = useRef<HTMLDivElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  /**
   * 合計金額の算出
   */
  useEffect(() => {
    let tempAmount = 0;
    minorItems.forEach((item) => {
      tempAmount += item.amount;
    });
    setTotalAmount(tempAmount);
  }, [minorItems]);

  /**
   * カードを追加する関数
   */
  const handleAddCard = () => {
    setMinorItemCount((prevCount) => prevCount + 1);
    // minorItemsに初期値オブジェクト追加
    const prevItems = [...minorItems];
    prevItems.push({ memo: '', amount: 0 });
    setMinorItems(prevItems);
    // カード追加時に一番下までスクロール
    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1);
  };

  /**
   * カードを削除する関数
   */
  const handleDeleteCard = (index: number) => {
    const tempCount = minorItemCount - 1;
    setMinorItemCount(tempCount);
    // minorItemsから index - 1 番目のオブジェクト削除
    const prevItems = [...minorItems];
    const tempItems = prevItems.filter((_, i) => i !== index - 1);
    setMinorItems(tempItems);
    // 一度 Card をリセットし、"TextFiled"と"minorItems"を同期させる
    setMinorItemCount(0);
    setMinorItemCount(tempCount);
    // カード削除時に一番上までスクロール
    setTimeout(() => {
      scrollTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1);
  };

  /**
   * 保存ボタンクリック関数
   */
  const saveButtonClick = () => {
    const obj = {
      date,
      category,
      majorItem,
      minorItems,
    };
    console.log(obj);
  };

  return {
    // State
    toggleState,
    setToggleState,
    totalAmount,
    date,
    setDate,
    category,
    setCategory,
    majorItem,
    setMajorItem,
    minorItems,
    setMinorItems,
    minorItemCount,
    // Ref
    scrollTopRef,
    scrollBottomRef,
    // Function
    handleAddCard,
    handleDeleteCard,
    saveButtonClick,
  };
}

export default useInputPage;
