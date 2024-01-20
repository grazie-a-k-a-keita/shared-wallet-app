import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

type TextFieldProps = {
  label: string;
  value?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  errorInfo: { error: boolean; message: string };
};

function MuiTextField(props: TextFieldProps) {
  const { label, value, setState, errorInfo } = props;

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
        error={errorInfo.error}
        helperText={errorInfo.error ? errorInfo.message : ''}
      />
    </ThemeProvider>
  );
}

MuiTextField.defaultProps = {
  value: '',
};

export default MuiTextField;
