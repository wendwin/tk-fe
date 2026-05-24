<template>
  <BaseTable :loading="false" :is-empty="items.length === 0" :colspan="8">
    <template #head>
      <tr>
        <th class="px-6 py-3">No</th>
        <th class="px-6 py-3">Nama</th>
        <th class="px-6 py-3">NISN</th>
        <th class="px-6 py-3">Jenis Kelamin</th>
        <th class="px-6 py-3">Tanggal Lahir</th>
        <th class="px-6 py-3">Kelas</th>
        <th class="px-6 py-3">Status</th>
        <th class="px-6 py-3">Aksi</th>
      </tr>
    </template>

    <template #body>
      <tr
        v-for="(item, index) in items"
        :key="item.id"
        class="bg-white border-b border-gray-200 hover:bg-gray-50"
      >
        <td class="px-6 py-4">
          {{ index + 1 }}
        </td>

        <td class="px-6 py-4 font-medium text-gray-700">
          {{ item.siswa?.nama_lengkap || "-" }}
        </td>

        <td class="px-6 py-4">
          {{ item.siswa?.nisn || "-" }}
        </td>

        <td class="px-6 py-4">
          {{ item.siswa?.jenis_kelamin || "-" }}
        </td>

        <td class="px-6 py-4">
          {{ formatDate(item.siswa?.tanggal_lahir) }}
        </td>

        <td class="px-6 py-4">
          {{ formatKelas(item.kelas) }}
        </td>

        <td class="px-6 py-4">
          <StatusBadge
            :label="item.status || '-'"
            :custom-class="studentStatusClass(item.status)"
          />
        </td>

        <td class="px-6 py-4">
          <router-link
            :to="{ name: 'AdminSiswaDetail', params: { id: item.siswa?.id } }"
            class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 inline-block"
          >
            <Eye class="w-4 h-4" />
          </router-link>
        </td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import { Eye } from "lucide-vue-next";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import StatusBadge from "@/components/admin/common/StatusBadge.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const studentStatusClass = (status) => {
  const map = {
    aktif: "text-emerald-600",
    lulus: "text-blue-600",
    keluar: "text-red-600",
  };

  return map[status] || "text-gray-600";
};

const formatKelas = (kelas) => {
  if (!kelas) return "-";

  const jenjang = kelas.jenjang ? kelas.jenjang.toUpperCase() : "";
  const kelompok = kelas.kelompok ? kelas.kelompok.toUpperCase() : "";
  const nama = kelas.nama || "";

  if (kelas.jenjang === "kb") return nama ? `${jenjang} ${nama}` : jenjang;
  if (kelompok && nama) return `${jenjang}-${kelompok} ${nama}`;
  if (kelompok) return `${jenjang}-${kelompok}`;

  return nama || jenjang || "-";
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
</script>
