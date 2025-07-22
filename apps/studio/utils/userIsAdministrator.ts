import type { CurrentUser } from 'sanity';

/**
 * Checks if the current user is an administrator.
 *
 * @param currentUser - The current user object, excluding the 'role' property.
 * @returns `true` if the current user is an administrator, `false` otherwise, or `null` if the current user is not provided.
 */
export const userIsAdministrator = (currentUser: Omit<CurrentUser, 'role'> | null) => {
  if (!currentUser) {
    return null;
  }

  const roles = currentUser.roles.map(role => role.name);

  return roles.includes('administrator');
};
