<template>
  <div>
    <BaseTable
      :loading="loading"
      :is-empty="filteredList.length === 0"
      :colspan="6"
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
              v-model="filterUsia"
              class="h-9 border border-gray-200 text-gray-600 rounded-lg text-sm px-3"
            >
              <option value="">Semua Usia</option>
              <option v-for="usia in usiaOptions" :key="usia" :value="usia">
                {{ usia }} Bulan
              </option>
            </select>

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
          <th class="px-6 py-3">Usia</th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Aspek</th>
          <th class="px-6 py-3">Kemampuan Anak</th>
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
          <td class="px-6 py-4">{{ item.usia_bulan }} bulan</td>
          <td class="px-6 py-4">{{ item.urutan }}</td>
          <td class="px-6 py-4">{{ item.aspek_perkembangan }}</td>
          <td class="px-6 py-4">{{ item.kemampuan_anak }}</td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="item.is_active ? 'Aktif' : 'Nonaktif'"
              :custom-class="
                item.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
            />
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
                @click="handleNonaktif(item.id)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-red-600 hover:bg-gray-50"
              >
                <EyeOff class="w-4 h-4" />
              </button>

              <button
                v-else
                @click="handleAktif(item.id)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-green-600 hover:bg-gray-50"
              >
                <Eye class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </BaseTable>

    <!-- Modal tambah/edit -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="w-full max-w-xl bg-white rounded-xl p-6">
        <h2 class="text-lg font-semibold mb-4">
          {{ isEdit ? "Edit Pertanyaan KPSP" : "Tambah Pertanyaan KPSP" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium mb-1">Usia Bulan</label>
              <select
                v-model.number="form.usia_bulan"
                required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="usia in usiaOptions" :key="usia" :value="usia">
                  {{ usia }} Bulan
                </option>
              </select>
            </div>

            <div>
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
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">
              Aspek Perkembangan
            </label>
            <input
              v-model="form.aspek_perkembangan"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p
              v-if="errors.aspek_perkembangan"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.aspek_perkembangan }}
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">
              Kemampuan Anak
            </label>
            <textarea
              v-model="form.kemampuan_anak"
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p v-if="errors.kemampuan_anak" class="text-xs text-red-500 mt-1">
              {{ errors.kemampuan_anak }}
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

    <ConfirmModal
      :show="confirmModal.show"
      :title="confirmModal.title"
      :message="confirmModal.message"
      @confirm="handleConfirmModal"
      @cancel="closeConfirmModal"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Search, X, SquarePen, EyeOff, Eye } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

import {
  getMasterPertanyaanKpsp,
  createMasterPertanyaanKpsp,
  updateMasterPertanyaanKpsp,
  nonaktifkanMasterPertanyaanKpsp,
  aktifkanMasterPertanyaanKpsp,
} from "@/lib/services/observasiService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const usiaOptions = [24, 30, 36, 42, 48, 54, 60, 66, 72];

const pertanyaanList = ref([]);
const loading = ref(false);
const submitting = ref(false);

const search = ref("");
const filterUsia = ref("");
const filterStatus = ref("active");

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  usia_bulan: 24,
  aspek_perkembangan: "",
  kemampuan_anak: "",
  urutan: 1,
  is_active: true,
});

const errors = reactive({
  usia_bulan: "",
  urutan: "",
  aspek_perkembangan: "",
  kemampuan_anak: "",
});

const confirmModal = reactive({
  show: false,
  title: "",
  message: "",
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

  if (filterUsia.value) {
    list = list.filter((item) => item.usia_bulan === Number(filterUsia.value));
  }

  if (search.value) {
    const keyword = search.value.toLowerCase();

    list = list.filter((item) => {
      return (
        item.aspek_perkembangan?.toLowerCase().includes(keyword) ||
        item.kemampuan_anak?.toLowerCase().includes(keyword)
      );
    });
  }

  return list;
});

const fetchPertanyaan = async () => {
  loading.value = true;

  try {
    const res = await getMasterPertanyaanKpsp();
    pertanyaanList.value = res.data?.data || res.data || [];
  } catch (err) {
    console.error(err);
    showError("Gagal mengambil data KPSP");
  } finally {
    loading.value = false;
  }
};

const resetFilter = () => {
  search.value = "";
  filterUsia.value = "";
  filterStatus.value = "active";
};

const resetErrors = () => {
  errors.usia_bulan = "";
  errors.urutan = "";
  errors.aspek_perkembangan = "";
  errors.kemampuan_anak = "";
};

const validateForm = () => {
  resetErrors();

  let valid = true;

  if (!form.usia_bulan) {
    errors.usia_bulan = "Usia bulan wajib dipilih";
    valid = false;
  }

  if (!form.urutan || form.urutan < 1) {
    errors.urutan = "Urutan wajib diisi minimal 1";
    valid = false;
  }

  if (!form.aspek_perkembangan.trim()) {
    errors.aspek_perkembangan = "Aspek perkembangan wajib diisi";
    valid = false;
  }

  if (!form.kemampuan_anak.trim()) {
    errors.kemampuan_anak = "Kemampuan anak wajib diisi";
    valid = false;
  }

  if (!valid) {
    showWarning("Periksa kembali form yang wajib diisi");
  }

  return valid;
};

const getNextUrutan = (usiaBulan) => {
  const filtered = pertanyaanList.value.filter(
    (item) => item.usia_bulan === usiaBulan && item.is_active,
  );

  if (filtered.length === 0) return 1;

  return Math.max(...filtered.map((item) => item.urutan || 0)) + 1;
};

watch(
  () => form.usia_bulan,
  (newValue) => {
    if (!isEdit.value) {
      form.urutan = getNextUrutan(newValue);
    }
  },
);

const resetForm = () => {
  form.usia_bulan = 24;
  form.aspek_perkembangan = "";
  form.kemampuan_anak = "";
  form.urutan = getNextUrutan(24);
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

  form.usia_bulan = item.usia_bulan;
  form.aspek_perkembangan = item.aspek_perkembangan;
  form.kemampuan_anak = item.kemampuan_anak;
  form.urutan = item.urutan;
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
    usia_bulan: form.usia_bulan,
    aspek_perkembangan: form.aspek_perkembangan.trim(),
    kemampuan_anak: form.kemampuan_anak.trim(),
    urutan: form.urutan,
    is_active: form.is_active,
  };

  try {
    if (isEdit.value) {
      await updateMasterPertanyaanKpsp(selectedId.value, payload);
      showSuccess("Pertanyaan KPSP berhasil diupdate");
    } else {
      await createMasterPertanyaanKpsp(payload);
      showSuccess("Pertanyaan KPSP berhasil dibuat");
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

    showError(err.message || "Gagal menyimpan pertanyaan KPSP");
  } finally {
    submitting.value = false;
  }
};

const openConfirmModal = ({ title, message, action }) => {
  confirmModal.show = true;
  confirmModal.title = title;
  confirmModal.message = message;
  confirmModal.action = action;
};

const closeConfirmModal = () => {
  confirmModal.show = false;
  confirmModal.title = "";
  confirmModal.message = "";
  confirmModal.action = null;
};

const handleConfirmModal = async () => {
  if (confirmModal.action) {
    await confirmModal.action();
  }

  closeConfirmModal();
};

const handleNonaktif = (id) => {
  openConfirmModal({
    title: "Nonaktifkan Pertanyaan",
    message:
      "Pertanyaan tidak akan tampil pada observasi KPSP baru. Riwayat observasi lama tetap aman karena menggunakan snapshot.",
    action: async () => {
      try {
        await nonaktifkanMasterPertanyaanKpsp(id);
        showSuccess("Pertanyaan berhasil dinonaktifkan");
        fetchPertanyaan();
      } catch (err) {
        console.error(err);
        showError("Gagal menonaktifkan pertanyaan");
      }
    },
  });
};

const handleAktif = (id) => {
  openConfirmModal({
    title: "Aktifkan Pertanyaan",
    message:
      "Pertanyaan akan tampil kembali pada observasi KPSP sesuai usia. Lanjutkan?",
    action: async () => {
      try {
        await aktifkanMasterPertanyaanKpsp(id);
        showSuccess("Pertanyaan berhasil diaktifkan");
        fetchPertanyaan();
      } catch (err) {
        console.error(err);
        showError("Gagal mengaktifkan pertanyaan");
      }
    },
  });
};

onMounted(() => {
  fetchPertanyaan();
});
</script>

<style scoped></style>
