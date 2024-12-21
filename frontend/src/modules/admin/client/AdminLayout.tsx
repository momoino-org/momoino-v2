'use client';

import { useUserProfile } from '@/modules/auth/client/hooks';
import { SideMenu } from '@/modules/core/ui/components/SideMenu';
import { Stack, Box, Avatar, Typography, Button, Tooltip } from '@mui/material';
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
          <Tooltip
            title="Manage your account"
            arrow
            describeChild
            placement="right"
          >
            <Button
              color="inherit"
              fullWidth
              sx={{
                gap: 1.5,
                textAlign: 'start',
                alignItems: 'center',
                textTransform: 'none',
                marginBottom: 2,
              }}
            >
              <Avatar />
              <Stack flexGrow={1} minWidth={0}>
                <Typography noWrap fontWeight={500}>
                  {userProfileRequest.data?.data.firstName}{' '}
                  {userProfileRequest.data?.data.lastName}
                </Typography>
                <Typography noWrap variant="subtitle2" fontWeight={400}>
                  {userProfileRequest.data?.data.email}
                </Typography>
              </Stack>
            </Button>
          </Tooltip>
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
