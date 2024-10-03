import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/configs/theme';
import { DefaultMainYellow, Size2, Size3, Size4, Size7 } from '@/styles/variables';

type ButtonProps = {
  buttonName: string;
  onclick: () => void;
};

export default function MuiButton(props: ButtonProps) {
  const { buttonName, onclick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        color='red'
        style={{ padding: `${Size2} ${Size4}` }}
        onClick={onclick}
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
      </Button>
    </ThemeProvider>
  );
}
