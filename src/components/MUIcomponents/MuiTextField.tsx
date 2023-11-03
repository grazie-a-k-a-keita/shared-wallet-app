import { useState } from 'react';

import { InputAdornment, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { TextFieldProps } from '../../types/MUItypes/props';

function MuiTextField(props: TextFieldProps) {
  const { label, type, select, onValueChange } = props;
  const [fieldValue, setFieldValue] = useState<string>('');

  const RobotoFont = createTheme({
    typography: {
      fontFamily: ['Roboto'].join(','),
    },
  });

  const currencies = [
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

  let icon = '';
  if (type === 'number') icon = '$';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFieldValue(value);
    return onValueChange && onValueChange(value);
  };

  return (
    <ThemeProvider theme={RobotoFont}>
      <Box
        sx={{
          width: 240,
          maxWidth: '100%',
          backgroundColor: '#f8f8f8',
          borderRadius: '0.25rem',
        }}
      >
        {select ? (
          <TextField
            select
            label={label}
            id='outlined-size-small'
            size='small'
            fullWidth
            value={fieldValue}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position='start' />,
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            type={type}
            label={label}
            id='outlined-size-small'
            size='small'
            fullWidth
            value={fieldValue}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position='start'>{icon}</InputAdornment>,
            }}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default MuiTextField;
