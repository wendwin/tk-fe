<template>
  <span :class="['font-medium capitalize', customClass]">
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    required: true,
  },
});
</script>
