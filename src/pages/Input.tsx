import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Input() {
  const [toggleState, setToggleState] = useState(true);
  return (
    <>
      <header>
        <Header leftButtonName='支出' rightButtonName='収入' setToggleStatus={setToggleState} />
      </header>
      <main>{toggleState ? <p>支出</p> : <p>収入</p>}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Input;
