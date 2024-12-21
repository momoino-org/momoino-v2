import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';
import { THIRTY_SECONDS } from '@/modules/core/config';

/**
 * Singleton QueryClient instance for browser environment
 */
let browserQueryClient: QueryClient | undefined;

/**
 * Creates a new QueryClient instance with default configuration
 *
 * @returns Configured QueryClient instance
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: THIRTY_SECONDS,
        throwOnError: true,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

/**
 * Gets or creates a QueryClient instance based on environment
 * @returns {QueryClient} QueryClient instance
 * @description
 * - In server environment: Creates new QueryClient instance for each request
 * - In browser environment: Returns singleton instance or creates new one if not exists
 */
export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
