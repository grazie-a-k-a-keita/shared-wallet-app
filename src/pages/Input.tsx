import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
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
          <div className={classes.textFieldPadding}>
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
            <button type='button' onClick={saveButtonClick}>
              保存
            </button>
          </div>
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
