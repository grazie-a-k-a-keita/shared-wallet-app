import { Grid, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldDateProps } from '../../types/props';

function MuiTextFieldDate(props: TextFieldDateProps) {
  const { value, setState } = props;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid style={{ paddingTop: '12px' }} />
      <Typography fontSize='10.5px' lineHeight='20px' color='#00000099'>
        日付
      </Typography>
      <TextField
        type='date'
        value={value}
        variant='standard'
        inputProps={{ style: { textAlign: 'left' } }}
        fullWidth
        onChange={handleValueChange}
      />
    </ThemeProvider>
  );
}

export default MuiTextFieldDate;
