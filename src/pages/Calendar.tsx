import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Calendar() {
  const [toggleState, setToggleState] = useState(true);
  return (
    <>
      <header>
        <Header leftButtonName='月' rightButtonName='週' setToggleStatus={setToggleState} />
      </header>
      <main>{toggleState ? <p>月</p> : <p>週</p>}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Calendar;
