'use client';

import {
  Drawer,
  drawerClasses,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useThemeProps,
} from '@mui/material';
import { Icon } from '@tabler/icons-react';
import { TablerIcon } from '../TablerIcon';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

export interface SideMenuProps {
  width?: number;
  header?: ReactElement;
  items: {
    icon: Icon;
    label: string;
    path: string;
    isActivate?: boolean;
  }[];
}

export function SideMenu(inProps: SideMenuProps) {
  const props = useThemeProps({ props: inProps, name: 'SideMenu' });
  const pathname = usePathname();
  const normalizedProps = {
    ...props,
    width: props.width ?? 250,
    items: props.items ?? [],
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: normalizedProps.width,
        flexShrink: 0,
        [`& .${drawerClasses.paper}`]: {
          width: normalizedProps.width,
          boxSizing: 'border-box',
        },
      }}
    >
      <Paper sx={{ padding: '16px', flexGrow: 1 }} elevation={0}>
        {props.header}
        <List>
          {normalizedProps.items.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                LinkComponent={NextLink}
                href={item.path}
                selected={pathname === item.path}
              >
                <ListItemIcon>
                  <TablerIcon icon={item.icon} title={item.label} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      noWrap: true,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Drawer>
  );
}
