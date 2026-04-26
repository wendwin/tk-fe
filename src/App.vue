<template>
  <div>
    <component :is="currentLayout">
      <RouterView />
    </component>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import PortalLayout from "@/layouts/portal/PortalLayout.vue";
import AdminLayout from "@/layouts/admin/AdminLayout.vue";

const route = useRoute();

const layouts = {
  MainLayout,
  AuthLayout,
  PortalLayout,
  AdminLayout,
};

const currentLayout = computed(() => {
  return layouts[route.meta.layout] || layouts.AuthLayout;
});
</script>

<style lang="scss" scoped></style>
