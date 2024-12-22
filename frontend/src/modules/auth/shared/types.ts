import { SUPPORTED_LOCALES } from '@/modules/core/i18n';
import * as v from 'valibot';

export const UserProfileSchema = v.strictObject({
  id: v.pipe(v.string(), v.uuid()),
  username: v.string(),
  email: v.pipe(v.string(), v.email()),
  emailVerified: v.boolean(),
  firstName: v.string(),
  lastName: v.string(),
  displayName: v.string(),
  locale: v.enum(SUPPORTED_LOCALES),
  accessToken: v.string(),
});

export type UserProfile = v.InferInput<typeof UserProfileSchema>;
