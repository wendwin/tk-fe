<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="8">
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <button
              @click="openCreate"
              class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 text-sm"
            >
              Tambah
            </button>

            <div class="relative">
              <button class="absolute -translate-y-1/2 left-4 top-1/2">
                <Search class="w-4 h-4 text-gray-400" />
              </button>

              <input
                v-model="search"
                type="text"
                placeholder="Search"
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </div>

            <div class="relative">
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
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Jenjang</th>
          <th class="px-6 py-3">Kelompok</th>
          <th class="px-6 py-3">Kapasitas</th>
          <th class="px-6 py-3">Guru</th>
          <th class="px-6 py-3">Tahun Ajaran</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="(item, index) in paginatedList"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </td>

          <td class="px-6 py-4">
            {{ startNumber + index }}
          </td>

          <td class="px-6 py-4">
            {{ item.nama }}
          </td>

          <td class="px-6 py-4 uppercase">
            {{ item.jenjang }}
          </td>

          <td class="px-6 py-4">
            {{
              item.kelompok
                ? `${item.kelompok.toUpperCase()}${
                    item.nama_kelompok ? ` (${item.nama_kelompok})` : ""
                  }`
                : "-"
            }}
          </td>

          <td class="px-6 py-4">
            {{ item.kapasitas || "-" }}
          </td>

          <td class="px-6 py-4">
            {{ item.total_guru || "-" }}
          </td>

          <td class="px-6 py-4">
            {{ item.tahun_ajaran?.label || "-" }}
          </td>

          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="openEdit(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-amber-600 text-xs"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <router-link
                :to="{ name: 'AdminKelasDetail', params: { id: item.id } }"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-blue-600 text-xs"
              >
                <Eye class="w-4 h-4" />
              </router-link>

              <button
                @click="handleDelete(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-red-600 text-xs"
              >
                <Trash class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </template>

      <template #pagination>
        <TablePagination :meta="meta" @change="changePage" />
      </template>
    </BaseTable>

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
              v-model.number="form.kapasitas"
              type="number"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
          >
            Batal
          </button>

          <button
            @click="handleSubmit"
            :disabled="saving"
            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:opacity-50 text-sm"
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
import {
  Search,
  Filter,
  Download,
  SquarePen,
  Trash,
  Eye,
} from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";

import {
  getAllKelas,
  createKelas,
  updateKelas,
  deleteKelas,
} from "@/lib/services/kelasService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";

const tahunAjaranList = ref([]);

const list = ref([]);
const loading = ref(false);
const saving = ref(false);

const search = ref("");
const openFilter = ref(false);
const tahunFilter = ref("");
const jenjangFilter = ref("");

const currentPage = ref(1);
const perPage = ref(10);

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  tahun_ajaran_id: null,
  nama: "",
  jenjang: "",
  kelompok: null,
  kapasitas: 15,
});

const loadTahunAjaran = async () => {
  try {
    const res = await getAllTahunAjaran();
    tahunAjaranList.value = res.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data tahun ajaran");
  }
};

const tahunOptions = computed(() => tahunAjaranList.value);

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const keyword = search.value.toLowerCase();

    const matchSearch =
      item.nama?.toLowerCase().includes(keyword) ||
      item.jenjang?.toLowerCase().includes(keyword) ||
      item.tahun_ajaran?.label?.toLowerCase().includes(keyword);

    const matchTahun =
      !tahunFilter.value || item.tahun_ajaran_id === Number(tahunFilter.value);

    const matchJenjang =
      !jenjangFilter.value || item.jenjang === jenjangFilter.value;

    return matchSearch && matchTahun && matchJenjang;
  });
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredList.value.slice(start, start + perPage.value);
});

const meta = computed(() => {
  const total = filteredList.value.length;

  return {
    current_page: currentPage.value,
    last_page: Math.ceil(total / perPage.value) || 1,
    per_page: perPage.value,
    total,
  };
});

const startNumber = computed(() => {
  return (currentPage.value - 1) * perPage.value + 1;
});

const changePage = (page) => {
  currentPage.value = page;
};

const resetFilter = () => {
  tahunFilter.value = "";
  jenjangFilter.value = "";
  openFilter.value = false;
};

const resetForm = () => {
  form.tahun_ajaran_id = null;
  form.nama = "";
  form.jenjang = "";
  form.kelompok = null;
  form.kapasitas = 15;
  form.nama_kelompok = "";
};

const loadKelas = async () => {
  try {
    loading.value = true;

    const res = await getAllKelas();
    list.value = res.data || [];
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
  form.kapasitas = kelas.kapasitas || 15;

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

  if (!form.jenjang) {
    showWarning("Jenjang wajib dipilih");
    return false;
  }

  if (form.jenjang === "tk" && !form.kelompok) {
    showWarning("Kelompok wajib dipilih untuk jenjang TK");
    return false;
  }

  if (!form.kapasitas || form.kapasitas < 1) {
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

watch([search, tahunFilter, jenjangFilter], () => {
  currentPage.value = 1;
});

watch(
  () => form.jenjang,
  (value) => {
    if (value === "kb") {
      form.kelompok = null;
    }
  },
);

onMounted(async () => {
  await Promise.all([loadKelas(), loadTahunAjaran()]);
});
</script>
