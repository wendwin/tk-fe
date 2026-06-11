<template>
  <div>
    <BaseTable
      :loading="loading"
      :is-empty="filteredList.length === 0"
      :colspan="4"
    >
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <div class="relative">
              <button class="absolute -translate-y-1/2 left-4 top-1/2">
                <Search class="w-4 h-4 text-gray-400" />
              </button>

              <input
                v-model="search"
                type="text"
                placeholder="Cari pertanyaan..."
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-9 text-sm"
              />

              <button
                v-if="search"
                @click="search = ''"
                type="button"
                class="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <select
              v-model="filterStatus"
              class="h-9 border border-gray-200 text-gray-600 rounded-lg text-sm px-3"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
              <option value="all">Semua</option>
            </select>

            <button
              @click="resetFilter"
              class="h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
            >
              Reset
            </button>

            <button
              @click="openCreateModal"
              class="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Tambah
            </button>
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Pertanyaan</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="item in filteredList"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="px-6 py-4">
            {{ item.urutan }}
          </td>

          <td class="px-6 py-4">
            {{ item.pertanyaan }}
          </td>

          <td class="px-6 py-4">
            <!-- <StatusBadge
              :label="item.is_active ? 'Aktif' : 'Nonaktif'"
              :custom-class="
                item.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
            /> -->

             <span
                class="px-2 py-1 rounded-full text-sm font-medium"
                :class="
                  item.is_active
                    ? 'text-emerald-600' : ' text-gray-600'"
                "
              >
                {{ item.is_active ? "Aktif" : "Nonaktif" }}
              </span>
          </td>

          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="openEditModal(item)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-amber-600 hover:bg-gray-50"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                v-if="item.is_active"
                @click="handleNonaktif(item)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-red-600 hover:bg-gray-50"
              >
                <EyeOff class="w-4 h-4" />
              </button>

              <button
                v-else
                @click="handleAktif(item)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-green-600 hover:bg-gray-50"
              >
                <Eye class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </BaseTable>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="w-full max-w-xl bg-white rounded-xl p-6">
        <h2 class="text-lg font-semibold mb-4">
          {{ isEdit ? "Edit Pertanyaan GPPH" : "Tambah Pertanyaan GPPH" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Urutan</label>
            <input
              v-model.number="form.urutan"
              type="number"
              min="1"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.urutan" class="text-xs text-red-500 mt-1">
              {{ errors.urutan }}
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Pertanyaan</label>
            <textarea
              v-model="form.pertanyaan"
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p v-if="errors.pertanyaan" class="text-xs text-red-500 mt-1">
              {{ errors.pertanyaan }}
            </p>
          </div>

          <div class="mb-6" v-if="isEdit">
            <label class="block text-sm font-medium mb-1">Status</label>
            <select
              v-model="form.is_active"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  <AdminConfirmModal
    :show="confirmModal.show"
    :title="confirmModal.title"
    :message="confirmModal.message"
    :target-name="confirmModal.targetName"
    :confirm-text="confirmModal.confirmText"
    :variant="confirmModal.variant"
    @confirm="handleConfirmModal"
    @cancel="closeConfirmModal"
  />
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { Search, X, SquarePen, EyeOff, Eye } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";
import AdminConfirmModal from "@/components/admin/common/AdminConfirmModal.vue";

import {
  getMasterPertanyaanGpph,
  createMasterPertanyaanGpph,
  updateMasterPertanyaanGpph,
  nonaktifkanMasterPertanyaanGpph,
  aktifkanMasterPertanyaanGpph,
} from "@/lib/services/observasiService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const pertanyaanList = ref([]);
const loading = ref(false);
const submitting = ref(false);

const search = ref("");
const filterStatus = ref("active");

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  urutan: 1,
  pertanyaan: "",
  is_active: true,
});

const errors = reactive({
  urutan: "",
  pertanyaan: "",
});

const confirmModal = reactive({
  show: false,
  title: "",
  message: "",
  targetName: "",
  confirmText: "Konfirmasi",
  variant: "primary",
  action: null,
});

const filteredList = computed(() => {
  let list = pertanyaanList.value;

  if (filterStatus.value === "active") {
    list = list.filter((item) => item.is_active);
  }

  if (filterStatus.value === "inactive") {
    list = list.filter((item) => !item.is_active);
  }

  if (search.value) {
    const keyword = search.value.toLowerCase();

    list = list.filter((item) =>
      item.pertanyaan?.toLowerCase().includes(keyword),
    );
  }

  return list;
});

const fetchPertanyaan = async () => {
  loading.value = true;

  try {
    const res = await getMasterPertanyaanGpph();
    pertanyaanList.value = res.data?.data || res.data || [];
  } catch (err) {
    console.error(err);
    showError("Gagal mengambil data GPPH");
  } finally {
    loading.value = false;
  }
};

const resetFilter = () => {
  search.value = "";
  filterStatus.value = "active";
};

const resetErrors = () => {
  errors.urutan = "";
  errors.pertanyaan = "";
};

const validateForm = () => {
  resetErrors();

  let valid = true;

  if (!form.urutan || form.urutan < 1) {
    errors.urutan = "Urutan wajib diisi minimal 1";
    valid = false;
  }

  if (!form.pertanyaan.trim()) {
    errors.pertanyaan = "Pertanyaan wajib diisi";
    valid = false;
  }

  if (!valid) {
    showWarning("Periksa kembali form yang wajib diisi");
  }

  return valid;
};

const getNextUrutan = () => {
  const activeList = pertanyaanList.value.filter((item) => item.is_active);

  if (activeList.length === 0) return 1;

  return Math.max(...activeList.map((item) => item.urutan || 0)) + 1;
};

const resetForm = () => {
  form.urutan = getNextUrutan();
  form.pertanyaan = "";
  form.is_active = true;
  selectedId.value = null;
  resetErrors();
};

const openCreateModal = () => {
  resetForm();
  isEdit.value = false;
  showModal.value = true;
};

const openEditModal = (item) => {
  resetErrors();

  isEdit.value = true;
  selectedId.value = item.id;

  form.urutan = item.urutan;
  form.pertanyaan = item.pertanyaan;
  form.is_active = item.is_active;

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  submitting.value = true;

  const payload = {
    urutan: form.urutan,
    pertanyaan: form.pertanyaan.trim(),
    is_active: form.is_active,
  };

  try {
    if (isEdit.value) {
      await updateMasterPertanyaanGpph(selectedId.value, payload);
      showSuccess("Pertanyaan GPPH berhasil diupdate");
    } else {
      await createMasterPertanyaanGpph(payload);
      showSuccess("Pertanyaan GPPH berhasil dibuat");
    }

    closeModal();
    fetchPertanyaan();
  } catch (err) {
    if (err.errors) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = Array.isArray(err.errors[key])
          ? err.errors[key][0]
          : err.errors[key];
      });

      showWarning("Periksa kembali form");
      return;
    }

    showError(err.message || "Gagal menyimpan pertanyaan GPPH");
  } finally {
    submitting.value = false;
  }
};

const openConfirmModal = ({
  title,
  message,
  targetName = "",
  confirmText = "Konfirmasi",
  variant = "primary",
  action,
}) => {
  confirmModal.show = true;
  confirmModal.title = title;
  confirmModal.message = message;
  confirmModal.targetName = targetName;
  confirmModal.confirmText = confirmText;
  confirmModal.variant = variant;
  confirmModal.action = action;
};

const closeConfirmModal = () => {
  confirmModal.show = false;
  confirmModal.title = "";
  confirmModal.message = "";
  confirmModal.targetName = "";
  confirmModal.confirmText = "Konfirmasi";
  confirmModal.variant = "primary";
  confirmModal.action = null;
};

const handleConfirmModal = async () => {
  if (confirmModal.action) {
    await confirmModal.action();
  }

  closeConfirmModal();
};

const handleNonaktif = (item) => {
  openConfirmModal({
    title: "Nonaktifkan Pertanyaan",
    message:
      "Pertanyaan berikut tidak akan tampil pada observasi GPPH baru.",
    targetName: item.pertanyaan,
    confirmText: "Nonaktifkan",
    variant: "danger",
    action: async () => {
      try {
        await nonaktifkanMasterPertanyaanGpph(item.id);
        showSuccess("Pertanyaan berhasil dinonaktifkan");
        fetchPertanyaan();
      } catch (err) {
        showError("Gagal menonaktifkan pertanyaan");
      }
    },
  });
};

const handleAktif = (item) => {
  openConfirmModal({
    title: "Aktifkan Pertanyaan",
    message:
      "Pertanyaan berikut akan tampil kembali pada observasi GPPH.",
    targetName: item.pertanyaan,
    confirmText: "Aktifkan",
    variant: "primary",
    action: async () => {
      try {
        await aktifkanMasterPertanyaanGpph(item.id);
        showSuccess("Pertanyaan berhasil diaktifkan");
        fetchPertanyaan();
      } catch (err) {
        showError("Gagal mengaktifkan pertanyaan");
      }
    },
  });
};

onMounted(() => {
  fetchPertanyaan();
});
</script>
