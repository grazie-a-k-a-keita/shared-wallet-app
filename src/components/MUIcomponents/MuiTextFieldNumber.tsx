import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldNumberProps } from '../../types/props';

function MuiTextFieldNumber(props: TextFieldNumberProps) {
  const { label } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField type='number' label={label} variant='standard' fullWidth />
    </ThemeProvider>
  );
}

export default MuiTextFieldNumber;
