'use client';

import { useUserProfile } from '@/modules/auth/client/hooks';
import { SideMenu } from '@/modules/core/ui/components/SideMenu';
import { Stack, Box, Avatar, Typography } from '@mui/material';
import { IconSmartHome, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';

export function AdminLayout(props: PropsWithChildren) {
  const t = useTranslations('management');
  const userProfileRequest = useUserProfile();

  return (
    <Stack flexDirection="row">
      <SideMenu
        header={
          <Stack flexDirection="row" gap={1.5} mb={2} alignItems="center">
            <Avatar />
            <Box minWidth={0}>
              <Typography noWrap fontWeight={700}>
                {userProfileRequest.data?.data.firstName}{' '}
                {userProfileRequest.data?.data.lastName}
              </Typography>
              <Typography>Manage account</Typography>
            </Box>
          </Stack>
        }
        items={[
          { icon: IconSmartHome, label: t('home'), path: '/admin' },
          { icon: IconUser, label: t('system'), path: '/admin/system' },
        ]}
      />
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        {props.children}
      </Box>
    </Stack>
  );
}
