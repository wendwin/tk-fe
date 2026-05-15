<template>
  <div class="flex items-center justify-between p-4 flex-wrap gap-3">
    <span class="text-sm text-gray-600">
      Showing
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ meta.from || 0 }}
      </span>
      to
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ meta.to || 0 }}
      </span>
      of
      <span class="font-semibold text-gray-900 dark:text-gray-400">
        {{ meta.total || 0 }}
      </span>
    </span>

    <ul class="flex -space-x-px text-sm">
      <!-- Previous -->
      <li>
        <button
          @click="changePage(meta.current_page - 1)"
          :disabled="meta.current_page <= 1"
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
            page === meta.current_page
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
          @click="changePage(meta.current_page + 1)"
          :disabled="meta.current_page >= meta.last_page"
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

const pages = computed(() => {
  const total = props.meta.last_page || 1;

  return Array.from({ length: total }, (_, i) => i + 1);
});

const changePage = (page) => {
  if (page < 1 || page > props.meta.last_page) return;

  emit("change", page);
};
</script>
