import { createRouter, createWebHistory } from "vue-router";

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
      component: () => import("../views/Auth/Login.vue"),
      meta: { layout: "AuthLayout" },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Auth/Register.vue"),
      meta: { layout: "AuthLayout" },
    },
  ],
  history: createWebHistory(),
});

export default router;
