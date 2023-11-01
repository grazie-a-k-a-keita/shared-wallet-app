import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { TextFieldDateProps } from '../../types/MUItypes/props';

// 現在日付取得
const now: Date = new Date();
const month: string = (now.getMonth() + 1).toString().padStart(2, '0');
const date: string = now.getDate().toString().padStart(2, '0');
const today: string = `${now.getFullYear()}-${month}-${date}`;

function MuiTextFieldDate(props: TextFieldDateProps) {
  const { onValueChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    return onValueChange && onValueChange(value);
  };

  return (
    <Box
      sx={{
        width: 240,
        maxWidth: '100%',
      }}
    >
      <TextField
        type='date'
        label='日付'
        id='outlined-size-small'
        size='small'
        fullWidth
        defaultValue={today}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{'>'}</InputAdornment>,
        }}
      />
    </Box>
  );
}

export default MuiTextFieldDate;
