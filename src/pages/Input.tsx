import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MuiButton from '../components/MUIcomponents/MuiButton';
import MuiCard from '../components/MUIcomponents/MuiCard';
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

  const [minorItemCount] = useState(5);

  const renderMinorItemCards = () => {
    const cards = [];
    for (let i = 1; i <= minorItemCount; i += 1) {
      cards.push(<MuiCard key={i} itemNumber={i} />);
    }
    return cards;
  };

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
            <div className={classes.topBarContainer}>
              <div className={classes.topBarArea}>
                <p className={classes.totalAmount}>{`￥ ${totalAmount}`}</p>
                <div className={classes.topBarButton}>
                  <MuiButton buttonName='保存' onclick={saveButtonClick} />
                </div>
              </div>
            </div>
            <div className={classes.textFieldContainer}>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>日付</p>
                <div className={classes.textField}>
                  <MuiTextFieldDate onValueChange={handleDateChange} />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>カテゴリ</p>
                <div className={classes.textField}>
                  <MuiTextField
                    label='category'
                    type='text'
                    onValueChange={handleCategoryChange}
                    select
                  />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>大項目</p>
                <div className={classes.textField}>
                  <MuiTextField
                    label='majorItem'
                    type='text'
                    onValueChange={handleMajorItemChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>{renderMinorItemCards()}</div>
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
