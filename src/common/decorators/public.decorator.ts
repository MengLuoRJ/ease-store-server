import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Decorator to mark a route as *public*, \
 * make it accessible without jwt authentication.
 * > SetMetadata(IS_PUBLIC_KEY, true)
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
