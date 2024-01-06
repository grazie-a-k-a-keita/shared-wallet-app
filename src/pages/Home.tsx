import { useState } from 'react';

import Footer from '../components/Footer';
import MuiProgress from '../components/MUIcomponents/MuiProgress';
import MuiSnackbar from '../components/MUIcomponents/MuiSnackbar';

import Input from './Input';

import type { BarInfo } from '../types/type';

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [barInfo, setBarInfo] = useState<BarInfo>({
    open: false,
    severity: 'success',
    message: '',
  });

  return (
    <>
      <Input setIsLoading={setIsLoading} setBarInfo={setBarInfo} />
      <footer>
        <Footer />
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
