'use client';

import { useUserProfile } from '@/modules/auth/client/hooks';

export default function Home() {
  const { data: userProfile } = useUserProfile();

  return JSON.stringify(userProfile);
}
