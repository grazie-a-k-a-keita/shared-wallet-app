import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Delete from '@/assets/svg/delete.svg';
import libraryAdd from '@/assets/svg/library-add.svg';
import navigateBefore from '@/assets/svg/navigate-before.svg';
import navigateNext from '@/assets/svg/navigate-next.svg';

type IconButtonProps = {
  iconType: 'navigateBefore' | 'navigateNext' | 'delete' | 'libraryAdd';
  iconSize: 24 | 32;
  onClick: () => void;
};

export default function MuiIconButton(props: IconButtonProps) {
  const { iconType, iconSize, onClick } = props;

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
    <IconButton aria-label={iconType} onClick={onClick}>
      <Box component='img' sx={{ height: iconSize, width: iconSize }} src={iconSrc} />
    </IconButton>
  );
}
