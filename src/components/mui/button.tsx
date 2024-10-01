import { Button as MuiButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import theme from '@/configs/theme';
import { DefaultMainYellow, Size2, Size3, Size4, Size7 } from '@/styles/variables';

interface ButtonProps extends MuiButtonProps {
  buttonName: string;
}

function Button({ buttonName, ...props }: ButtonProps) {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        variant='contained'
        color='red'
        style={{ padding: `${Size2} ${Size4}` }}
        fullWidth
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <Typography
          fontSize={Size3}
          padding={`0 ${Size7}`}
          paddingRight={Size7}
          paddingLeft={Size7}
          style={{ color: `${DefaultMainYellow}` }}
        >
          {buttonName}
        </Typography>
      </MuiButton>
    </ThemeProvider>
  );
}

Button.displayName = 'Button';

export default Button;
