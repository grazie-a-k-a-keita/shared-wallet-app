import { useState } from 'react';

import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import MuiProgress from '../components/MUIcomponents/MuiProgress';
import MuiSnackbar from '../components/MUIcomponents/MuiSnackbar';
import { getCurrentDay } from '../configs/util';

import Calendar from './homePages/Calendar';
import Input from './homePages/Input';
import Payments from './homePages/Payments';
import Wallet from './homePages/Wallet';

import type { BarInfo, PageState } from '../types/type';

function Home() {
  const [pageState, setPageState] = useState<PageState>({ state: 'Input' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [barInfo, setBarInfo] = useState<BarInfo>({
    open: false,
    severity: 'success',
    message: '',
  });

  const [year, setYear] = useState<number>(Number(getCurrentDay().substring(0, 4)));
  const [month, setMonth] = useState<number>(Number(getCurrentDay().substring(5, 7)));

  const handlePreviousMonth = () => {
    if (month !== 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };

  const handleNextMonth = () => {
    if (month !== 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };

  return (
    <>
      {/* Header */}
      {pageState.state !== 'Input' ? (
        <header>
          <Header2
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            onClick1={handlePreviousMonth}
            onClick2={handleNextMonth}
          />
        </header>
      ) : null}

      {/* Main: InputPageのみヘッダーあり */}
      {pageState.state === 'Input' && <Input setIsLoading={setIsLoading} setBarInfo={setBarInfo} />}
      {pageState.state === 'Wallet' && <Wallet />}
      {pageState.state === 'Calendar' && <Calendar />}
      {pageState.state === 'Payments' && <Payments />}

      {/* Footer */}
      <footer>
        <Footer pageState={pageState} setPageState={setPageState} />
      </footer>

      {/* Common Properties */}
      {isLoading ? <MuiProgress /> : null}
      <MuiSnackbar
        open={barInfo.open}
        severity={barInfo.severity}
        message={barInfo.message}
        setBarInfo={setBarInfo}
      />
    </>
  );
}

export default Home;
