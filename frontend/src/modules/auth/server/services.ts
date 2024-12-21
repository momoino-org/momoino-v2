'use server';

import { headers } from 'next/headers';
import { makeUserProfileRequest } from '../shared';

/**
 * Fetches the user profile from the server-side
 * This function runs on the server and extracts the authorization token from request headers
 *
 * @returns Promise that resolves to the user profile if authorized, null if no auth token present
 */
export async function getUserProfile() {
  const header = await headers();
  const accessToken = header.get('authorization');

  if (!accessToken) {
    return null;
  }

  const response = await makeUserProfileRequest({
    headers: {
      Authorization: accessToken,
    },
  });

  return response.json();
}
