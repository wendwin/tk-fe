<template>
  <div class="mt-3 space-y-5">
    <h3 class="font-medium text-gray-700 flex items-center gap-2">
      <!-- <FileText class="w-5 h-5" />  -->
      Hasil Asesmen
    </h3>
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
import { FileText } from "lucide-vue-next";
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
