'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { makeUserProfileRequest, UserProfile } from '../shared';
import { THIRTY_SECONDS } from '@/modules/core/config';
import { ApiResponseWithData } from '@/modules/core/httpclient/shared';

export function useUserProfile(): UseQueryResult<ApiResponseWithData<UserProfile>> {
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
