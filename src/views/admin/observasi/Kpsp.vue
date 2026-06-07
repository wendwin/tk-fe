<!-- <template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg text-gray-700 font-medium mb-4">Kelola KPSP</h1>
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
            <th class="px-4 py-3 text-left">Usia</th>
            <th class="px-4 py-3 text-left">No</th>
            <th class="px-4 py-3 text-left">Aspek</th>
            <th class="px-4 py-3 text-left">Kemampuan Anak</th>
            <th class="px-4 py-3 text-center">Status</th>
            <th class="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="px-4 py-6 text-center text-gray-500">
              Memuat data...
            </td>
          </tr>

          <tr v-else-if="pertanyaanList.length === 0">
            <td colspan="6" class="px-4 py-6 text-center text-gray-500">
              Belum ada pertanyaan.
            </td>
          </tr>

          <tr
            v-for="item in pertanyaanList"
            :key="item.id"
            class="border-t border-gray-100"
          >
            <td class="px-4 py-3">{{ item.usia_bulan }} bulan</td>
            <td class="px-4 py-3">{{ item.urutan }}</td>
            <td class="px-4 py-3">{{ item.aspek_perkembangan }}</td>
            <td class="px-4 py-3">{{ item.kemampuan_anak }}</td>

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
                required
                v-model.number="form.usia_bulan"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option :value="24">24 Bulan</option>
                <option :value="30">30 Bulan</option>
                <option :value="36">36 Bulan</option>
                <option :value="42">42 Bulan</option>
                <option :value="48">48 Bulan</option>
                <option :value="54">54 Bulan</option>
                <option :value="60">60 Bulan</option>
                <option :value="66">66 Bulan</option>
                <option :value="72">72 Bulan</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Urutan</label>
              <input
                required
                v-model.number="form.urutan"
                type="number"
                min="1"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
              required
              v-model="form.aspek_perkembangan"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Contoh: Motorik kasar"
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
              required
              v-model="form.kemampuan_anak"
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Masukkan kemampuan anak yang dinilai"
            ></textarea>
          </div>

          <div class="mb-6" v-if="isEdit">
            <label class="block text-sm font-medium mb-1">Status</label>
            <select
              required
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
import { reactive, ref } from "vue";
import {
  getMasterPertanyaanKpsp,
  createMasterPertanyaanKpsp,
  updateMasterPertanyaanKpsp,
  nonaktifkanMasterPertanyaanKpsp,
  aktifkanMasterPertanyaanKpsp,
} from "@/lib/services/observasiService";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import { SquarePen, EyeOff, Eye } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const pertanyaanList = ref([]);
const loading = ref(false);
const submitting = ref(false);
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

const confirmModal = reactive({
  show: false,
  title: "",
  message: "",
  action: null,
});

const errors = reactive({
  usia_bulan: "",
  urutan: "",
  aspek_perkembangan: "",
  kemampuan_anak: "",
});

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

const fetchPertanyaan = async () => {
  loading.value = true;

  try {
    const res = await getMasterPertanyaanKpsp();
    pertanyaanList.value = res.data?.data || res.data || [];
  } catch (err) {
    console.error(err);
    alert("Gagal mengambil data KPSP");
  } finally {
    loading.value = false;
  }
};

const getNextUrutan = (usiaBulan) => {
  const filtered = pertanyaanList.value.filter(
    (item) => item.usia_bulan === usiaBulan,
  );

  if (filtered.length === 0) return 1;

  return Math.max(...filtered.map((item) => item.urutan || 0)) + 1;
};

const resetForm = () => {
  form.usia_bulan = 24;
  form.aspek_perkembangan = "";
  form.kemampuan_anak = "";
  form.urutan = getNextUrutan(24);
  form.is_active = true;
  selectedId.value = null;
};

const openCreateModal = () => {
  resetForm();
  isEdit.value = false;
  showModal.value = true;
};

const openEditModal = (item) => {
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

const handleNonaktif = (id) => {
  openConfirmModal({
    title: "Nonaktifkan Pertanyaan",
    message:
      "Pertanyaan tidak akan tampil pada observasi KPSP baru. Lanjutkan?",
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

fetchPertanyaan();
</script> -->

<template>
  <div>
    <h1 class="text-lg text-gray-700 font-medium mb-4">Kelola KPSP</h1>

    <KpspTable />
  </div>
</template>

<script setup>
import KpspTable from "@/components/admin/observasi/KpspTable.vue";
</script>
