<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between">
      <h3 class="font-medium text-gray-700 flex items-center gap-2">
        Pembayaran:
        <span class="text-base capitalize">
          {{ status }}
        </span>
      </h3>
      <div class=""></div>
      <div class="flex gap-2" v-if="status !== 'paid'">
        <button
          @click="$emit('verify')"
          class="text-sm border text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition px-2.5 py-2 rounded-md"
        >
          Verifikasi
        </button>
        <button
          @click="$emit('reject')"
          class="text-sm border text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition px-2.5 py-2 rounded-md"
        >
          Tolak
        </button>
      </div>
    </div>

    <div v-if="!pembayaran" class="text-center text-gray-400 text-sm py-10">
      Belum ada bukti pembayaran
    </div>

    <div
      v-else
      class="group border max-w-md border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mx-auto"
    >
      <!-- preview -->
      <div class="relative h-36 bg-gray-100 flex items-center justify-center">
        <img
          v-if="isImage(pembayaran.file_path)"
          :src="pembayaran.file_path"
          class="object-contain w-full h-full"
        />
        <iframe v-else :src="pembayaran.file_path" class="w-full h-full" />
      </div>

      <!-- footer -->
      <div class="px-4 py-3 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-700">Bukti Pembayaran</p>

        <div class="flex gap-2">
          <button
            @click="openPreview(pembayaran)"
            class="text-xs text-blue-500 border border-blue-200 px-2 py-1 rounded-md"
          >
            Preview
          </button>

          <a
            :href="pembayaran.file_path"
            target="_blank"
            class="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-md"
          >
            Download
          </a>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded-xl w-[90%] max-w-3xl">
        <div class="flex justify-between mb-3">
          <p class="font-semibold">Preview Pembayaran</p>
          <button @click="closePreview">✕</button>
        </div>

        <div class="h-[70vh]">
          <img
            v-if="isImage(selectedFile.file_path)"
            :src="selectedFile.file_path"
            class="w-full h-full object-contain"
          />
          <iframe v-else :src="selectedFile.file_path" class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { statusConfig, paymentConfig } from "@/lib/utils/status";
import { Banknote } from "lucide-vue-next";

const props = defineProps({
  pembayaran: Object,
  status: String,
});

const emit = defineEmits(["verify", "reject"]);

const selectedFile = ref(null);
const showPreview = ref(false);

const openPreview = (file) => {
  selectedFile.value = file;
  showPreview.value = true;
};

const closePreview = () => {
  showPreview.value = false;
  selectedFile.value = null;
};

const isImage = (path) => {
  return /\.(jpg|jpeg|png)$/i.test(path);
};
</script>
