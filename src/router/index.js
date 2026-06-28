import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";
import { canAccess } from "@/lib/utils/rbac";
import { redirectByRole } from "@/lib/utils/redirectByRole";
import { ROLES } from "@/lib/constants/roles";
import { getMyGuruKelas } from "@/lib/services/guruKelasService.js";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      meta: { layout: "MainLayout" },
    },
    {
      path: "/spmb/informasi",
      name: "InformasiSPMB",
      component: () => import("../views/SpmbView.vue"),
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
    {
      path: "/verify-email",
      name: "VerifyEmailStatus",
      component: () => import("../views/auth/VerifyEmailStatus.vue"),
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("../views/auth/ForgotPassword.vue"),
      meta: { layout: "AuthLayout", guestOnly: true },
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: () => import("../views/auth/ResetPassword.vue"),
      meta: { layout: "AuthLayout", guestOnly: true },
    },
    // {
    //   path: "/pendaftaran",
    //   name: "Pendaftaran",
    //   component: () => import("../views/portal/Portal.vue"),
    //   meta: { layout: "PortalLayout", requiresAuth: true, role: [ROLES.ORTU] },
    // },
    {
      path: "/portal",
      component: () => import("../views/portal/Portal.vue"),
      meta: {
        requiresAuth: true,
        layout: "PortalLayout",
        role: [ROLES.ORTU],
      },
      children: [
        {
          path: "",
          name: "HomePortal",
          component: () => import("../views/portal/Home.vue"),
          meta: { role: [ROLES.ORTU] },
        },
        {
          path: "pendaftaran",
          name: "Pendaftaran",
          component: () => import("../views/pendaftaran/Pendaftaran.vue"),
          meta: { role: [ROLES.ORTU] },
        },
        {
          path: "monitoring",
          name: "Monitoring",
          component: () => import("../views/monitoring/Monitoring.vue"),
          meta: { role: [ROLES.ORTU] },
        },
        {
          path: "monitoring/:id",
          name: "MonitoringDetail",
          component: () => import("../views/monitoring/Detail.vue"),
          meta: { role: [ROLES.ORTU] },
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
      path: "/dashboard",
      component: () => import("../views/admin/Admin.vue"),
      meta: {
        requiresAuth: true,
        layout: "AdminLayout",
        role: [ROLES.ADMIN, ROLES.KEPSEK],
      },
      children: [
        {
          path: "",
          name: "AdminDashboard",
          component: () => import("../views/admin/Dashboard.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "pendaftar",
          name: "AdminPendaftaran",
          component: () => import("../views/admin/pendaftaran/Pendaftaran.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "pendaftar/:id",
          name: "AdminPendaftarDetail",
          component: () => import("../views/admin/pendaftaran/Detail.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "observasi",
          name: "AdminObservasi",
          component: () => import("../views/admin/observasi/Observasi.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "observasi/:id",
          name: "AdminObservasiDetail",
          component: () => import("../views/admin/observasi/Detail.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "siswa",
          name: "AdminSiswa",
          component: () => import("../views/shared/siswa/Siswa.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "siswa/:id",
          name: "AdminSiswaDetail",
          component: () => import("../views/shared/siswa/Detail.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "pembagian-kelas",
          name: "AdminPembagianKelas",
          component: () => import("../views/admin/PembagianKelas.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "kelas",
          name: "AdminKelas",
          component: () => import("../views/admin/kelas/Kelas.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "kelas-saya",
          name: "GuruKelasSaya",
          component: () => import("../views/admin/kelas/Detail.vue"),
          meta: { role: [ROLES.GURU] },
        },
        {
          path: "kelas/:id",
          name: "AdminKelasDetail",
          component: () => import("../views/admin/kelas/Detail.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "tahun-ajaran",
          name: "AdminTahunAjaran",
          component: () => import("../views/admin/tahunAjaran/TahunAjaran.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "tahun-ajaran/:id",
          name: "AdminTahunAjaranDetail",
          component: () => import("../views/admin/tahunAjaran/Detail.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        // {
        //   path: "gelombang",
        //   name: "AdminGelombang",
        //   component: () => import("../views/admin/gelombang/Gelombang.vue"),
        //   meta: { role: [ROLES.ADMIN] },
        // },
        {
          path: "guru-kelas",
          name: "AdminGuruKelas",
          component: () => import("../views/admin/guruKelas/GuruKelas.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "user",
          name: "AdminUser",
          component: () => import("../views/admin/user/User.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "monitoring",
          name: "AdminMonitoring",
          component: () => import("../views/admin/monitoring/Monitoring.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "monitoring/siswa/create",
          name: "AdminMonitoringSiswaCreate",
          component: () =>
            import("../views/admin/monitoring/siswa/AddMonitoring.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "monitoring/mingguan/:id",
          name: "AdminMonitoringMingguanDetail",
          component: () => import("../views/admin/monitoring/Detail.vue"),
          meta: { role: [ROLES.ADMIN, ROLES.GURU] },
        },
        {
          path: "observasi/asesmen",
          name: "AdminAsesmenObservasi",
          component: () => import("../views/admin/observasi/Asesmen.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "observasi/kpsp",
          name: "AdminKpspObservasi",
          component: () => import("../views/admin/observasi/Kpsp.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "observasi/gpph",
          name: "AdminGpphObservasi",
          component: () => import("../views/admin/observasi/gpph.vue"),
          meta: { role: [ROLES.ADMIN] },
        },
        {
          path: "laporan",
          name: "KepsekLaporan",
          component: () => import("../views/kepsek/Laporan.vue"),
          meta: {
            role: [ROLES.KEPSEK],
          },
        },

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
    // {
    //   path: "/dashboard/guru",
    //   component: () => import("../views/guru/Guru.vue"),
    //   meta: {
    //     requiresAuth: true,
    //     layout: "GuruLayout",
    //     role: ["guru"],
    //   },
    //   children: [
    //     {
    //       path: "siswa",
    //       name: "GuruSiswa",
    //       component: () => import("../views/shared/siswa/Index.vue"),
    //     },
    //     {
    //       path: "siswa/:id",
    //       name: "GuruSiswaDetail",
    //       component: () => import("../views/shared/siswa/Detail.vue"),
    //     },
    //   ],
    // },
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

  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80,
      };
    }

    return {
      top: 0,
    };
  },
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isLoaded) {
    await auth.fetchUser();
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return next(redirectByRole(auth.role));
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  const requiredRoles = to.matched
    .map((record) => record.meta.role)
    .filter(Boolean)
    .flat();

  if (requiredRoles.length && !canAccess(auth.role, requiredRoles)) {
    return next("/403");
  }

  next();
});

export default router;
