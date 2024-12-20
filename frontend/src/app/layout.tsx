import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/modules/core/httpclient/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
