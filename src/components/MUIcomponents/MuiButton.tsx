import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/MUIconfigs/palette';

import type { ButtonProps } from '../../types/MUItypes/props';

function MuiButton(props: ButtonProps) {
  const { buttonName, onclick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' color='red' size='small' onClick={onclick}>
          {buttonName}
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default MuiButton;
