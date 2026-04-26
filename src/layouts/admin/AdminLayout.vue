<script setup>
import SidebarProvider from "@/components/providers/SidebarProvider.vue";
import AdminLayoutInner from "@/layouts/admin/AdminLayoutInner.vue";
import ThemeProvider from "@/components/providers/ThemeProvider.vue";
</script>

<template>
  <ThemeProvider>
    <SidebarProvider>
      <AdminLayoutInner>
        <slot />
      </AdminLayoutInner>
    </SidebarProvider>
  </ThemeProvider>
</template>

<style lang="scss" scoped></style>
