import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

function MuiTextFieldDate() {
  return (
    <ThemeProvider theme={theme}>
      <TextField type='date' variant='standard' fullWidth style={{ paddingTop: '16px' }} />
    </ThemeProvider>
  );
}

export default MuiTextFieldDate;
