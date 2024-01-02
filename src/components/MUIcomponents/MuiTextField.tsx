import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldProps } from '../../types/props';

function MuiTextField(props: TextFieldProps) {
  const { label } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField label={label} variant='standard' fullWidth />
    </ThemeProvider>
  );
}

export default MuiTextField;
