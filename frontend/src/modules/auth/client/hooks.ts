'use client';

import { useQuery } from '@tanstack/react-query';
import { makeUserProfileRequest } from '../shared';

export const useUserProfile = () =>
  useQuery({
    queryKey: ['userProfile'],
    refetchInterval: 30_000, // 30 seconds
    queryFn: async ({ signal }) => {
      const request = await makeUserProfileRequest({ signal });
      return request.json();
    },
  });
