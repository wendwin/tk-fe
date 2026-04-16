import { ROLES } from "@/lib/constants/roles";

export const redirectByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "/admin";
    case ROLES.GURU:
      return "/teacher";
    case ROLES.ORTU:
      return "/pendaftaran";
    default:
      return "/";
  }
};
