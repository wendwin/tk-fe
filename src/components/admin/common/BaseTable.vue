<template>
  <div
    class="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
  >
    <slot name="toolbar" />

    <table class="w-full text-sm text-left text-gray-600">
      <thead
        class="text-xs uppercase bg-gray-100 text-gray-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-400"
      >
        <slot name="head" />
      </thead>

      <tbody>
        <template v-if="loading">
          <tr
            v-for="i in 5"
            :key="i"
            class="border-b border-gray-100 dark:border-gray-800"
          >
            <td :colspan="colspan" class="px-6 py-4">
              <div
                class="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700"
              ></div>
            </td>
          </tr>
        </template>

        <template v-else-if="isEmpty">
          <tr>
            <td :colspan="colspan" class="text-center py-5 text-gray-500">
              Tidak ada data untuk ditampilkan
            </td>
          </tr>
        </template>

        <slot v-else name="body" />
      </tbody>
    </table>

    <slot name="pagination" />
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  colspan: {
    type: Number,
    default: 1,
  },
});
</script>
