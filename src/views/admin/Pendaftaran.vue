<template>
  <div>
    <h1 class="text-lg text-gray-700 font-semibold dark:text-gray-400 mb-3">
      Data Pendaftaran
    </h1>

    <div
      class="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <table class="w-full text-sm text-left text-gray-600">
        <thead
          class="text-xs uppercase bg-gray-100 text-gray-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-400"
        >
          <tr>
            <th class="p-4">
              <input
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              />
            </th>
            <th class="px-6 py-3">No</th>
            <th class="px-6 py-3">Nama</th>
            <th class="px-6 py-3">Umur</th>
            <th class="px-6 py-3">Jenis</th>
            <th class="px-6 py-3">Program</th>
            <th class="px-6 py-3">Tanggal</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Pembayaran</th>
            <th class="px-6 py-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="item.id"
            class="bg-white border-b border-gray-200 hover:bg-gray-50 dark:bg-gray-900 hover:dark:bg-gray-800 dark:border-gray-800"
          >
            <td class="p-4">
              <input type="checkbox" class="w-4 h-4 border-gray-300 rounded" />
            </td>

            <td class="px-6 py-4 dark:text-gray-400">
              {{ item.no_pendaftaran }}
            </td>
            <td class="px-6 py-4 dark:text-gray-400">
              {{ item.nama_lengkap }}
            </td>
            <td class="px-6 py-4 dark:text-gray-400">-</td>
            <td class="px-6 py-4 dark:text-gray-400 uppercase">
              {{ item.jenis }}
            </td>
            <td class="px-6 py-4 dark:text-gray-400 capitalize">
              {{ item.program }}
            </td>
            <td class="px-6 py-4 dark:text-gray-400">
              {{ new Date(item.tanggal_daftar).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'font-medium capitalize',
                  statusConfig(item.status).class,
                ]"
              >
                {{ statusConfig(item.status).label }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'font-medium capitalize',
                  paymentConfig(item.status_pembayaran).class,
                ]"
              >
                {{ paymentConfig(item.status_pembayaran).label }}
              </span>
            </td>

            <td class="px-6 py-4">
              <button
                class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
              >
                <Eye class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-between p-4 flex-wrap gap-3">
        <span class="text-sm text-gray-600">
          Showing
          <span class="font-semibold text-gray-900 dark:text-gray-400">
            {{ meta.total }}
          </span>
          of
          <span class="font-semibold text-gray-900 dark:text-gray-400">
            {{ meta.per_page }}
          </span>
        </span>

        <ul class="flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-gray-900 font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >Previous</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm w-9 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >1</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm w-9 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >2</a
            >
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              class="flex items-center justify-center text-blue-700 bg-brand-softer box-border border border-gray-200 hover:bg-brand-soft hover:text-blue-700 font-medium text-sm w-9 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >3</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm w-9 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >...</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-medium text-sm w-9 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >5</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center text-gray-600 bg-gray-50 box-border border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-700 hover:dark:text-white"
              >Next</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllPendaftaran } from "@/lib/services/pendaftaranService";
import { Eye, Search, Filter, Download } from "lucide-vue-next";
import { statusConfig, paymentConfig } from "@/lib/utils/status";

const list = ref([]);
const meta = ref({});
const loading = ref(false);

const loadPendaftaran = async () => {
  try {
    loading.value = true;
    const res = await getAllPendaftaran();

    list.value = res.data;
    meta.value = res.meta;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// const loadPendaftaran = async (page = 1) => {
//   const res = await getAllPendaftaran(`?page=${page}`);
// };

onMounted(() => {
  loadPendaftaran();
});
</script>

<style lang="scss" scoped></style>
