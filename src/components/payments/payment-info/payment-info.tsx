import { useEffect, useState } from 'react';

import classes from './payment-info.module.scss';

import Cake from '@/assets/category-icon/cake.svg';
import Castle from '@/assets/category-icon/castle.svg';
import CleaningServices from '@/assets/category-icon/cleaning-services.svg';
import FastFood from '@/assets/category-icon/fast-food.svg';
import FoodBank from '@/assets/category-icon/food-bank.svg';
import Savings from '@/assets/category-icon/savings.svg';
import Star from '@/assets/category-icon/star.svg';
import Train from '@/assets/category-icon/train.svg';
import { MuiDialog2 } from '@/components/mui-components';

type PaymentInfoProps = {
  paymentDate: string;
  seqId: number;
  memosOrder: number;
  paymentType: boolean;
  categoryID: number;
  memo: string;
  subMemo: string;
  subAmount: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  actionFlag: boolean;
  setActionFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
};

export default function PaymentsInfo(props: PaymentInfoProps) {
  const {
    paymentDate,
    seqId,
    memosOrder,
    paymentType,
    categoryID,
    memo,
    subMemo,
    subAmount,
    setIsLoading,
    actionFlag,
    setActionFlag,
    setBarInfo,
  } = props;

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryIcon, setCategoryIcon] = useState<string>('');

  // 編集用ダイアログ
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    switch (categoryID) {
      case 0:
        setCategoryName('補充');
        setCategoryIcon(Savings);
        break;
      case 1:
        setCategoryName('食費');
        setCategoryIcon(FastFood);
        break;
      case 2:
        setCategoryName('外食費');
        setCategoryIcon(FoodBank);
        break;
      case 3:
        setCategoryName('交通費');
        setCategoryIcon(Train);
        break;
      case 4:
        setCategoryName('日用品');
        setCategoryIcon(CleaningServices);
        break;
      case 5:
        setCategoryName('娯楽費');
        setCategoryIcon(Castle);
        break;
      case 6:
        setCategoryName('特別日');
        setCategoryIcon(Cake);
        break;
      case 7:
        setCategoryName('その他');
        setCategoryIcon(Star);
        break;
      default:
        break;
    }
  }, [categoryID]);

  const handleDialogOpen = () => setDialogOpen(true);

  return (
    <>
      <div
        className={classes.container}
        onClick={handleDialogOpen}
        onKeyDown={handleDialogOpen}
        role='button'
        tabIndex={-1}
      >
        <div className={classes.container_left}>
          <img src={categoryIcon} alt='' className={classes.category_icon} />
          <p className={classes.category_name}>{categoryName}</p>
          <div className={classes.container_memos}>
            <p className={classes.memo}>{memo}</p>
            <p className={classes.memo}>{subMemo}</p>
          </div>
        </div>
        <div className={classes.container_right}>
          <p className={categoryID !== 0 ? classes.display_none : classes.income}>
            &yen; {subAmount.toLocaleString()}
          </p>
          <p className={categoryID !== 0 ? classes.spending : classes.display_none}>
            &yen; {categoryID === 0 ? '' : subAmount.toLocaleString()}
          </p>
        </div>
      </div>
      <MuiDialog2
        open={dialogOpen}
        setOpen={setDialogOpen}
        paymentDate={paymentDate}
        seqId={seqId}
        memosOrder={memosOrder}
        paymentType={paymentType}
        categoryID={categoryID}
        memo={memo}
        subMemo={subMemo}
        subAmount={subAmount}
        setIsLoading={setIsLoading}
        actionFlag={actionFlag}
        setActionFlag={setActionFlag}
        setBarInfo={setBarInfo}
      />
    </>
  );
}
