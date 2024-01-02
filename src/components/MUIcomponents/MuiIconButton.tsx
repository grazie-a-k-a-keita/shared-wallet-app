import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Delete from '../../assets/svg/delete.svg';
import libraryAdd from '../../assets/svg/library_add.svg';
import navigateBefore from '../../assets/svg/navigate_before.svg';
import navigateNext from '../../assets/svg/navigate_next.svg';

import type { IconButtonProps } from '../../types/props';

function MuiIconButton(props: IconButtonProps) {
  const { iconType, iconSize } = props;

  let iconSrc = '';

  switch (iconType) {
    case 'navigateBefore':
      iconSrc = navigateBefore;
      break;
    case 'navigateNext':
      iconSrc = navigateNext;
      break;
    case 'delete':
      iconSrc = Delete;
      break;
    case 'libraryAdd':
      iconSrc = libraryAdd;
      break;
    default:
      break;
  }

  return (
    <IconButton aria-label={iconType}>
      <Box component='img' sx={{ height: iconSize, width: iconSize }} src={iconSrc} />
    </IconButton>
  );
}

export default MuiIconButton;
