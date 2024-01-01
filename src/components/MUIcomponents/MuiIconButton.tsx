import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import navigateBefore from '../../assets/svg/navigate_before.svg';
import navigateNext from '../../assets/svg/navigate_next.svg';

import type { IconButtonProps } from '../../types/props';

function MuiIconButton(props: IconButtonProps) {
  const { iconType } = props;

  let iconSrc = '';

  switch (iconType) {
    case 'navigateBefore':
      iconSrc = navigateBefore;
      break;
    case 'navigateNext':
      iconSrc = navigateNext;
      break;
    default:
      break;
  }

  return (
    <IconButton aria-label={iconType}>
      <Box component='img' sx={{ height: 32, width: 32 }} src={iconSrc} />
    </IconButton>
  );
}

export default MuiIconButton;
