<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main class="">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<style lang="scss" scoped></style>
