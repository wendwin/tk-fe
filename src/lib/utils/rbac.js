export const canAccess = (userRole, allowedRoles) => {
  if (!allowedRoles) return true;

  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(userRole);
  }

  return userRole === allowedRoles;
};
