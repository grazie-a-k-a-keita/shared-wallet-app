import PieChart from '../../components/ReactChartjs2/PieChart';

import classes from './Wallet.module.scss';

function Wallet() {
  return (
    <main>
      <div className={classes.totalAmount}>
        <p className={classes.titleText_1}>現在のお財布金額</p>
        <p className={classes.amountText_1}>&yen; {Number(10000).toLocaleString()}</p>
      </div>
      <div className={classes.totalPayments}>
        <div className={classes.payment}>
          <p className={classes.titleText_2}>支出</p>
          <p className={classes.amountText_2}>&yen; {Number(10000).toLocaleString()}</p>
        </div>
        <div className={classes.centerBorder} />
        <div className={classes.payment}>
          <p className={classes.titleText_2}>補充</p>
          <p className={classes.amountText_2}>&yen; {Number(10000).toLocaleString()}</p>
        </div>
      </div>
      <div>
        <p className={classes.titleText_3}>カテゴリー別の支出</p>
        <PieChart
          graphData={{
            1: 12000,
            2: 2000,
            3: 5000,
            4: 800,
            5: 8000,
            6: 5000,
            7: 1500,
          }}
        />
      </div>
    </main>
  );
}

export default Wallet;
