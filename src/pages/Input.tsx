import Footer from '../components/Footer';
import Header from '../components/Header';
import AddCircleOutlineButton from '../components/MUIcomponents/AddCircleOutlineButton';
import MuiButton from '../components/MUIcomponents/MuiButton';
import MuiCard from '../components/MUIcomponents/MuiCard';
import MuiTextField from '../components/MUIcomponents/MuiTextField';
import MuiTextFieldDate from '../components/MUIcomponents/MuiTextFieldDate';
import useInputPage from '../hooks/useInputPage';

import classes from './Input.module.scss';

function Input() {
  const {
    toggleState,
    setToggleState,
    totalAmount,
    date,
    setDate,
    category,
    setCategory,
    majorItem,
    setMajorItem,
    minorItems,
    setMinorItems,
    minorItemCount,
    scrollBottomRef,
    handleAddCard,
    handleDeleteCard,
    saveButtonClick,
  } = useInputPage();

  /**
   * カードを生成する関数
   */
  const renderMinorItemCards = () => {
    const cards = [];
    for (let i = 1; i <= minorItemCount; i += 1) {
      cards.push(
        <MuiCard
          key={i}
          itemNumber={i}
          deleteButtonClick={handleDeleteCard}
          minorItems={minorItems}
          setMinorItems={setMinorItems}
        />
      );
    }
    return cards;
  };

  return (
    <>
      <header>
        <Header leftButtonName='支出' rightButtonName='収入' setToggleStatus={setToggleState} />
        {toggleState ? (
          <div className={classes.topBarContainer}>
            <div className={classes.topBarArea}>
              <p className={classes.totalAmount}>{`￥ ${totalAmount.toLocaleString()}`}</p>
              <div className={classes.topBarButton}>
                <MuiButton buttonName='保存' onclick={saveButtonClick} />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </header>
      <main>
        {toggleState ? (
          <>
            <div className={classes.textFieldContainer}>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>日付</p>
                <div className={classes.textField}>
                  <MuiTextFieldDate state={date} setState={setDate} />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>カテゴリ</p>
                <div className={classes.textField}>
                  <MuiTextField
                    label='category'
                    type='text'
                    select
                    state={category}
                    setStateString={setCategory}
                  />
                </div>
              </div>
              <div className={classes.textFieldArea}>
                <p className={classes.textFieldLabel}>大項目</p>
                <div className={classes.textField}>
                  <MuiTextField
                    label='majorItem'
                    type='text'
                    state={majorItem}
                    setStateString={setMajorItem}
                  />
                </div>
              </div>
            </div>
            <div className={classes.cardContainer}>
              {renderMinorItemCards()}
              <div ref={scrollBottomRef} style={{ height: '0px' }} />
            </div>
            <AddCircleOutlineButton addButtonClick={handleAddCard} />
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
