/**
 * Get an environment variable.
 * @param key - The environment variable key.
 * @param defaultValue - The default value to return if the environment variable is not set.
 * @returns The environment variable value.
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (!value) {
    if (defaultValue) {
      return defaultValue;
    }

    throw new Error(`${key} is not set`);
  }

  return value;
}

/**
 * The origin URL.
 */
export const ORIGIN_URL = getEnv('ORIGIN_URL');
