import classes from './Header.module.scss';
import ToggleButton from './MUIcomponents/MuiToggleButton';

import type { HeaderProps } from '../types/props';

function Header(props: HeaderProps) {
  const { leftButtonName, rightButtonName, setToggleStatus } = props;

  return (
    <div className={classes.container}>
      <div className={classes.toggleBack}>
        <ToggleButton
          leftButtonName={leftButtonName}
          rightButtonName={rightButtonName}
          setToggleStatus={setToggleStatus}
        />
      </div>
    </div>
  );
}

export default Header;
