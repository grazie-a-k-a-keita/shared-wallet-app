import { useState } from 'react';

import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { TextFieldProps } from '../../types/MUItypes/props';

function MuiTextField(props: TextFieldProps) {
  const { label, onValueChange } = props;
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFieldValue(value);
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
        label={label}
        id='outlined-size-small'
        size='small'
        fullWidth
        value={fieldValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{'>'}</InputAdornment>,
        }}
      />
    </Box>
  );
}

export default MuiTextField;
