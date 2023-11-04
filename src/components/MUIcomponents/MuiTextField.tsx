import { InputAdornment, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { TextFieldProps } from '../../types/props';

// SelectComponent表示用
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

// フォント用Theme
const RobotoFont = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
});

function MuiTextField(props: TextFieldProps) {
  const { label, type, select, state, setStateString, setStateNumber } = props;

  let icon = '';
  if (type === 'number') icon = '$';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (type === 'text' && setStateString) setStateString(value);
    if (type === 'number' && setStateNumber) setStateNumber(Number(value));
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
          // SelectComponent
          <TextField
            select
            label={label}
            id='outlined-size-small'
            size='small'
            fullWidth
            value={state}
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
          // Not SelectComponent
          <TextField
            type={type}
            label={label}
            id='outlined-size-small'
            size='small'
            fullWidth
            value={state}
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
