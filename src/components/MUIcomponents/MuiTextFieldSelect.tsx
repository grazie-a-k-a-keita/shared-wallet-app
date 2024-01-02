import { useState } from 'react';

import { MenuItem, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';

import theme from '../../configs/textFieldTheme';

import type { TextFieldSelectProps } from '../../types/props';

const options = [
  {
    value: 'foodExpenses',
    label: '食費',
  },
  {
    value: 'eatingOutExpenses',
    label: '外食費',
  },
  {
    value: 'TransportationExpenses',
    label: '交通費',
  },
  {
    value: 'dailyNecessities',
    label: '日用品',
  },
  {
    value: 'entertainmentExpenses',
    label: '娯楽費',
  },
  {
    value: 'specialExpenses',
    label: '特別費',
  },
  {
    value: 'other',
    label: 'その他',
  },
];

function MuiTextFieldSelect(props: TextFieldSelectProps) {
  const { label } = props;
  const [state, setState] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        select
        label={label}
        value={state}
        variant='standard'
        fullWidth
        onChange={handleChange}
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
