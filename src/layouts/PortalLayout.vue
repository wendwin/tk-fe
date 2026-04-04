<template>
  <div class="min-h-screen bg-white">
    <NavbarPortal />
    <main class="">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavbarPortal from "@/components/NavbarPortal.vue";
</script>

<style lang="scss" scoped></style>
