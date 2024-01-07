import Header1 from '../../components/Header1';
import MuiIconButton from '../../components/MUIcomponents/MuiIconButton';
import MuiInputCard from '../../components/MUIcomponents/MuiInputCard';
import MuiTextField from '../../components/MUIcomponents/MuiTextField';
import MuiTextFieldDate from '../../components/MUIcomponents/MuiTextFieldDate';
import MuiTextFieldNumber from '../../components/MUIcomponents/MuiTextFieldNumber';
import MuiTextFieldSelect from '../../components/MUIcomponents/MuiTextFieldSelect';
import useInputPage from '../../hooks/useInputPage';

import classes from './Input.module.scss';

import type { InputPageProps } from '../../types/props';

function Input(props: InputPageProps) {
  const {
    toggleState,
    setToggleState,
    totalAmount,
    cardCount,
    spendingDateInfo,
    setSpendingDateInfo,
    spendingCategoryInfo,
    setSpendingCategoryInfo,
    spendingMemoInfo,
    setSpendingMemoInfo,
    cardInfo,
    setCardInfo,
    incomeDateInfo,
    setIncomeDateInfo,
    incomeMemoInfo,
    setIncomeMemoInfo,
    incomeAmountInfo,
    setIncomeAmountInfo,
    spendingError,
    incomeError,
    scrollTopRef,
    scrollBottomRef,
    handleAddCard,
    saveButtonClick,
  } = useInputPage(props);

  // カードを生成する
  const renderCards = () => {
    const cards = [];
    for (let i = 1; i <= cardCount; i += 1) {
      cards.push(
        <div key={i} className={classes.cardContainer}>
          <MuiInputCard
            itemNumber={i}
            refObject={scrollTopRef}
            cardInfo={cardInfo}
            setCardInfo={setCardInfo}
          />
        </div>
      );
    }
    return cards;
  };

  return (
    <>
      <header>
        <Header1
          leftButtonName='支出'
          rightButtonName='補充'
          setToggleStatus={setToggleState}
          amount={toggleState ? totalAmount : incomeAmountInfo}
          onClick={saveButtonClick}
        />
      </header>
      <main>
        <div className={classes.mainContainer}>
          {toggleState ? (
            <>
              <div ref={scrollTopRef} style={{ height: '0px' }} />

              <div className={classes.textFieldContainer}>
                <MuiTextFieldDate value={spendingDateInfo} setState={setSpendingDateInfo} />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextFieldSelect
                  label='カテゴリー'
                  setState={setSpendingCategoryInfo}
                  value={String(spendingCategoryInfo)}
                />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextField
                  label='メモ（店名など）'
                  value={spendingMemoInfo}
                  setState={setSpendingMemoInfo}
                  errorInfo={{
                    error: spendingError.memoErr,
                    message: spendingError.memoMessage,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className={classes.textFieldContainer}>
                <MuiTextFieldDate value={incomeDateInfo} setState={setIncomeDateInfo} />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextField
                  label='メモ（名前など）'
                  value={incomeMemoInfo}
                  setState={setIncomeMemoInfo}
                  errorInfo={{
                    error: incomeError.memoErr,
                    message: incomeError.memoMessage,
                  }}
                />
              </div>
              <div className={classes.textFieldContainer}>
                <MuiTextFieldNumber
                  label='金額'
                  value={incomeAmountInfo}
                  setState={setIncomeAmountInfo}
                  isValue
                  errorInfo={{
                    error: incomeError.amountErr,
                    message: incomeError.amountMessage,
                  }}
                />
              </div>
            </>
          )}
          <div className={toggleState ? '' : classes.hide}>
            <div className={classes.margin8} />
            {renderCards()}
            <div className={classes.addButton}>
              <MuiIconButton iconType='libraryAdd' iconSize={32} onClick={handleAddCard} />
            </div>
          </div>
          <div ref={scrollBottomRef} style={{ height: '0px' }} />
        </div>
      </main>
    </>
  );
}

export default Input;
