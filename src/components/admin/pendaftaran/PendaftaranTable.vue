<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="10">
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
            <input type="checkbox" class="w-4 h-4" />
          </th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Umur</th>
          <th class="px-6 py-3">Jenis</th>
          <th class="px-6 py-3">Program</th>
          <th class="px-6 py-3">Tgl Daftar</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Pembayaran</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="item in list"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </td>

          <td class="px-6 py-4">
            {{ item.no_pendaftaran }}
          </td>

          <td class="px-6 py-4">
            {{ item.nama_lengkap }}
          </td>

          <td class="px-6 py-4 capitalize">
            {{ item.umur }}
          </td>
          <td class="px-6 py-4 uppercase">
            {{ item.jenis }}
          </td>

          <td class="px-6 py-4 capitalize">
            {{ item.program }}
          </td>

          <td class="px-6 py-4">
            {{ new Date(item.created_at).toLocaleDateString() }}
          </td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="statusConfig(item.status).label"
              :custom-class="statusConfig(item.status).class"
            />
          </td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="paymentConfig(item.status_pembayaran).label"
              :custom-class="paymentConfig(item.status_pembayaran).class"
            />
          </td>

          <td class="px-6 py-4">
            <router-link
              :to="{
                name: 'AdminPendaftarDetail',
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
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import { Eye, Search, Filter, Download } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";

import { getAllPendaftaran } from "@/lib/services/pendaftaranService";
import { statusConfig, paymentConfig } from "@/lib/utils/status";

const list = ref([]);
const meta = ref({});
const loading = ref(false);
const search = ref("");
const lastFetch = ref(null);

const loadPendaftaran = async (page = 1) => {
  try {
    loading.value = true;

    const res = await getAllPendaftaran(`?page=${page}`);

    console.log("table pendaftaran", res);
    list.value = res.data;
    meta.value = res.meta;

    lastFetch.value = Date.now();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
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

<style lang="scss" scoped></style>
