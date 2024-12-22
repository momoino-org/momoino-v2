import { ThemeOptions } from '@mui/material';

export const listComponents: ThemeOptions['components'] = {
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: '8px',
        borderRadius: theme.vars.shape.borderRadius,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 'unset',
      },
    },
  },
};
