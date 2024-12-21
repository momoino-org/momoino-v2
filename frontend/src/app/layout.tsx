import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/modules/core/httpclient/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AppTheme } from '@/modules/core/ui';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { CssBaseline } from '@mui/material';
import { Roboto } from 'next/font/google';

const robotoFont = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={robotoFont.variable}
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <AppTheme>
                <CssBaseline />
                {children}
              </AppTheme>
            </NextIntlClientProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
