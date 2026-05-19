<template>
  <div>
    <h1 class="text-lg text-gray-700 font-medium mb-4">Data Kelas</h1>

    <KelasTable />
  </div>
</template>

<script setup>
import KelasTable from "@/components/admin/KelasTable.vue";
</script>

<!-- <template>
  <div>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-lg text-gray-700 font-medium">Kelas</h1>
        <p class="text-sm text-gray-500">
          Kelola data kelas berdasarkan tahun ajaran, jenjang, dan kelompok.
        </p>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div class="p-4 border-b flex items-center justify-end gap-3">
        <button
          @click="openCreate"
          class="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm"
        >
          Tambah Kelas
        </button>

        <input
          v-model="search"
          type="text"
          placeholder="Cari kelas..."
          class="w-full md:w-[280px] border rounded-lg px-3 py-2 text-sm"
        />

        <select
          v-model="tahunFilter"
          class="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Semua tahun ajaran</option>
          <option
            v-for="tahun in tahunOptions"
            :key="tahun.id"
            :value="tahun.id"
          >
            {{ tahun.label }}
          </option>
        </select>
      </div>

      <div v-if="loading" class="p-6 text-sm text-gray-500">Memuat data...</div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-600">No</th>
              <th class="px-4 py-3 text-left font-medium text-gray-600">
                Nama
              </th>
              <th class="px-4 py-3 text-left font-medium text-gray-600">
                Jenjang
              </th>
              <th class="px-4 py-3 text-left font-medium text-gray-600">
                Kelompok
              </th>
              <th class="px-4 py-3 text-left font-medium text-gray-600">
                Kapasitas
              </th>
              <th class="px-4 py-3 text-left font-medium text-gray-600">
                Tahun Ajaran
              </th>
              <th class="px-4 py-3 text-right font-medium text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(kelas, index) in filteredKelas"
              :key="kelas.id"
              class="border-b last:border-b-0"
            >
              <td class="px-4 py-3 text-gray-600">{{ index + 1 }}</td>
              <td class="px-4 py-3 font-medium text-gray-700">
                {{ kelas.nama }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ kelas.jenjang?.toUpperCase() }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ kelas.kelompok ? kelas.kelompok.toUpperCase() : "-" }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ kelas.kapasitas || "-" }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ kelas.tahun_ajaran?.label || "-" }}
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <button
                    @click="openEdit(kelas)"
                    class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-blue-600 text-xs"
                  >
                    <SquarePen class="w-4 h-4" />
                  </button>

                  <button
                    @click="handleDelete(kelas.id)"
                    class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-red-600 text-xs"
                  >
                    <Trash class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredKelas.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                Data kelas tidak ditemukan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-lg p-5">
        <h2 class="text-base font-medium text-gray-700 mb-4">
          {{ isEdit ? "Edit Kelas" : "Tambah Kelas" }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-600">Tahun Ajaran</label>

            <select
              v-model.number="form.tahun_ajaran_id"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Pilih tahun ajaran</option>

              <option
                v-for="tahun in tahunOptions"
                :key="tahun.id"
                :value="tahun.id"
              >
                {{ tahun.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-600">Nama Kelas</label>
            <input
              v-model="form.nama"
              type="text"
              placeholder="Contoh: KB, TK A, TK B"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600">Nama Kelompok</label>
            <input
              v-model="form.nama_kelompok"
              type="text"
              placeholder="Contoh: Ayyub"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600">Jenjang</label>
            <select
              v-model="form.jenjang"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Pilih jenjang</option>
              <option value="kb">KB</option>
              <option value="tk">TK</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-600">Kelompok</label>
            <select
              v-model="form.kelompok"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              :disabled="form.jenjang === 'kb'"
            >
              <option :value="null">Tidak ada</option>
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-600">Kapasitas</label>
            <input
              v-model="form.kapasitas"
              type="number"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 rounded-lg border text-sm"
          >
            Batal
          </button>

          <button
            @click="handleSubmit"
            :disabled="saving"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-50"
          >
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import { SquarePen, Trash } from "lucide-vue-next";

import {
  getAllKelas,
  createKelas,
  updateKelas,
  deleteKelas,
} from "@/lib/services/kelasService";

const kelasList = ref([]);
const loading = ref(false);
const saving = ref(false);

const search = ref("");
const tahunFilter = ref("");

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  tahun_ajaran_id: null,
  nama: "",
  jenjang: "",
  kelompok: null,
  kapasitas: null,
  nama_kelompok: "",
});

const tahunOptions = computed(() => {
  const map = new Map();

  kelasList.value.forEach((kelas) => {
    if (kelas.tahun_ajaran) {
      map.set(kelas.tahun_ajaran.id, kelas.tahun_ajaran);
    }
  });

  return Array.from(map.values());
});

const filteredKelas = computed(() => {
  return kelasList.value.filter((kelas) => {
    const keyword = search.value.toLowerCase();

    const matchSearch =
      kelas.nama?.toLowerCase().includes(keyword) ||
      kelas.jenjang?.toLowerCase().includes(keyword) ||
      kelas.tahun_ajaran?.label?.toLowerCase().includes(keyword);

    const matchTahun =
      !tahunFilter.value || kelas.tahun_ajaran_id === Number(tahunFilter.value);

    return matchSearch && matchTahun;
  });
});

const resetForm = () => {
  form.tahun_ajaran_id = null;
  form.nama = "";
  form.jenjang = "";
  form.kelompok = null;
  form.kapasitas = null;
  form.nama_kelompok = "";
};

const loadKelas = async () => {
  try {
    loading.value = true;

    const res = await getAllKelas();
    kelasList.value = res.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data kelas");
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  resetForm();
  selectedId.value = null;
  isEdit.value = false;
  showModal.value = true;
};

const openEdit = (kelas) => {
  selectedId.value = kelas.id;
  isEdit.value = true;

  form.tahun_ajaran_id = kelas.tahun_ajaran_id;
  form.nama = kelas.nama;
  form.jenjang = kelas.jenjang;
  form.kelompok = kelas.kelompok || null;
  form.kapasitas = kelas.kapasitas || null;
  form.nama_kelompok = kelas.nama_kelompok || "";

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  if (!form.tahun_ajaran_id) {
    showWarning("Tahun ajaran wajib diisi");
    return false;
  }

  if (!form.nama) {
    showWarning("Nama kelas wajib diisi");
    return false;
  }

  if (!form.nama_kelompok) {
    showWarning("Nama kelompok wajib diisi");
    return false;
  }

  if (!form.jenjang) {
    showWarning("Jenjang wajib dipilih");
    return false;
  }

  if (form.jenjang === "tk" && !form.kelompok) {
    showWarning("Kelompok wajib dipilih untuk jenjang TK");
    return false;
  }

  if (form.kapasitas < 1) {
    showWarning("Kapasitas wajib diisi");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const payload = {
      tahun_ajaran_id: form.tahun_ajaran_id,
      nama: form.nama,
      jenjang: form.jenjang,
      kelompok: form.jenjang === "kb" ? null : form.kelompok,
      kapasitas: form.kapasitas,
      nama_kelompok: form.nama_kelompok,
    };

    if (isEdit.value) {
      await updateKelas(selectedId.value, payload);
      showSuccess("Kelas berhasil diupdate");
    } else {
      await createKelas(payload);
      showSuccess("Kelas berhasil dibuat");
    }

    closeModal();
    await loadKelas();
  } catch (err) {
    showError(err.message || "Gagal menyimpan kelas");
  } finally {
    saving.value = false;
  }
};

const handleDelete = async (id) => {
  try {
    await deleteKelas(id);
    showSuccess("Kelas berhasil dihapus");
    await loadKelas();
  } catch (err) {
    showError(err.message || "Gagal menghapus kelas");
  }
};

watch(
  () => form.jenjang,
  (value) => {
    if (value === "kb") {
      form.kelompok = null;
    }
  },
);

onMounted(() => {
  loadKelas();
});
</script> -->
