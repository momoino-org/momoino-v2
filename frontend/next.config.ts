import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/modules/core/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
