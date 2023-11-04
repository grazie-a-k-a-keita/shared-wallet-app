import { InputAdornment, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { TextFieldDateProps } from '../../types/props';

// フォント用Theme
const RobotoFont = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
});

function MuiTextFieldDate(props: TextFieldDateProps) {
  const { state, setState } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState(value);
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
        <TextField
          type='date'
          label='date'
          id='outlined-size-small'
          size='small'
          fullWidth
          value={state}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position='start' />,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default MuiTextFieldDate;
