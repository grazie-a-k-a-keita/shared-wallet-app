import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Graph() {
  const [toggleState, setToggleState] = useState(true);
  return (
    <>
      <header>
        <Header
          leftButtonName='xxx'
          rightButtonName='yyy'
          setToggleStatus={setToggleState}
          headerType='Default'
        />
      </header>
      <main>{toggleState ? <p>xxx</p> : <p>yyy</p>}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Graph;
