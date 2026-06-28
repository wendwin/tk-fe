<template>
  <div class="min-h-screen bg-white">
    <NavbarPortal />
    <main class="">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavbarPortal from "@/components/layout/NavbarPortal.vue";
</script>

<style lang="scss" scoped></style>
