<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="9">
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <div class="relative">
              <button class="absolute -translate-y-1/2 left-4 top-1/2">
                <Search class="w-4 h-4 text-gray-400" />
              </button>

              <input
                v-model="search"
                @keyup.enter="loadSiswa(1)"
                type="text"
                placeholder="Search"
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </div>

            <button
              @click="loadSiswa(1)"
              class="text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Cari
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
          <th class="px-6 py-3">NISN</th>
          <th class="px-6 py-3">Jenis</th>
          <th class="px-6 py-3">Kelas</th>
          <th class="px-6 py-3">Program</th>
          <th class="px-6 py-3">Tahun Ajaran</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="(item, index) in list"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </td>
          <td class="px-6 py-4">
            {{ meta.from ? meta.from + index : index + 1 }}
          </td>

          <td class="px-6 py-4 font-medium text-gray-700">
            {{ item.nama_lengkap }}
          </td>

          <td class="px-6 py-4">
            {{ item.nisn || "-" }}
          </td>

          <td class="px-6 py-4 uppercase">
            {{ item.jenis || "-" }}
          </td>

          <td class="px-6 py-4">
            {{ item.kelas || "Belum ada kelas" }}
          </td>

          <td class="px-6 py-4 capitalize">
            {{ item.program || "-" }}
          </td>

          <td class="px-6 py-4">
            {{ item.tahun_ajaran || "-" }}
          </td>

          <td class="px-6 py-4">
            <StatusBadge
              :label="item.status"
              :custom-class="studentStatusClass(item.status)"
            />
          </td>

          <td class="px-6 py-4">
            <router-link
              :to="detailRoute(item.id)"
              class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 inline-block"
            >
              <Eye class="w-4 h-4" />
            </router-link>
          </td>
        </tr>
      </template>

      <template #pagination>
        <TablePagination :meta="meta" @change="loadSiswa" />
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import { useRoute } from "vue-router";
import { Eye, Search } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";

import { getAllSiswa } from "@/lib/services/siswaService";

const route = useRoute();

const list = ref([]);
const meta = ref({});
const loading = ref(false);
const search = ref("");
const lastFetch = ref(null);

const detailRoute = (id) => {
  const isGuru = route.path.startsWith("/dashboard/guru");

  return {
    name: isGuru ? "GuruSiswaDetail" : "AdminSiswaDetail",
    params: { id },
  };
};

const studentStatusClass = (status) => {
  const map = {
    aktif: "text-emerald-600",
    lulus: "text-blue-600",
    keluar: "text-red-600",
  };

  return map[status] || "text-gray-600";
};

const loadSiswa = async (page = 1) => {
  try {
    loading.value = true;

    const params = new URLSearchParams({
      page,
    });

    if (search.value) {
      params.append("search", search.value);
    }

    const res = await getAllSiswa(`?${params.toString()}`);

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
  loadSiswa();
});

onActivated(() => {
  const now = Date.now();

  if (!lastFetch.value || now - lastFetch.value > 30000) {
    loadSiswa();
  }
});
</script>
