<template>
  <div class="flex items-center justify-between p-4 flex-wrap gap-3">
    <span class="text-sm text-gray-600">
      Showing
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ from }}
      </span>
      to
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ to }}
      </span>
      of
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ total }}
      </span>
    </span>

    <ul class="flex -space-x-px text-sm">
      <!-- Previous -->
      <li>
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="flex items-center justify-center px-3 h-9 border rounded-s-lg bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
      </li>

      <!-- Number -->
      <li v-for="page in pages" :key="page">
        <button
          @click="changePage(page)"
          :class="[
            'flex items-center justify-center w-9 h-9 border',
            page === currentPage
              ? 'bg-blue-100 text-blue-700'
              : 'bg-white hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </li>

      <!-- Next -->
      <li>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage >= lastPage"
          class="flex items-center justify-center px-3 h-9 border rounded-e-lg bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["change"]);

const currentPage = computed(() => props.meta.page || 1);
const lastPage = computed(() => props.meta.pages || 1);
const perPage = computed(() => props.meta.per_page || 10);
const total = computed(() => props.meta.total || 0);

const from = computed(() => {
  if (total.value === 0) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});

const to = computed(() => {
  return Math.min(currentPage.value * perPage.value, total.value);
});

const pages = computed(() => {
  return Array.from({ length: lastPage.value }, (_, i) => i + 1);
});

const changePage = (page) => {
  if (page < 1 || page > lastPage.value) return;
  emit("change", page);
};
</script>
