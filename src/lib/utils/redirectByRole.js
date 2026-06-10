import { ROLES } from "@/lib/constants/roles";

export const redirectByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.KEPSEK:
      return "/dashboard";

    case ROLES.GURU:
      return "/dashboard/observasi";

    case ROLES.ORTU:
      return "/portal";

    default:
      return "/";
  }
};
