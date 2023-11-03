import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';

import type { ToggleButtonProps } from '../../types/MUItypes/props';

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

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        color='yellow'
        exclusive
        fullWidth
        onChange={handleChange}
        size='small'
        value={alignment}
        aria-label='Platform'
      >
        <ToggleButton value='left'>{leftButtonName}</ToggleButton>
        <ToggleButton value='right'>{rightButtonName}</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default MuiToggleButton;
