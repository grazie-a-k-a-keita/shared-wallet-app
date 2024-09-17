import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

type TextFieldNumberProps = {
  label: string;
  value: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isValue: boolean;
  errorInfo: { error: boolean; message: string };
};

function MuiTextFieldNumber(props: TextFieldNumberProps) {
  const { label, value, setState, isValue, errorInfo } = props;

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
          error={errorInfo.error}
          helperText={errorInfo.error ? errorInfo.message : ''}
        />
      ) : (
        <TextField
          type='number'
          label={label}
          variant='standard'
          fullWidth
          onChange={handleValueChange}
          error={errorInfo.error}
          helperText={errorInfo.error ? errorInfo.message : ''}
        />
      )}
    </ThemeProvider>
  );
}

export default MuiTextFieldNumber;
