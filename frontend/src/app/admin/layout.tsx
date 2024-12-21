import { PropsWithChildren } from 'react';
import { getUserProfile } from '@/modules/auth/server';
import { unauthorized } from 'next/navigation';
import { getQueryClient } from '@/modules/core/httpclient/shared';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { AdminLayout } from '@/modules/admin/client/AdminLayout';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const userProfile = await getUserProfile();

  if (!userProfile) {
    return unauthorized();
  }

  queryClient.setQueryData(['userProfile'], userProfile);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminLayout>{children}</AdminLayout>
    </HydrationBoundary>
  );
}
