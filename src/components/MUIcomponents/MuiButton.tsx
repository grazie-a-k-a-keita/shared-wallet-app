import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';

import type { ButtonProps } from '../../types/MUItypes/props';

function MuiButton(props: ButtonProps) {
  const { buttonName, onclick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' color='red' size='medium' onClick={onclick}>
          <Typography fontSize='0.75rem' paddingRight='0.75rem' paddingLeft='0.75rem'>
            {buttonName}
          </Typography>
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default MuiButton;
