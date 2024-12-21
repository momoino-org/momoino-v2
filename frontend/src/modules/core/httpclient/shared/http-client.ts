import { ORIGIN_URL } from '@/modules/core/config';
import ky from 'ky';

/**
 * Default timeout in milliseconds for HTTP requests.
 * Requests that take longer than this will be aborted.
 */
const HTTP_TIMEOUT = 30_000;

/**
 * HTTP client instance configured with base URL and error handling.
 */
export const http = ky.create({
  prefixUrl: ORIGIN_URL,
  throwHttpErrors: true,
  timeout: HTTP_TIMEOUT,
});
