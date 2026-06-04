<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="5">
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <button
              @click="openCreate"
              class="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Tambah Gelombang
            </button>
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Tanggal Mulai</th>
          <th class="px-6 py-3">Tanggal Selesai</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="(item, index) in list"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td class="px-6 py-4 font-medium text-gray-700">{{ item.nama }}</td>
          <td class="px-6 py-4">{{ formatDateID(item.tanggal_mulai) }}</td>
          <td class="px-6 py-4">{{ formatDateID(item.tanggal_selesai) }}</td>

          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="openEdit(item)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-amber-600 hover:bg-gray-50"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                @click="handleDelete(item.id)"
                class="px-2 py-1 rounded-md border text-gray-600 hover:text-red-600 hover:bg-gray-50"
              >
                <Trash class="w-4 h-4" />
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
      <div class="w-full max-w-lg bg-white rounded-xl p-6">
        <h2 class="text-lg font-semibold mb-4">
          {{ isEdit ? "Edit Gelombang" : "Tambah Gelombang" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Nama</label>
            <input
              v-model="form.nama"
              type="text"
              required
              placeholder="Contoh: Gelombang 1"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Tanggal Mulai</label>
            <input
              v-model="form.tanggal_mulai"
              type="date"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium mb-1"
              >Tanggal Selesai</label
            >
            <input
              v-model="form.tanggal_selesai"
              type="date"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
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
              :disabled="saving"
              class="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ saving ? "Menyimpan..." : "Simpan" }}
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
import { onMounted, reactive, ref } from "vue";
import { SquarePen, Trash } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

import {
  getGelombangByTahunAjaran,
  createGelombang,
  updateGelombang,
  deleteGelombang,
} from "@/lib/services/gelombangService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const props = defineProps({
  tahunAjaranId: {
    type: Number,
    required: true,
  },
});

const list = ref([]);
const loading = ref(false);
const saving = ref(false);

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  nama: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
});

const confirmModal = reactive({
  show: false,
  title: "",
  message: "",
  action: null,
});

const fetchGelombang = async () => {
  loading.value = true;

  try {
    const res = await getGelombangByTahunAjaran(props.tahunAjaranId);
    list.value = res.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data gelombang");
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.nama = "";
  form.tanggal_mulai = "";
  form.tanggal_selesai = "";
  selectedId.value = null;
};

const openCreate = () => {
  resetForm();
  isEdit.value = false;
  showModal.value = true;
};

const openEdit = (item) => {
  isEdit.value = true;
  selectedId.value = item.id;

  form.nama = item.nama;
  form.tanggal_mulai = item.tanggal_mulai;
  form.tanggal_selesai = item.tanggal_selesai;

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  if (!form.nama.trim()) {
    showWarning("Nama gelombang wajib diisi");
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

  saving.value = true;

  const payload = {
    tahun_ajaran_id: props.tahunAjaranId,
    nama: form.nama.trim(),
    tanggal_mulai: form.tanggal_mulai,
    tanggal_selesai: form.tanggal_selesai,
  };

  try {
    if (isEdit.value) {
      await updateGelombang(selectedId.value, {
        nama: payload.nama,
        tanggal_mulai: payload.tanggal_mulai,
        tanggal_selesai: payload.tanggal_selesai,
      });

      showSuccess("Gelombang berhasil diupdate");
    } else {
      await createGelombang(payload);
      showSuccess("Gelombang berhasil dibuat");
    }

    closeModal();
    fetchGelombang();
  } catch (err) {
    showError(err.message || "Gagal menyimpan gelombang");
  } finally {
    saving.value = false;
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

const handleDelete = (id) => {
  openConfirmModal({
    title: "Hapus Gelombang",
    message:
      "Gelombang yang sudah digunakan pada pendaftaran tidak dapat dihapus. Lanjutkan?",
    action: async () => {
      try {
        await deleteGelombang(id);
        showSuccess("Gelombang berhasil dihapus");
        fetchGelombang();
      } catch (err) {
        showError(err.message || "Gagal menghapus gelombang");
      }
    },
  });
};

const formatDateID = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

onMounted(() => {
  fetchGelombang();
});
</script>
