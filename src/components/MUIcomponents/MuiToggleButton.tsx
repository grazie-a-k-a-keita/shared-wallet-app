import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';
import { Size8 } from '../../styles/variables';

type ToggleButtonProps = {
  leftButtonName: string;
  rightButtonName: string;
  setToggleStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

function MuiToggleButton(props: ToggleButtonProps) {
  const { leftButtonName, rightButtonName, setToggleStatus } = props;

  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    // trueであればToggleButtonの左を選択、falseであればToggleButtonの右を選択
    if (newAlignment === 'left') setToggleStatus(true);
    if (newAlignment === 'right') setToggleStatus(false);
  };

  const customTextStyle = {
    fontSize: '12px',
  };

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        color='yellow'
        style={{ height: Size8 }}
        exclusive // 1つの要素のみ選択可能
        fullWidth
        onChange={handleChange}
        value={alignment}
        aria-label='Platform'
      >
        <ToggleButton value='left' style={customTextStyle}>
          {leftButtonName}
        </ToggleButton>
        <ToggleButton value='right' style={customTextStyle}>
          {rightButtonName}
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default MuiToggleButton;
