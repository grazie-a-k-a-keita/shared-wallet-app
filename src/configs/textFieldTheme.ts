import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: { fontFamily: ['Noto Sans JP'].join(','), fontWeightBold: 500, fontSize: 12 },
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

export default theme;
