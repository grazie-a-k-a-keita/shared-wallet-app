import { Grid, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

function MuiTextFieldDate() {
  return (
    <ThemeProvider theme={theme}>
      <Grid style={{ paddingTop: '12px' }} />
      <Typography fontSize='10.5px' lineHeight='20px' color='#00000099'>
        日付
      </Typography>
      <TextField
        type='date'
        variant='standard'
        inputProps={{ style: { textAlign: 'left' } }}
        fullWidth
      />
    </ThemeProvider>
  );
}

export default MuiTextFieldDate;
