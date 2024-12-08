/**
 * Get an environment variable.
 * @param key - The environment variable key.
 * @returns The environment variable value.
 */
export function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not set`);
  }

  return value;
}

/**
 * The origin URL.
 */
export const ORIGIN_URL = getEnv('ORIGIN_URL');
