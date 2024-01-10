import { useEffect, useState } from 'react';

import PieChart from '../../components/ReactChartjs2/PieChart';

import classes from './Wallet.module.scss';

import type { WalletPageProps } from '../../types/props';
import type { PieChartGraphData } from '../../types/type';

function Wallet(props: WalletPageProps) {
  const { walletPageDisplayInfo, year, month, fetchDataState } = props;

  const [pieChartInfo, setPieChartInfo] = useState<PieChartGraphData>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  useEffect(() => {
    const setObj: PieChartGraphData = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };

    const filterArray = fetchDataState.filter(
      (item) => item.yearMonth === `${year}-${String(month).padStart(2, '0')}`
    );

    filterArray[0]?.monthlyPayments.forEach((item) => {
      switch (item.categoryID) {
        case 1:
          setObj[1] += item.totalAmount;
          break;
        case 2:
          setObj[2] += item.totalAmount;
          break;
        case 3:
          setObj[3] += item.totalAmount;
          break;
        case 4:
          setObj[4] += item.totalAmount;
          break;
        case 5:
          setObj[5] += item.totalAmount;
          break;
        case 6:
          setObj[6] += item.totalAmount;
          break;
        case 7:
          setObj[7] += item.totalAmount;
          break;
        default:
          break;
      }
    });

    setPieChartInfo(setObj);
  }, [year, month, fetchDataState]);

  return (
    <main>
      <div className={classes.totalAmount}>
        <p className={classes.titleText_1}>現在のお財布金額</p>
        <p className={classes.amountText_1}>
          &yen; {walletPageDisplayInfo.totalAssets.toLocaleString()}
        </p>
      </div>
      <div className={classes.totalPayments}>
        <div className={classes.payment}>
          <p className={classes.titleText_2}>支出</p>
          <p className={classes.amountText_2}>
            &yen; {walletPageDisplayInfo.monthSpending.toLocaleString()}
          </p>
        </div>
        <div className={classes.centerBorder} />
        <div className={classes.payment}>
          <p className={classes.titleText_2}>補充</p>
          <p className={classes.amountText_2}>
            &yen; {walletPageDisplayInfo.monthIncome.toLocaleString()}
          </p>
        </div>
      </div>
      <div>
        <p className={classes.titleText_3}>カテゴリー別の支出</p>
        <PieChart graphData={pieChartInfo} />
      </div>
    </main>
  );
}

export default Wallet;
