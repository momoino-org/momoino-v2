'use client';

import { useUserProfile } from '@/modules/auth/client/hooks';

export default function SystemPage() {
  const { data: userProfile } = useUserProfile();

  return JSON.stringify(userProfile);
}
