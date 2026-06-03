<template>
  <div class="mt-3 space-y-5">
    <h3 class="font-medium text-gray-700 flex items-center gap-2">
      Hasil Asesmen
    </h3>

    <div v-if="data.length === 0" class="text-sm text-gray-500">
      Belum ada jawaban asesmen.
    </div>

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
