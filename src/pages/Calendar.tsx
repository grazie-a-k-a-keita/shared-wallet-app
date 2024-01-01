import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Month from '../components/Calendar/Month';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MuiDialog from '../components/MUIcomponents/MuiDialog';

import classes from './Calendar.module.scss';
import classes_input from './Input.module.scss';

import type { MonthlyBalance } from '../types/fetchData';

function Calendar() {
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [dailySummary, setDailySummary] = useState<MonthlyBalance>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(12);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          // json-server
          `http://localhost:3001/daily-summary-${year}-${month}`
          // APIGateway
          // `${import.meta.env.VITE_DAILY_SUMMARY_GET}?month=${month}&year=${year}`
        );
        setDailySummary(response?.data);
      } catch (error) {
        navigate('/error');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [month, navigate, year]);

  return (
    <>
      <header>
        <Header leftButtonName='月' rightButtonName='週' setToggleStatus={setToggleState} />
        {toggleState ? (
          <div className={classes_input.topBarContainer}>
            <div className={classes_input.topBarArea}>
              <p className={classes_input.totalAmount}>
                {`${year} `}
                <span className={classes.span}>年</span> {`${month} `}
                <span className={classes.span}>月</span>
              </p>
              <div className={classes_input.topBarButton}>
                <MuiDialog setYearTop={setYear} setMonthTop={setMonth} />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {toggleState && !isLoading && (
          <Month year={year} month={month} monthlyBalance={dailySummary} />
        )}
        {!toggleState && <p>週</p>}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Calendar;
