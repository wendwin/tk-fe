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
      meta: { layout: "MainLayout" },
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
    // {
    //   path: "/pendaftaran",
    //   name: "Pendaftaran",
    //   component: () => import("../views/portal/Portal.vue"),
    //   meta: { layout: "PortalLayout", requiresAuth: true, role: ["orang_tua"] },
    // },
    {
      path: "/portal",
      component: () => import("../views/portal/Portal.vue"),
      meta: {
        requiresAuth: true,
        layout: "PortalLayout",
        role: ["orang_tua"],
      },
      children: [
        {
          path: "",
          name: "HomePortal",
          component: () => import("../views/portal/Home.vue"),
        },
        {
          path: "pendaftaran",
          name: "Pendaftaran",
          component: () => import("../views/pendaftaran/Pendaftaran.vue"),
        },
        // {
        //   path: "pendaftaran/:id",
        //   name: "DetailPendaftaran",
        //   component: () => import("../views/orang-tua/DetailPendaftaran.vue"),
        // },
        // {
        //   path: "monitoring/:id",
        //   name: "MonitoringAnak",
        //   component: () => import("../views/orang-tua/Monitoring.vue"),
        // },
      ],
    },
    {
      path: "/dashboard/admin",
      component: () => import("../views/admin/Admin.vue"),
      meta: { requiresAuth: true, layout: "AdminLayout", role: ["admin"] },
      children: [
        {
          path: "",
          name: "AdminDashboard",
          component: () => import("../views/admin/Dashboard.vue"),
        },
        {
          path: "pendaftar",
          name: "AdminPendaftaran",
          component: () => import("../views/admin/pendaftaran/Index.vue"),
        },
        {
          path: "pendaftar/:id",
          name: "AdminPendaftarDetail",
          component: () => import("../views/admin/pendaftaran/Detail.vue"),
        },
        {
          path: "observasi",
          name: "AdminObservasi",
          component: () => import("../views/admin/observasi/index.vue"),
        },
        {
          path: "observasi",
          name: "AdminObservasiDetail",
          component: () => import("../views/admin/observasi/Detail.vue"),
        },
        // {
        //   path: "siswa",
        //   name: "Siswa",
        //   component: () => import("../views/admin/Siswa.vue"),
        // },
        // {
        //   path: "monitoring",
        //   name: "Monitoring",
        //   component: () => import("../views/admin/Monitoring.vue"),
        // },
        // {
        //   path: "pengumuman",
        //   name: "Pengumuman",
        //   component: () => import("../views/admin/Pengumuman.vue"),
        // },
        // {
        //   path: "laporan",
        //   name: "Laporan",
        //   component: () => import("../views/admin/Laporan.vue"),
        // },
        // {
        //   path: "master",
        //   name: "MasterData",
        //   component: () => import("../views/admin/Master.vue"),
        // },
      ],
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
