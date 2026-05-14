<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="10">
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <button
              @click="showModal = true"
              class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Tambah Jadwal
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
              <button
                @click="openFilter = !openFilter"
                class="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
              >
                <Filter class="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>

              <div
                v-if="openFilter"
                class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 dark:bg-gray-900 dark:border-gray-700"
              >
                <h3
                  class="text-sm font-semibold text-gray-700 mb-3 dark:text-white"
                >
                  Filter
                </h3>

                <div class="mb-3">
                  <label class="text-xs text-gray-500">Status</label>
                  <select
                    class="w-full mt-1 border border-gray-200 rounded-lg text-sm p-2 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Semua</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Terverifikasi</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="text-xs text-gray-500">Pembayaran</label>
                  <select
                    class="w-full mt-1 border border-gray-200 rounded-lg text-sm p-2 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">Semua</option>
                    <option value="paid">Lunas</option>
                    <option value="unpaid">Belum bayar</option>
                  </select>
                </div>

                <div class="flex justify-end gap-2 mt-3">
                  <button
                    @click="openFilter = false"
                    class="text-sm px-3 py-1 rounded-lg border border-gray-200"
                  >
                    Reset
                  </button>
                  <button
                    class="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <button
              class="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
            >
              <Download class="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="p-4">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="toggleSelectAll"
            />
          </th>

          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Jenis</th>
          <th class="px-6 py-3">Tgl Daftar</th>
          <th class="px-6 py-3">Pelaksanaan</th>
          <th class="px-6 py-3">Status Observasi</th>
          <th class="px-6 py-3">Status Pendaftaran</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr v-for="item in list" :key="item.id" class="border-b">
          <td class="p-4">
            <input
              type="checkbox"
              class="w-4 h-4"
              :value="item.id"
              v-model="selectedIds"
              @change="isAllSelected = false"
            />
          </td>

          <td class="px-6 py-4">
            {{ item.no_pendaftaran }}
          </td>

          <td class="px-6 py-4">
            {{ item.nama_lengkap }}
          </td>

          <td class="px-6 py-4 uppercase">
            {{ item.jenis }}
          </td>

          <td class="px-6 py-4">
            {{ formatDateTimeID(item.created_at) }}
          </td>

          <td class="px-6 py-4">
            {{ formatDateTimeID(item.observasi_at || "-") }}
          </td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="
                item.status_observasi === 'belum' ? '-' : item.status_observasi
              "
              :custom-class="
                item.status_observasi === 'belum' ? '' : item.status_observasi
              "
            />
          </td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="statusConfig(item.status).label"
              :custom-class="statusConfig(item.status).class"
              type="pendaftaran"
            />
          </td>

          <td class="px-6 py-4">
            <router-link
              :to="{
                name: 'AdminObservasiDetail',
                params: { id: item.id },
              }"
              class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 inline-block"
            >
              <Eye class="w-4 h-4" />
            </router-link>
          </td>
        </tr>
      </template>

      <template #pagination>
        <TablePagination :meta="meta" @change="loadPendaftaran" />
      </template>
    </BaseTable>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-8 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Jadwal Observasi</h2>

        <div class="mb-5">
          <label class="block text-sm mb-2"> Tanggal & Jam Observasi </label>

          <div class="space-y-4">
            <VueDatePicker
              v-model="observasiAt"
              inline
              auto-apply
              :enable-time-picker="true"
            />
          </div>
        </div>

        <div class="mb-4 space-y-1">
          <div class="text-sm text-gray-500">
            Dipilih: {{ selectedIds.length }} peserta
          </div>
          <div class="text-sm text-gray-500">
            Jadwal:
            {{ observasiAt ? observasiAt.toLocaleString("id-ID") : "-" }}
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 border rounded-lg">
            Batal
          </button>

          <button
            @click="handleSetJadwal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, computed } from "vue";
import { Eye, Search, Filter, Download } from "lucide-vue-next";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";

import { getAllPendaftaran } from "@/lib/services/pendaftaranService";
import { setJadwalObservasi } from "@/lib/services/pendaftaranService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { statusConfig, paymentConfig } from "@/lib/utils/status";
import formatDateTimeID from "@/lib/utils/formatDateTimeID";

const list = ref([]);
const meta = ref({});
const loading = ref(false);
const search = ref("");
const lastFetch = ref(null);
const selectedIds = ref([]);
const showModal = ref(false);
const observasiAt = ref(null);
const isAllSelected = ref(false);

const toggleSelectAll = (event) => {
  isAllSelected.value = event.target.checked;

  if (event.target.checked) {
    selectedIds.value = list.value.map((item) => item.id);
  } else {
    selectedIds.value = [];
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedIds.value = [];
  observasiAt.value = null;
  isAllSelected.value = false;
};

const loadPendaftaran = async (page = 1) => {
  try {
    loading.value = true;

    const res = await getAllPendaftaran(
      `?page=${page}&status=verified&status_pembayaran=paid`,
    );

    list.value = res.data;
    meta.value = res.meta;

    lastFetch.value = Date.now();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleSetJadwal = async () => {
  try {
    if (!observasiAt.value) {
      showWarning("Pilih tanggal dan jam observasi");
      return;
    }

    if (selectedIds.value.length === 0) {
      showWarning("Peserta belum dipilih");
      return;
    }

    const date = new Date(observasiAt.value);

    const formatted =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0");

    await setJadwalObservasi({
      pendaftaran_ids: selectedIds.value,
      observasi_at: formatted,
    });

    closeModal();

    await loadPendaftaran();

    showSuccess("Jadwal observasi berhasil disimpan");
  } catch (err) {
    console.error(err);
    showError("Gagal menyimpan jadwal observasi");
  }
};

onMounted(() => {
  loadPendaftaran();
});

onActivated(() => {
  const now = Date.now();

  if (!lastFetch.value || now - lastFetch.value > 30000) {
    loadPendaftaran();
  }
});
</script>
