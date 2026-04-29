<template>
  <div class="space-y-6">
    <div class="flex justify-end">
      <div
        class="flex gap-2"
        v-if="status !== 'verified' && status !== 'accepted'"
      >
        <button
          @click="$emit('verify')"
          class="text-sm border text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition px-2.5 py-2 rounded-md"
        >
          Verifikasi
        </button>
        <button
          @click="$emit('reject')"
          class="text-sm border text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition"
        >
          Tolak
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="file in dokumen"
        :key="file.file_path"
        class="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
      >
        <!-- preview -->
        <div
          class="relative h-36 bg-gray-400 overflow-hidden flex items-center justify-center"
        >
          <img
            v-if="isImage(file.file_path)"
            :src="file.file_path"
            class="object-cover w-full h-full"
          />
          <div v-else class="flex flex-col items-center gap-2 opacity-40">
            <FileText class="w-10 h-10 text-gray-500" />
            <span
              class="text-xs font-semibold tracking-widest uppercase text-gray-800"
            >
              {{ file.file_path.split(".").pop() }}
            </span>
          </div>

          <!-- <span
            class="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wide bg-black/50 text-white px-2 py-0.5 rounded backdrop-blur-sm"
          >
            {{ file.jenis_dokumen.replaceAll("_", " ") }}
          </span> -->
        </div>

        <!-- footer -->
        <div class="px-3 py-2.5 flex items-center justify-between">
          <p
            class="text-[13px] font-medium text-gray-700 capitalize truncate mr-3"
          >
            {{ file.jenis_dokumen.replaceAll("_", " ") }}
          </p>
          <div class="flex items-center gap-3 shrink-0">
            <button
              @click="openPreview(file)"
              class="flex items-center gap-1.5 text-xs text-blue-500 border border-blue-200 hover:bg-blue-50 px-2.5 py-2 rounded-md transition-colors"
            >
              <Eye class="w-3.5 h-3.5" />
              Preview
            </button>

            <a
              :href="file.file_path"
              target="_blank"
              class="flex items-center text-gray-500 border border-gray-200 hover:bg-gray-100 p-2 rounded-md transition-colors"
            >
              <Download class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- modal preview -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded-xl w-[90%] max-w-3xl">
        <div class="flex justify-between mb-3">
          <p class="font-semibold">Preview Dokumen</p>
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
import { Download, Eye } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps({
  dokumen: Array,
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
