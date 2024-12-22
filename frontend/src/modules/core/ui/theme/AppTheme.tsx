'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { PropsWithChildren, useMemo } from 'react';
import { shape, typography, colorSchemes } from './theme';
import { listComponents } from './customizations/list';
import { iconComponents } from './customizations/icon';

export function AppTheme(props: PropsWithChildren) {
  const customTheme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        colorSchemes,
        shape,
        typography,
        components: {
          ...listComponents,
          ...iconComponents,
        },
      }),
    [],
  );

  return <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>;
}
