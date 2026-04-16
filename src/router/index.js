import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";
import { canAccess } from "@/lib/utils/rbac";
import { redirectByRole } from "@/lib/utils/redirectByRole";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
      meta: { layout: "PortalLayout" },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/auth/Login.vue"),
      meta: { layout: "AuthLayout", guestOnly: true },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/auth/Register.vue"),
      meta: { layout: "AuthLayout", guestOnly: true },
    },
    {
      path: "/pendaftaran",
      name: "Pendaftaran",
      component: () => import("../views/portal/Portal.vue"),
      meta: { requiresAuth: true, role: ["orang_tua"] },
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../views/admin/Admin.vue"),
      meta: { requiresAuth: true, role: ["admin"] },
    },
    {
      path: "/403",
      name: "Forbidden",
      component: () => import("../views/errors/Forbidden.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/errors/NotFound.vue"),
    },
  ],
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isLoaded) {
    await auth.fetchUser();
  }

  // not auth
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  // RBAC
  if (to.meta.role && !canAccess(auth.user?.role, to.meta.role)) {
    return next("/403");
  }

  // guest only
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return next(redirectByRole(auth.user?.role));
  }

  next();
});

export default router;
