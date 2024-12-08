'use server';

import { ORIGIN_URL } from '@/modules/config/env';
import { headers } from 'next/headers';

export async function getUserProfile() {
  const header = await headers();
  const accessToken = header.get('authorization');

  console.log({ accessToken });

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${ORIGIN_URL}/api/v1/auth/profile`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return response.json();
}
