import { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

import classes from './payments.module.scss';

import NotDataIcon from '@/assets/svg/not-data-icon.svg';
import { PaymentDay, PaymentInfo, PaymentWeek } from '@/components/payments';
import { getMonthDetails } from '@/configs/utils';

type PaymentsPageProps = {
  year: number;
  month: number;
  fetchDataState: GetDetail;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  actionFlag: boolean;
  setActionFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
};

export default function Payments(props: PaymentsPageProps) {
  const { year, month, fetchDataState, setIsLoading, actionFlag, setActionFlag, setBarInfo } =
    props;

  const [paymentsInfo, setPaymentsInfo] = useState<PaymentsInfo>([]);

  // 表示するデータの更新を行う
  useEffect(() => {
    const setArray: PaymentsInfo = [];
    const days = getMonthDetails(year, month);

    const filterArray = fetchDataState.filter(
      (item) => item.yearMonth === `${year}-${String(month).padStart(2, '0')}`
    );

    for (let i = 0; i < days.length; i += 1) {
      const setObj: PaymentsInfoItem = {
        id: days[i].id,
        date: days[i].date,
        day: days[i].day,
        dayTotalSpending: 0,
        dayTotalIncome: 0,
        paymentData: [],
      };

      const filterItems = filterArray[0]?.monthlyPayments.filter(
        (item) => Number(item.paymentDate.substring(8, 10)) === days[i].date
      );

      if (filterItems) {
        filterItems.forEach((item) => {
          let loopCount = 0;
          if (item.paymentType) {
            setObj.dayTotalSpending += item.totalAmount;
            item.memos.forEach((item2) => {
              setObj.paymentData.push({
                seqId: item.seqId,
                paymentType: item.paymentType,
                totalAmount: item.totalAmount,
                categoryID: item.categoryID,
                memo: item.memo,
                subMemo: item2.memo,
                subAmount: item2.amount,
                memosOrder: loopCount,
              });

              loopCount += 1;
            });
          } else {
            setObj.dayTotalIncome += item.totalAmount;
            setObj.paymentData.push({
              seqId: item.seqId,
              paymentType: item.paymentType,
              totalAmount: item.totalAmount,
              categoryID: item.categoryID,
              memo: item.memo,
              subMemo: '',
              subAmount: item.totalAmount,
              memosOrder: loopCount,
            });
          }

          loopCount = 0;
        });
      }
      setArray.push(setObj);
    }

    setPaymentsInfo(setArray);
  }, [year, month, fetchDataState]);

  const paymentsDataRender = () => {
    const paymentsDisplay = [];
    let currentWeek = 0;
    let existData = false;

    // 1ヵ月分をループする
    for (let i = 1; i <= paymentsInfo.length; i += 1) {
      if ((i - 1) % 7 === 0) {
        let displayFlag = false;
        currentWeek += 1;

        // 1週間中にデータが存在するかチェックする
        for (let n = i - 1; n < i + 6; n += 1) {
          if (paymentsInfo[n].dayTotalIncome > 0 || paymentsInfo[n].dayTotalSpending > 0) {
            displayFlag = true;
            existData = true;
          }
        }

        // 1週間中でデータが存在する場合のみ表示する
        if (displayFlag) {
          paymentsDisplay.push(<PaymentWeek key={`week-${uuid()}`} currentWeek={currentWeek} />);
        }
      }

      // 日付ごとにデータが存在する場合のみデータを表示する
      if (paymentsInfo[i - 1].dayTotalIncome > 0 || paymentsInfo[i - 1].dayTotalSpending > 0) {
        paymentsDisplay.push(
          <PaymentDay
            key={`day-${uuid()}`}
            date={paymentsInfo[i - 1].date}
            day={paymentsInfo[i - 1].day}
            income={paymentsInfo[i - 1].dayTotalIncome}
            spending={paymentsInfo[i - 1].dayTotalSpending}
          />
        );

        for (let d = 0; d < paymentsInfo[i - 1].paymentData.length; d += 1) {
          paymentsDisplay.push(
            <PaymentInfo
              key={`info-${uuid()}`}
              paymentDate={`${year}-${String(month).padStart(2, '0')}-${String(
                paymentsInfo[i - 1].date
              ).padStart(2, '0')}`}
              seqId={paymentsInfo[i - 1].paymentData[d].seqId}
              memosOrder={paymentsInfo[i - 1].paymentData[d].memosOrder}
              paymentType={paymentsInfo[i - 1].paymentData[d].paymentType}
              categoryID={paymentsInfo[i - 1].paymentData[d].categoryID}
              memo={paymentsInfo[i - 1].paymentData[d].memo}
              subMemo={paymentsInfo[i - 1].paymentData[d].subMemo}
              subAmount={paymentsInfo[i - 1].paymentData[d].subAmount}
              setIsLoading={setIsLoading}
              actionFlag={actionFlag}
              setActionFlag={setActionFlag}
              setBarInfo={setBarInfo}
            />
          );
        }
        paymentsDisplay.push(<div key={`line-${uuid()}`} className={classes.under_line} />);
      }
    }

    // データが1件も存在しない場合
    if (!existData) {
      paymentsDisplay.push(
        <div key='not_data_div' className={classes.not_data_container}>
          <img key='not_data_icon' src={NotDataIcon} alt='' className={classes.icon} />
          <p key='not_data_text' className={classes.message}>
            データがありません
          </p>
        </div>
      );
    }

    return paymentsDisplay;
  };

  return <main>{paymentsDataRender()}</main>;
}
