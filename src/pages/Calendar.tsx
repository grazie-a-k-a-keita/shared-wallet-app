import { useEffect, useState } from 'react';

import axios from 'axios';

import Footer from '../components/Footer';
import Header from '../components/Header';

type FetchData = {
  date: string;
  spendingTotal: number;
  incomeTotal: number;
}[];

function Calendar() {
  const [toggleState, setToggleState] = useState(true);
  const [dailySummary, setDailySummary] = useState<FetchData>([]);
  const [errorFlag, setErrorFlag] = useState<boolean>(false);
  const month = 11;
  const year = 2023;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FetchData>(
          `http://localhost:3001/daily-summary?month=${month}&year=${year}`
        );
        setDailySummary(response.data);
      } catch (error) {
        setErrorFlag(!errorFlag);
      }
    };

    fetchData();
  }, [errorFlag]);

  return (
    <>
      <header>
        <Header leftButtonName='月' rightButtonName='週' setToggleStatus={setToggleState} />
      </header>
      <main>
        {toggleState ? (
          <>
            <p>月</p>
            {dailySummary.map((summary) => (
              <div key={summary.date}>
                <p>Data: {summary.date}</p>
                <p>Spending Total: {summary.spendingTotal}</p>
                <p>Income Total: {summary.incomeTotal}</p>
              </div>
            ))}
          </>
        ) : (
          <p>週</p>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Calendar;
