import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldProps } from '../../types/props';

function MuiTextField(props: TextFieldProps) {
  const { label, value, setState } = props;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={label}
        value={value}
        variant='standard'
        fullWidth
        onChange={handleValueChange}
      />
    </ThemeProvider>
  );
}

export default MuiTextField;
