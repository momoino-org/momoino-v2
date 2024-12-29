import { PropsWithChildren, ReactNode } from 'react';
import { QueryProvider } from '@/modules/core/httpclient/client';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Roboto } from 'next/font/google';
import '@/global.css';

const robotoFont = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
});

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactNode> {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={robotoFont.variable}
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
