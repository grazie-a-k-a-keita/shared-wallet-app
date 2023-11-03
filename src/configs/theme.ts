import { createTheme } from '@mui/material/styles';

// Augment the palette to include colors
declare module '@mui/material/styles' {
  interface Palette {
    yellow: Palette['primary'];
    red: Palette['primary'];
  }
  interface PaletteOptions {
    yellow?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
  }
}

// Update the Component's color options to include options
declare module '@mui/material/ToggleButtonGroup' {
  interface ToggleButtonGroupPropsColorOverrides {
    yellow: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true;
  }
}

// eslint-disable-next-line import/no-mutable-exports
let theme = createTheme({
  typography: { fontFamily: ['Noto Sans JP'].join(',') },
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    red: theme.palette.augmentColor({
      color: {
        main: '#83001A',
      },
      name: 'mainRed',
    }),
    yellow: theme.palette.augmentColor({
      color: {
        main: '#E7C200',
      },
      name: 'mainYellow',
    }),
  },
});

export default theme;
