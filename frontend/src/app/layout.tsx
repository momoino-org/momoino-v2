import { getUserProfile } from '@/modules/auth/server/profile';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  for (const [key, value] of (await headers()).entries()) {
    console.log({ key, value });
  }

  const userProfile = await getUserProfile();
  console.log({ userProfile });

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
