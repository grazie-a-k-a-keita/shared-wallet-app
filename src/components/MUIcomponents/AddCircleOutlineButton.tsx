import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';

import type { AddCircleOutlineButtonProps } from '../../types/props';

function AddCircleOutlineButton(props: AddCircleOutlineButtonProps) {
  const { addButtonClick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' spacing={1} justifyContent='center'>
        <IconButton size='large' color='red' aria-label='add Card' onClick={addButtonClick}>
          <AddCircleOutlineIcon fontSize='large' />
        </IconButton>
      </Stack>
    </ThemeProvider>
  );
}

export default AddCircleOutlineButton;
