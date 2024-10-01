import classes from './header1.module.scss';

import MuiButton from '@/components//MUIcomponents/MuiButton';
import ToggleButton from '@/components/MUIcomponents/MuiToggleButton';

type Header1Props = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
  onClick: () => void;
};

function Header1(props: Header1Props) {
  const { leftButtonName, rightButtonName, setToggleStatus, amount, onClick } = props;

  return (
    <>
      <div className={classes.toggleButtonContainer}>
        <div className={classes.toggleButtonBackground}>
          <ToggleButton
            leftButtonName={leftButtonName}
            rightButtonName={rightButtonName}
            setToggleStatus={setToggleStatus}
          />
        </div>
      </div>
      <div className={classes.totalAmountContainer}>
        <p className={classes.totalAmount}>&yen; {Number(amount).toLocaleString()}</p>
        <div className={classes.totalAmount_Button}>
          <MuiButton buttonName='保存' onclick={onClick} />
        </div>
      </div>
    </>
  );
}

export default Header1;
