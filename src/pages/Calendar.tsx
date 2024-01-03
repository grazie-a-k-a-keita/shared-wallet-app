import { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MuiProgress from '../components/MUIcomponents/MuiProgress';

function Calendar() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <header>
        <Header headerType='Default' />
      </header>
      <main />
      <footer>
        <Footer />
      </footer>
      {isLoading ? <MuiProgress /> : null}
    </>
  );
}

export default Calendar;
