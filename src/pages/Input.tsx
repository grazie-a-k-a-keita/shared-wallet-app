import Footer from '../components/Footer';
import Header from '../components/Header';
import AddCircleOutlineButton from '../components/MUIcomponents/AddCircleOutlineButton';
import MuiCard from '../components/MUIcomponents/MuiCard';
import MuiTextField from '../components/MUIcomponents/MuiTextField';
import MuiTextFieldDate from '../components/MUIcomponents/MuiTextFieldDate';
import useInputPage from '../hooks/useInputPage';

import classes from './Input.module.scss';

function Input() {
  const {
    toggleState,
    setToggleState,
    date,
    setDate,
    category,
    setCategory,
    majorItem,
    setMajorItem,
    minorItems,
    setMinorItems,
    minorItemCount,
    scrollTopRef,
    scrollBottomRef,
    handleAddCard,
    handleDeleteCard,
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
        {toggleState ? (
          <Header
            headerType='Input'
            leftButtonName='支出'
            rightButtonName='補充'
            setToggleStatus={setToggleState}
          />
        ) : (
          <Header
            headerType='Input'
            leftButtonName='支出'
            rightButtonName='補充'
            setToggleStatus={setToggleState}
          />
        )}
      </header>
      <main>
        {toggleState ? (
          <>
            <div ref={scrollTopRef} style={{ height: '0px' }} />
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
