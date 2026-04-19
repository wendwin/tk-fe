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
import AuthLayout from "@/layouts/AuthLayout.vue";
import PortalLayout from "./layouts/PortalLayout.vue";

const route = useRoute();

const layouts = {
  MainLayout,
  AuthLayout,
  PortalLayout,
};

const currentLayout = computed(() => {
  return layouts[route.meta.layout] || layouts.AuthLayout;
});
</script>

<style lang="scss" scoped></style>
