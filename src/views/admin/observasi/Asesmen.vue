<template>
  <div class="">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg text-gray-700 font-medium mb-4">
          Kelola Pertanyaan Asesmen
        </h1>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Tambah Pertanyaan
      </button>
    </div>

    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left w-20">No.</th>
            <th class="px-4 py-3 text-left">Pertanyaan</th>
            <th class="px-4 py-3 text-center w-28">Status</th>
            <th class="px-4 py-3 text-right w-40">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="3" class="px-4 py-6 text-center text-gray-500">
              Memuat data...
            </td>
          </tr>

          <tr v-else-if="pertanyaanList.length === 0">
            <td colspan="3" class="px-4 py-6 text-center text-gray-500">
              Belum ada pertanyaan.
            </td>
          </tr>

          <tr
            v-for="item in pertanyaanList"
            :key="item.id"
            class="border-t border-gray-100"
          >
            <td class="px-4 py-3">
              {{ item.urutan || "-" }}
            </td>

            <td class="px-4 py-3">
              {{ item.pertanyaan }}
            </td>

            <td class="px-4 py-3 text-center">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="
                  item.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                "
              >
                {{ item.is_active ? "Aktif" : "Nonaktif" }}
              </span>
            </td>

            <td class="px-4 py-3 flex items-center justify-center gap-3">
              <button
                @click="openEditModal(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-amber-600 text-xs hover:bg-gray-50"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                v-if="item.is_active"
                @click="handleNonaktif(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-red-600 text-xs hover:bg-gray-50"
              >
                <EyeOff class="w-4 h-4" />
              </button>

              <button
                v-else
                @click="handleAktif(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-green-600 text-xs hover:bg-gray-50"
              >
                <Eye class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="w-full max-w-lg bg-white rounded-xl p-6">
        <h2 class="text-lg font-semibold mb-4">
          {{ isEdit ? "Edit Pertanyaan" : "Tambah Pertanyaan" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1"> Pertanyaan </label>
            <textarea
              v-model="form.pertanyaan"
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan pertanyaan asesmen"
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium mb-1"> Urutan </label>
            <input
              v-model.number="form.urutan"
              type="number"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 1"
            />
          </div>

          <div class="mb-6" v-if="isEdit">
            <label class="block text-sm font-medium mb-2"> Status </label>

            <select
              v-model="form.is_active"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option :value="true">Aktif</option>
              <option :value="false">Nonaktif</option>
            </select>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm border border-gray-300 rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ submitting ? "Menyimpan..." : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  getPertanyaanAsesmen,
  createPertanyaanAsesmen,
  updatePertanyaanAsesmen,
  nonaktifkanPertanyaanAsesmen,
  aktifkanPertanyaanAsesmen,
} from "@/lib/services/asesmenService";
import { SquarePen, EyeOff, Eye } from "lucide-vue-next";

const pertanyaanList = ref([]);
const loading = ref(false);
const submitting = ref(false);
const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  pertanyaan: "",
  urutan: null,
  is_active: true,
});

const fetchPertanyaan = async () => {
  loading.value = true;

  try {
    const res = await getPertanyaanAsesmen();
    pertanyaanList.value = res.data || [];
  } catch (error) {
    console.error(error);
    alert("Gagal mengambil data pertanyaan");
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.pertanyaan = "";
  form.urutan = null;
  form.is_active = true;
  selectedId.value = null;
};

const getNextUrutan = () => {
  if (pertanyaanList.value.length === 0) return 1;

  const maxUrutan = Math.max(
    ...pertanyaanList.value.map((item) => item.urutan || 0),
  );

  return maxUrutan + 1;
};

const openCreateModal = () => {
  resetForm();
  isEdit.value = false;
  form.urutan = getNextUrutan();
  showModal.value = true;
};

const openEditModal = (item) => {
  isEdit.value = true;
  selectedId.value = item.id;

  form.pertanyaan = item.pertanyaan;
  form.urutan = item.urutan;
  form.is_active = item.is_active;

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const handleNonaktif = async (id) => {
  const confirmed = confirm(
    "Pertanyaan tidak akan tampil pada asesmen baru. Lanjutkan?",
  );

  if (!confirmed) return;

  try {
    await nonaktifkanPertanyaanAsesmen(id);

    fetchPertanyaan();
  } catch (error) {
    console.error(error);
  }
};

const handleAktif = async (id) => {
  try {
    await aktifkanPertanyaanAsesmen(id);

    fetchPertanyaan();
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
  if (!form.pertanyaan) {
    alert("Pertanyaan wajib diisi");
    return;
  }

  submitting.value = true;

  const payload = {
    pertanyaan: form.pertanyaan,
    urutan: form.urutan,
    is_active: form.is_active,
  };

  try {
    if (isEdit.value) {
      await updatePertanyaanAsesmen(selectedId.value, payload);
      alert("Pertanyaan berhasil diupdate");
    } else {
      await createPertanyaanAsesmen(payload);
      alert("Pertanyaan berhasil dibuat");
    }

    closeModal();
    fetchPertanyaan();
  } catch (error) {
    console.error(error);
    alert("Gagal menyimpan pertanyaan");
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async (id) => {
  const confirmDelete = confirm("Yakin ingin menghapus pertanyaan ini?");
  if (!confirmDelete) return;

  try {
    await deletePertanyaanAsesmen(id);
    alert("Pertanyaan berhasil dihapus");
    fetchPertanyaan();
  } catch (error) {
    console.error(error);
    alert("Gagal menghapus pertanyaan");
  }
};

onMounted(() => {
  fetchPertanyaan();
});
</script>
