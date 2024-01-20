import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';

type ButtonProps = {
  buttonName: string;
  onclick: () => void;
};

function MuiButton(props: ButtonProps) {
  const { buttonName, onclick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button variant='contained' color='red' style={{ padding: '0.5rem 1rem' }} onClick={onclick}>
        <Typography
          fontSize='0.75rem'
          padding='0 1.75rem'
          paddingRight='1.75rem'
          paddingLeft='1.75rem'
          style={{ color: '#e7c200' }}
        >
          {buttonName}
        </Typography>
      </Button>
    </ThemeProvider>
  );
}

export default MuiButton;
