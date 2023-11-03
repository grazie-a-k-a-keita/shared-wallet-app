import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MuiButton from '../components/MUIcomponents/MuiButton';
import MuiTextField from '../components/MUIcomponents/MuiTextField';
import MuiTextFieldDate from '../components/MUIcomponents/MuiTextFieldDate';
import useTextField from '../hooks/useTextField';

import classes from './Input.module.scss';

function Input() {
  const [toggleState, setToggleState] = useState<boolean>(true);

  const {
    date,
    handleDateChange,
    category,
    handleCategoryChange,
    majorItem,
    handleMajorItemChange,
  } = useTextField();

  const totalAmount = '10,000';

  const saveButtonClick = () => {
    console.log('Date: ', date);
    console.log('Category: ', category);
    console.log('MajorItem: ', majorItem);
  };

  return (
    <>
      <header>
        <Header leftButtonName='支出' rightButtonName='収入' setToggleStatus={setToggleState} />
      </header>
      <main>
        {toggleState ? (
          <>
            <div className={classes.padding}>
              <div className={classes.topBarArea}>
                <p className={classes.totalAmount}>{`￥ ${totalAmount}`}</p>
                <div className={classes.topBarButton}>
                  <MuiButton buttonName='保存' onclick={saveButtonClick} />
                </div>
              </div>
            </div>
            <div className={classes.padding}>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>日付</p>
                <div className={classes.textField}>
                  <MuiTextFieldDate onValueChange={handleDateChange} />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>カテゴリ</p>
                <div className={classes.textField}>
                  <MuiTextField label='カテゴリ' onValueChange={handleCategoryChange} />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>大項目</p>
                <div className={classes.textField}>
                  <MuiTextField label='大項目' onValueChange={handleMajorItemChange} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>収入</p>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Input;
