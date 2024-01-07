import { useState } from 'react';

import Footer from '../components/Footer';
import MuiProgress from '../components/MUIcomponents/MuiProgress';
import MuiSnackbar from '../components/MUIcomponents/MuiSnackbar';

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

  const [year] = useState<string>('2024');
  const [month] = useState<string>('01');

  return (
    <>
      {pageState.state === 'Input' && <Input setIsLoading={setIsLoading} setBarInfo={setBarInfo} />}
      {pageState.state === 'Wallet' && <Wallet year={year} month={month} />}
      {pageState.state === 'Calendar' && <Calendar />}
      {pageState.state === 'Payments' && <Payments />}
      <footer>
        <Footer pageState={pageState} setPageState={setPageState} />
      </footer>
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
