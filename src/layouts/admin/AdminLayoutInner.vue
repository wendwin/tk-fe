<template>
  <div class="min-h-screen xl:flex dark:bg-gray-900 dark:border-gray-800">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <app-header />
      <div class="p-4 mx-auto max-w-(--breakpoint-2xl) md:px-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/sidebar/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import Backdrop from "@/layouts/admin/Backdrop.vue";
import { useSidebar } from "@/composables/useSidebar";

const { isExpanded, isHovered } = useSidebar();
</script>
