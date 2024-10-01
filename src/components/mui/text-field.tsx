import React from 'react';

import { TextField as MuiTextField, ThemeProvider } from '@mui/material';

import type { TextFieldProps } from '@mui/material/TextField';

import theme from '@/configs/textFieldTheme';

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <ThemeProvider theme={theme}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <MuiTextField variant='standard' fullWidth inputRef={ref} {...props} />
  </ThemeProvider>
));

TextField.displayName = 'TextField';

export default TextField;
