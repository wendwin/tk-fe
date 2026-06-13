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
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Label</th>
          <th class="px-6 py-3">Tanggal Mulai</th>
          <th class="px-6 py-3">Tanggal Selesai</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Dibuat</th>
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

          <td class="px-6 py-4 font-medium text-gray-700">
            {{ item.label }}
          </td>

          <td class="px-6 py-4">
            {{ formatDateID(item.tanggal_mulai) }}
          </td>

          <td class="px-6 py-4">
            {{ formatDateID(item.tanggal_selesai) }}
          </td>

          <td class="px-6 py-4">
            <span
              class="px-2 py-1 rounded-full text-sm font-medium"
              :class="item.is_active ? 'text-emerald-600' : ' text-gray-600'"
            >
              {{ item.is_active ? "Aktif" : "Nonaktif" }}
            </span>
          </td>

          <td class="px-6 py-4">
            {{ formatDateID(item.created_at) }}
          </td>

          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                title="Edit"
                @click="openEdit(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-yellow-600 text-xs hover:bg-gray-100"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <router-link
                title="Lihat"
                :to="{
                  name: 'AdminTahunAjaranDetail',
                  params: { id: item.id },
                }"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-blue-600 text-xs hover:bg-gray-100"
              >
                <Eye class="w-4 h-4" />
              </router-link>

              <button
                title="Hapus"
                @click="handleDelete(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-red-600 text-xs hover:bg-gray-100"
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
          {{ isEdit ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran" }}
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm text-gray-600">Tahun Mulai</label>
              <input
                v-model.number="form.tahun_mulai"
                type="number"
                placeholder="2026"
                class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Tahun Selesai</label>
              <input
                v-model.number="form.tahun_selesai"
                type="number"
                placeholder="2027"
                class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-600">Tanggal Mulai</label>

            <div class="relative mt-1">
              <flat-pickr
                v-model="form.tanggal_mulai"
                :config="flatpickrConfig"
                placeholder="Pilih tanggal mulai"
                class="h-10 w-full rounded-lg border border-gray-300 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-300"
              />

              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              >
                <Calendar class="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-600">Tanggal Selesai</label>

            <div class="relative mt-1">
              <flat-pickr
                v-model="form.tanggal_selesai"
                :config="flatpickrConfig"
                placeholder="Pilih tanggal selesai"
                class="h-10 w-full rounded-lg border border-gray-300 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-300"
              />

              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              >
                <Calendar class="w-4 h-4" />
              </span>
            </div>
          </div>

          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input v-model="form.is_active" type="checkbox" class="w-4 h-4" />
            Jadikan tahun ajaran aktif
          </label>
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
import { Search, SquarePen, Trash, Eye, Calendar } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";

import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import {
  getAllTahunAjaran,
  createTahunAjaran,
  updateTahunAjaran,
  deleteTahunAjaran,
} from "@/lib/services/tahunAjaranService";

const list = ref([]);
const loading = ref(false);
const saving = ref(false);

const search = ref("");

const currentPage = ref(1);
const perPage = ref(10);

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  tahun_mulai: null,
  tahun_selesai: null,
  tanggal_mulai: "",
  tanggal_selesai: "",
  is_active: false,
});

const flatpickrConfig = {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "d F Y",
  allowInput: true,
};

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const keyword = search.value.toLowerCase();

    return (
      item.label?.toLowerCase().includes(keyword) ||
      String(item.tahun_mulai).includes(keyword) ||
      String(item.tahun_selesai).includes(keyword)
    );
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

const resetForm = () => {
  form.tahun_mulai = null;
  form.tahun_selesai = null;
  form.tanggal_mulai = "";
  form.tanggal_selesai = "";
  form.is_active = false;
};

const loadTahunAjaran = async () => {
  try {
    loading.value = true;

    const res = await getAllTahunAjaran();
    list.value = res.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data tahun ajaran");
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

const openEdit = (item) => {
  selectedId.value = item.id;
  isEdit.value = true;

  form.tahun_mulai = item.tahun_mulai;
  form.tahun_selesai = item.tahun_selesai;
  form.tanggal_mulai = item.tanggal_mulai;
  form.tanggal_selesai = item.tanggal_selesai;
  form.is_active = item.is_active;

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  if (!form.tahun_mulai) {
    showWarning("Tahun mulai wajib diisi");
    return false;
  }

  if (!form.tahun_selesai) {
    showWarning("Tahun selesai wajib diisi");
    return false;
  }

  if (form.tahun_selesai <= form.tahun_mulai) {
    showWarning("Tahun selesai harus lebih besar dari tahun mulai");
    return false;
  }

  if (!form.tanggal_mulai) {
    showWarning("Tanggal mulai wajib diisi");
    return false;
  }

  if (!form.tanggal_selesai) {
    showWarning("Tanggal selesai wajib diisi");
    return false;
  }

  if (form.tanggal_selesai <= form.tanggal_mulai) {
    showWarning("Tanggal selesai harus lebih besar dari tanggal mulai");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const payload = {
      tahun_mulai: form.tahun_mulai,
      tahun_selesai: form.tahun_selesai,
      tanggal_mulai: form.tanggal_mulai,
      tanggal_selesai: form.tanggal_selesai,
      is_active: form.is_active,
    };

    if (isEdit.value) {
      await updateTahunAjaran(selectedId.value, payload);
      showSuccess("Tahun ajaran berhasil diupdate");
    } else {
      await createTahunAjaran(payload);
      showSuccess("Tahun ajaran berhasil dibuat");
    }

    closeModal();
    await loadTahunAjaran();
  } catch (err) {
    showError(err.message || "Gagal menyimpan tahun ajaran");
  } finally {
    saving.value = false;
  }
};

const handleDelete = async (id) => {
  try {
    await deleteTahunAjaran(id);
    showSuccess("Tahun ajaran berhasil dihapus");
    await loadTahunAjaran();
  } catch (err) {
    showError(err.message || "Gagal menghapus tahun ajaran");
  }
};

const formatDateID = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

watch(search, () => {
  currentPage.value = 1;
});

onMounted(() => {
  loadTahunAjaran();
});
</script>
