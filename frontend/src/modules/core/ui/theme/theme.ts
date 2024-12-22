import {
  alpha,
  createTheme,
  CssVarsThemeOptions,
  ThemeOptions,
} from '@mui/material';
import { blue, gray, green, orange, red } from './colors';

const defaultTheme = createTheme();

export const shape: ThemeOptions['shape'] = {
  borderRadius: 8,
};

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'var(--font-family)',
  iconSizes: {
    small: defaultTheme.typography.pxToRem(18),
    medium: defaultTheme.typography.pxToRem(26),
    large: defaultTheme.typography.pxToRem(34),
  },
};

export const colorSchemes: CssVarsThemeOptions['colorSchemes'] = {
  light: {
    palette: {
      primary: {
        light: blue[500],
        main: blue[600],
        dark: blue[700],
        contrastText: blue[50],
      },
      info: {
        light: blue[100],
        main: blue[300],
        dark: blue[600],
        contrastText: gray[50],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      grey: gray,
      divider: alpha(gray[300], 0.4),
      background: {
        default: '#ffffff',
        paper: gray[100],
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
      },
      action: {
        selectedOpacity: 0.25,
        // hover: alpha(gray[500], 0.2),
        // selected: `${alpha(gray[200], 0.3)}`,
      },
    },
  },
  // dark: {
  //   palette: {
  //     primary: {
  //       contrastText: brand[50],
  //       light: brand[300],
  //       main: brand[400],
  //       dark: brand[700],
  //     },
  //     info: {
  //       contrastText: brand[300],
  //       light: brand[500],
  //       main: brand[700],
  //       dark: brand[900],
  //     },
  //     warning: {
  //       light: orange[400],
  //       main: orange[500],
  //       dark: orange[700],
  //     },
  //     error: {
  //       light: red[400],
  //       main: red[500],
  //       dark: red[700],
  //     },
  //     success: {
  //       light: green[400],
  //       main: green[500],
  //       dark: green[700],
  //     },
  //     grey: {
  //       ...gray,
  //     },
  //     divider: alpha(gray[700], 0.6),
  //     background: {
  //       default: gray[900],
  //       paper: 'hsl(220, 30%, 7%)',
  //     },
  //     text: {
  //       primary: 'hsl(0, 0%, 100%)',
  //       secondary: gray[400],
  //     },
  //     action: {
  //       hover: alpha(gray[600], 0.2),
  //       selected: alpha(gray[600], 0.3),
  //     },
  //     baseShadow:
  //       'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
  //   },
};
