import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../configs/theme';

import type { DeleteButtonProps } from '../../types/props';

function DeleteButton(props: DeleteButtonProps) {
  const { itemNumber, deleteButtonClick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' spacing={1}>
        <IconButton
          size='small'
          color='red'
          aria-label='delete Card'
          onClick={() => deleteButtonClick(itemNumber)}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Stack>
    </ThemeProvider>
  );
}

export default DeleteButton;
