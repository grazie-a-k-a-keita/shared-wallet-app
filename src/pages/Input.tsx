import Footer from '../components/Footer';
import Header from '../components/Header';
import MuiCard from '../components/MUIcomponents/MuiCard';
import MuiIconButton from '../components/MUIcomponents/MuiIconButton';
import MuiTextField from '../components/MUIcomponents/MuiTextField';
import MuiTextFieldDate from '../components/MUIcomponents/MuiTextFieldDate';
import MuiTextFieldNumber from '../components/MUIcomponents/MuiTextFieldNumber';
import MuiTextFieldSelect from '../components/MUIcomponents/MuiTextFieldSelect';
import useInputPage from '../hooks/useInputPage';

import classes from './Input.module.scss';

function Input() {
  const { toggleState, setToggleState, scrollTopRef, scrollBottomRef } = useInputPage();

  /**
   * カードを生成する関数
   */
  const renderMinorItemCards = () => {
    const cards = [];
    for (let i = 1; i <= 3; i += 1) {
      cards.push(
        <div className={classes.cardContainer}>
          <MuiCard itemNumber={i} />
        </div>
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

            <div className={classes.mainContainer}>
              <div className={classes.textFieldContainer}>
                <MuiTextFieldDate />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextFieldSelect label='カテゴリー' />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextField label='メモ（店名など）' />
              </div>

              <div className={classes.margin8} />

              {renderMinorItemCards()}

              <div className={classes.addButton}>
                <MuiIconButton iconType='libraryAdd' iconSize={32} />
              </div>
            </div>

            <div ref={scrollBottomRef} style={{ height: '0px' }} />
          </>
        ) : (
          <div className={classes.mainContainer}>
            <div className={classes.textFieldContainer}>
              <MuiTextFieldDate />
            </div>
            <div className={classes.textFieldContainer}>
              <MuiTextField label='メモ（名前など）' />
            </div>
            <div className={classes.textFieldContainer}>
              <MuiTextFieldNumber label='金額' />
            </div>
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Input;
