<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div class="bg-white rounded-xl w-full max-w-md p-6">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-semibold text-gray-800">Edit Data Siswa</h3>

        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="text-sm text-gray-600 mb-1 block"> NISN </label>

          <input
            v-model="form.nisn"
            type="text"
            class="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600 mb-1 block"> Status Siswa </label>

          <select
            v-model="form.status"
            class="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="aktif">Aktif</option>
            <option value="lulus">Lulus</option>
            <option value="keluar">Keluar</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="$emit('close')"
          class="px-4 py-2 border rounded-lg text-sm"
        >
          Batal
        </button>

        <button
          @click="handleSubmit"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {{ loading ? "Menyimpan..." : "Simpan" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

import { updateSiswa } from "@/lib/services/siswaService";

import { showSuccess, showError } from "@/lib/utils/toast";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  siswa: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "updated"]);

const loading = ref(false);

const form = reactive({
  nisn: "",
  status: "aktif",
});

watch(
  () => props.siswa,
  (val) => {
    form.nisn = val?.siswa?.nisn || "";
    form.status = val?.siswa?.status || "aktif";
  },
  { immediate: true },
);

const handleSubmit = async () => {
  try {
    loading.value = true;

    await updateSiswa(props.siswa.meta.id, {
      nisn: form.nisn,
      status: form.status,
    });

    showSuccess("Data siswa berhasil diupdate");

    emit("updated");
  } catch (err) {
    showError(err.message || "Gagal update siswa");
  } finally {
    loading.value = false;
  }
};
</script>
