<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="cancel"></div>

    <div class="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        {{ title }}
      </h3>

      <p class="text-sm text-gray-500 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end gap-2">
        <button
          @click="cancel"
          class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
        >
          Batal
        </button>

        <button
          @click="confirm"
          class="px-4 py-2 rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-600"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>
