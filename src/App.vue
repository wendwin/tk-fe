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
import PortalLayout from "@/layouts/PortalLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const route = useRoute();

// Mapping nama string dari meta router ke komponen layout fisiknya
const layouts = {
  PortalLayout,
  AuthLayout,
};

// Computed property untuk menentukan layout yang aktif.
// Jika di router tidak ada meta layout, default ke AuthLayout.
const currentLayout = computed(() => {
  return layouts[route.meta.layout] || layouts.AuthLayout;
});
</script>

<style lang="scss" scoped></style>
