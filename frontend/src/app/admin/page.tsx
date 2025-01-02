import { auth } from '@/auth';
import { ReactNode } from 'react';

export default async function Home(): Promise<ReactNode> {
  const userProfile = await auth();

  return JSON.stringify(userProfile);
}
