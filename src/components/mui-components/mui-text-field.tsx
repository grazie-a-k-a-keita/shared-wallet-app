import { useState } from 'react';

import { ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '@/configs/text-field-theme';

type TextFieldProps = {
  label: string;
  value?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  errorInfo: { error: boolean; message: string };
};

export default function MuiTextField(props: TextFieldProps) {
  const { label, value, setState, errorInfo } = props;

  const [copyInputValue, setCopyInputValue] = useState<string>(value as string);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCopyInputValue(event.target.value);
    setState(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={label}
        value={copyInputValue}
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
