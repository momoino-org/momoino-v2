'use client';

import { useQuery } from '@tanstack/react-query';
import { makeUserProfileRequest } from '../shared';
import { THIRTY_SECONDS } from '@/modules/core/config';

export function useUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    refetchInterval: THIRTY_SECONDS,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    queryFn: async ({ signal }) => {
      const request = await makeUserProfileRequest({ signal });
      return request.json();
    },
  });
}
