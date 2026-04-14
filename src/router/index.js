import { createRouter, createWebHistory } from "vue-router";
import { checkAuth } from "@/lib/services/authService";

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
    },
  ],
  history: createWebHistory(),
});

export default router;
