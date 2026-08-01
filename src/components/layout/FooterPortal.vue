<template>
  <footer
    class="text-center text-sm py-4"
    :class="
      variant === 'portal'
        ? 'text-white bg-[#1181B2]'
        : 'text-gray-500 bg-white border-t '
    "
  >
    &copy; {{ new Date().getFullYear() }} Syuhada School Portal | Developed by
    Faisal DN
  </footer>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "portal",
  },
});
</script>

footerportal
