import { ROLES } from "@/lib/constants/roles";

export const redirectByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "/dashboard/admin";
    case ROLES.GURU:
      return "/dashboard/guru";
    case ROLES.KEPSEK:
      return "/dashboard/kepsek";
    case ROLES.ORTU:
      return "/portal";
    default:
      return "/";
  }
};
