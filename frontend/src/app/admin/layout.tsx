import { PropsWithChildren, ReactNode } from 'react';
import { getUserProfile } from '@/modules/auth/server';
import { unauthorized } from 'next/navigation';
import { getQueryClient } from '@/modules/core/httpclient/shared';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Layout({ children }: PropsWithChildren): Promise<ReactNode> {
  const queryClient = getQueryClient();

  const userProfile = await getUserProfile();

  if (!userProfile) {
    return unauthorized();
  }

  queryClient.setQueryData(['userProfile'], userProfile);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
