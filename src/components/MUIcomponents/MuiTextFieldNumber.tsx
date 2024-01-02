import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldNumberProps } from '../../types/props';

function MuiTextFieldNumber(props: TextFieldNumberProps) {
  const { label, value, setState, isValue } = props;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      {isValue ? (
        <TextField
          type='number'
          label={label}
          value={value || ''}
          variant='standard'
          fullWidth
          onChange={handleValueChange}
        />
      ) : (
        <TextField
          type='number'
          label={label}
          variant='standard'
          fullWidth
          onChange={handleValueChange}
        />
      )}
    </ThemeProvider>
  );
}

export default MuiTextFieldNumber;
