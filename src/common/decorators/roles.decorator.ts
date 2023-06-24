import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
/**
 * Decorator to mark the roles required to access the route
 * @param roles Roles required to access the route
 * @example `@Roles('admin', 'manager', 'user')`
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
