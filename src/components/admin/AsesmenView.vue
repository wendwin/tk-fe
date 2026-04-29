<template>
  <div class="mt-3 space-y-5">
    <div v-for="item in data" :key="item.id" class="space-y-1">
      <p class="text-sm text-gray-500">
        {{ item.urutan }}. {{ item.pertanyaan }}
      </p>

      <p class="text-sm text-gray-700 font-medium">
        {{ item.jawaban }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
