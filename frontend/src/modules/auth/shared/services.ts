import { ApiResponseWithData, http } from '@/modules/core/httpclient/shared';
import { USER_PROFILE_API_ENDPOINT } from '../shared';
import { Options } from 'ky';
import { UserProfile, UserProfileSchema } from './types';
import { parseAsync } from 'valibot';
import { createApiResponseWithDataSchema } from '@/modules/core/httpclient/shared/types';

/**
 * Fetches the user profile from the API
 * This is the base API call function used by both client and server
 *
 * @param options - Optional Ky request options to customize the HTTP request
 * @returns Promise that resolves to the user profile response
 */
export function makeUserProfileRequest(options?: Omit<Options, 'parseJson'>) {
  return http.get<ApiResponseWithData<UserProfile>>(USER_PROFILE_API_ENDPOINT, {
    ...options,
    parseJson(text) {
      const json = JSON.parse(text);

      return parseAsync(
        createApiResponseWithDataSchema(UserProfileSchema),
        json,
      );
    },
  });
}
