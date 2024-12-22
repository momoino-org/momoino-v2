'use client';

import { useUserProfile } from '@/modules/auth/client/hooks';
import { SideMenu } from '@/modules/core/ui/components/SideMenu';
import {
  Stack,
  Box,
  Avatar,
  Typography,
  Button,
  Tooltip,
  styled,
} from '@mui/material';
import { IconSmartHome, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';

const AccountButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(1.5),
  textAlign: 'start',
  alignItems: 'center',
  textTransform: 'none',
  marginBottom: theme.spacing(2),
}));

export function AdminLayout(props: PropsWithChildren) {
  const t = useTranslations('management');
  const { data: userProfile } = useUserProfile();

  return (
    <Stack flexDirection="row">
      <SideMenu
        header={
          <Tooltip
            title={t('yourAccount')}
            arrow
            describeChild
            placement="right"
          >
            <AccountButton color="inherit" fullWidth>
              <Avatar />
              <Stack flexGrow={1} minWidth={0}>
                <Typography noWrap fontWeight={500}>
                  {userProfile?.data.displayName}
                </Typography>
                <Typography noWrap variant="subtitle2" fontWeight={400}>
                  {userProfile?.data.email}
                </Typography>
              </Stack>
            </AccountButton>
          </Tooltip>
        }
        items={[
          { icon: IconSmartHome, label: t('home'), path: '/admin' },
          { icon: IconUser, label: t('system'), path: '/admin/system' },
        ]}
      />
      <Box component="main" sx={{ flexGrow: 1, margin: 2 }}>
        {props.children}
      </Box>
    </Stack>
  );
}
