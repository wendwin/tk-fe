import { ROLES } from "@/lib/constants/roles";

export const redirectByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.GURU:
    case ROLES.KEPSEK:
      return "/dashboard/admin";

    case ROLES.ORTU:
      return "/portal";

    default:
      return "/";
  }
};
