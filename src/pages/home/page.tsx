import { useState } from 'react';

import Footer from '@/components/Footer';
import Header2 from '@/components/Header2';
import MuiProgress from '@/components/MUIcomponents/MuiProgress';
import MuiSnackbar from '@/components/MUIcomponents/MuiSnackbar';
import useFetchPayment from '@/hooks/useFetchPayment';
import useFetchWalletPage from '@/hooks/useFetchWalletPage';
import useHomeScreen from '@/hooks/useHomeScreen';
import { Calendar, Input, Payments, Wallet } from '@/pages/home/components';

export default function Page() {
  const [actionFlag, setActionFlag] = useState<boolean>(false);
  const [pageState, setPageState] = useState<PageState>({ state: 'Input' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [barInfo, setBarInfo] = useState<BarInfo>({
    open: false,
    severity: 'success',
    message: '',
  });

  const { year, setYear, month, setMonth, handlePreviousMonth, handleNextMonth } = useHomeScreen();
  const { walletPageDisplayInfo } = useFetchWalletPage({ actionFlag, year, month, setIsLoading });
  const { fetchDataState } = useFetchPayment({ actionFlag, year, month, setIsLoading });

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
      {pageState.state === 'Input' && (
        <Input
          actionFlag={actionFlag}
          setActionFlag={setActionFlag}
          setIsLoading={setIsLoading}
          setBarInfo={setBarInfo}
        />
      )}
      {pageState.state === 'Wallet' && (
        <Wallet
          walletPageDisplayInfo={walletPageDisplayInfo}
          year={year}
          month={month}
          fetchDataState={fetchDataState}
        />
      )}
      {pageState.state === 'Calendar' && (
        <Calendar year={year} month={month} fetchDataState={fetchDataState} />
      )}
      {pageState.state === 'Payments' && (
        <Payments
          year={year}
          month={month}
          fetchDataState={fetchDataState}
          setIsLoading={setIsLoading}
          actionFlag={actionFlag}
          setActionFlag={setActionFlag}
          setBarInfo={setBarInfo}
        />
      )}

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
