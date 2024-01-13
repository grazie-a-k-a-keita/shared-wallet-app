import { useEffect, useState } from 'react';

import PaymentDay from '../../components/Payments/PaymentDay';
import PaymentInfo from '../../components/Payments/PaymentInfo';
import PaymentWeek from '../../components/Payments/PaymentWeek';
import { getMonthDetails } from '../../configs/util';

import classes from './Payments.module.scss';

import type { PaymentsPageProps } from '../../types/props';
import type { PaymentsInfo, PaymentsInfoItem } from '../../types/type';

function Payments(props: PaymentsPageProps) {
  const { year, month, fetchDataState } = props;

  const [paymentsInfo, setPaymentsInfo] = useState<PaymentsInfo>([]);

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

    // 1ヵ月分をループする
    for (let i = 1; i <= paymentsInfo.length; i += 1) {
      if ((i - 1) % 7 === 0) {
        let displayFlag = false;
        currentWeek += 1;

        // 1週間中にデータが存在するかチェックする
        for (let n = i - 1; n < i + 6; n += 1) {
          if (paymentsInfo[n].dayTotalIncome > 0 || paymentsInfo[n].dayTotalSpending > 0) {
            displayFlag = true;
          }
        }

        // 1週間中でデータが存在する場合のみ表示する
        if (displayFlag) {
          paymentsDisplay.push(
            <PaymentWeek key={`week-${currentWeek}`} currentWeek={currentWeek} />
          );
        }
      }

      // 日付ごとにデータが存在する場合のみデータを表示する
      if (paymentsInfo[i - 1].dayTotalIncome > 0 || paymentsInfo[i - 1].dayTotalSpending > 0) {
        paymentsDisplay.push(
          <PaymentDay
            key={`day-${paymentsInfo[i - 1].date}-${paymentsInfo[i - 1].day}`}
            date={paymentsInfo[i - 1].date}
            day={paymentsInfo[i - 1].day}
            income={paymentsInfo[i - 1].dayTotalIncome}
            spending={paymentsInfo[i - 1].dayTotalSpending}
          />
        );

        for (let d = 0; d < paymentsInfo[i - 1].paymentData.length; d += 1) {
          paymentsDisplay.push(
            <PaymentInfo
              key={`payment-${paymentsInfo[i - 1].date}-${
                paymentsInfo[i - 1].paymentData[d].memosOrder
              }`}
              categoryID={paymentsInfo[i - 1].paymentData[d].categoryID}
              memo={paymentsInfo[i - 1].paymentData[d].memo}
              subMemo={paymentsInfo[i - 1].paymentData[d].subMemo}
              subAmount={paymentsInfo[i - 1].paymentData[d].subAmount}
            />
          );
        }
        paymentsDisplay.push(<div key={`line-${i - 1}`} className={classes.under_line} />);
      }
    }
    return paymentsDisplay;
  };

  return <main>{paymentsDataRender()}</main>;
}

export default Payments;
