import { MenuItem, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

type TextFieldSelectProps = {
  label: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<number>>;
};

const options = [
  { value: '1', label: '食費' },
  { value: '2', label: '外食費' },
  { value: '3', label: '交通費' },
  { value: '4', label: '日用品' },
  { value: '5', label: '娯楽費' },
  { value: '6', label: '特別費' },
  { value: '7', label: 'その他' },
];

function MuiTextFieldSelect(props: TextFieldSelectProps) {
  const { label, setState, value } = props;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(Number(event.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        select
        label={label}
        value={value}
        variant='standard'
        fullWidth
        onChange={handleValueChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ThemeProvider>
  );
}

export default MuiTextFieldSelect;
