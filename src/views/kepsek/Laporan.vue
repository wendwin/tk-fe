<template>
  <div>
    <h1 class="text-lg font-semibold text-gray-700 mb-4">Laporan</h1>
    <!-- <p class="text-sm text-gray-500">
        Rekap pendaftaran, observasi, dan monitoring.
      </p> -->
  </div>
  <div class="space-y-5">
    <div class="flex items-center justify-end gap-4">
      <select
        v-model="filterTahunAjaranId"
        @change="loadData"
        class="cursor-pointer flex items-center gap-2 bg-white text-sm px-3 py-1.5 border rounded-lg text-slate-600 hover:bg-gray-100 transition"
      >
        <option v-for="item in tahunAjaranList" :key="item.id" :value="item.id">
          {{ item.label }}
        </option>
      </select>

      <button
        type="button"
        @click="handleDownloadLaporan"
        class="cursor-pointer flex items-center gap-2 bg-white text-sm px-3 py-1.5 border rounded-lg text-slate-600 hover:bg-gray-100 transition"
      >
        Export PDF
      </button>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="item in summaryCards"
        :key="item.title"
        class="bg-white border border-gray-200 rounded-xl p-5"
      >
        <p class="text-sm text-gray-500">{{ item.title }}</p>

        <h2 class="text-2xl font-medium text-gray-700 mt-2">
          {{ item.value }}
        </h2>

        <p class="text-xs text-gray-500 mt-3">
          {{ item.description }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <!-- Rekap Pendaftaran -->
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div class="px-5 py-3 border-b border-gray-200">
          <h2 class="font-semibold text-gray-700">Rekap Pendaftaran</h2>
        </div>

        <div class="px-5 py-2">
          <div
            v-for="item in pendaftaranStats"
            :key="item.label"
            class="flex justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600">
              {{ item.label }}
            </span>

            <span class="text-sm text-gray-700">
              {{ item.total }}
            </span>
          </div>
        </div>
      </div>

      <!-- Rekap Observasi -->
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div class="px-5 py-3 border-b border-gray-200">
          <h2 class="font-semibold text-gray-700">Rekap Observasi</h2>
        </div>

        <div class="px-5 py-2">
          <div
            v-for="item in observasiStats"
            :key="item.label"
            class="flex justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600">
              {{ item.label }}
            </span>

            <span class="text-sm text-gray-700">
              {{ item.total }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Monitoring -->
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <h2 class="font-semibold text-gray-700 mb-4">Progress Monitoring</h2>

      <div v-if="monitoringProgress.length === 0" class="text-sm text-gray-500">
        Belum ada monitoring.
      </div>

      <div v-else class="space-y-4">
        <div v-for="item in monitoringProgress" :key="item.className">
          <div class="flex justify-between text-sm mb-1">
            <span>{{ item.className }}</span>

            <span>
              {{ item.done }}/{{ item.total }} ({{ item.percent }}%)
            </span>
          </div>

          <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 rounded-full"
              :style="{ width: `${item.percent}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { getAllPendaftaran } from "@/lib/services/pendaftaranService";
import { getMonitoringMingguan } from "@/lib/services/monitoringService";
import { getAllKelas } from "@/lib/services/kelasService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";
import { downloadLaporanKepsek } from "@/lib/services/laporanService";
import { showError } from "@/lib/utils/toast";

const loading = ref(false);

const tahunAjaranList = ref([]);
const filterTahunAjaranId = ref("");

const pendaftaranList = ref([]);
const monitoringList = ref([]);
const kelasList = ref([]);

const buildQuery = (params) => {
  return `?${new URLSearchParams(params).toString()}`;
};

const countBy = (field, value) => {
  return pendaftaranList.value.filter((item) => item[field] === value).length;
};

const summaryCards = computed(() => [
  {
    title: "Total Pendaftar",
    value: pendaftaranList.value.length,
    description: "Jumlah seluruh pendaftar",
  },
  {
    title: "Diterima",
    value: countBy("status", "accepted"),
    description: "Pendaftar diterima",
  },
  {
    title: "Observasi",
    value: pendaftaranList.value.filter(
      (item) => item.status_observasi === "hadir",
    ).length,
    description: "Peserta observasi hadir",
  },
  {
    title: "Monitoring",
    value: monitoringList.value.length,
    description: "Monitoring mingguan",
  },
]);

const pendaftaranStats = computed(() => [
  {
    label: "Draft",
    total: countBy("status", "draft"),
  },
  {
    label: "Pending",
    total: countBy("status", "pending"),
  },
  {
    label: "Verified",
    total: countBy("status", "verified"),
  },
  {
    label: "Accepted",
    total: countBy("status", "accepted"),
  },
  {
    label: "Rejected",
    total: countBy("status", "rejected"),
  },
]);

const observasiStats = computed(() => [
  {
    label: "Belum Dijadwalkan",
    total: pendaftaranList.value.filter(
      (item) => item.status_observasi === "belum",
    ).length,
  },
  {
    label: "Terjadwal",
    total: pendaftaranList.value.filter(
      (item) => item.status_observasi === "terjadwal",
    ).length,
  },
  {
    label: "Hadir",
    total: pendaftaranList.value.filter(
      (item) => item.status_observasi === "hadir",
    ).length,
  },
  {
    label: "Tidak Hadir",
    total: pendaftaranList.value.filter(
      (item) => item.status_observasi === "tidak_hadir",
    ).length,
  },
]);

const monitoringProgress = computed(() => {
  return kelasList.value
    .map((kelas) => {
      const monitoringKelas = monitoringList.value.filter(
        (item) => Number(item.kelas?.id) === Number(kelas.id),
      );

      const total = monitoringKelas.reduce(
        (sum, item) => sum + (item.total_siswa || 0),
        0,
      );

      const done = monitoringKelas.reduce(
        (sum, item) => sum + (item.total_selesai || 0),
        0,
      );

      const percent = total > 0 ? Math.round((done / total) * 100) : 0;

      return {
        className:
          kelas.jenjang === "kb"
            ? kelas.nama
            : `${kelas.jenjang?.toUpperCase()}-${kelas.kelompok?.toUpperCase()} ${kelas.nama}`,
        done,
        total,
        percent,
      };
    })
    .filter((item) => item.total > 0);
});

const handleDownloadLaporan = async () => {
  try {
    await downloadLaporanKepsek(filterTahunAjaranId.value);
  } catch (err) {
    showError(err.message || "Gagal download laporan");
  }
};
const loadData = async () => {
  loading.value = true;

  try {
    if (tahunAjaranList.value.length === 0) {
      const tahunRes = await getAllTahunAjaran();

      tahunAjaranList.value = tahunRes.data || [];

      const aktif = tahunAjaranList.value.find((item) => item.is_active);

      filterTahunAjaranId.value = aktif?.id;
    }

    const [pendaftaranRes, monitoringRes, kelasRes] = await Promise.all([
      getAllPendaftaran(
        buildQuery({
          page: 1,
          per_page: 100,
          tahun_ajaran_id: filterTahunAjaranId.value,
        }),
      ),
      getMonitoringMingguan({
        page: 1,
        per_page: 100,
        tahun_ajaran_id: filterTahunAjaranId.value,
      }),
      getAllKelas(),
    ]);

    pendaftaranList.value = pendaftaranRes.data || [];
    monitoringList.value = monitoringRes.data || [];

    kelasList.value = (kelasRes.data || []).filter(
      (item) =>
        Number(item.tahun_ajaran_id) === Number(filterTahunAjaranId.value),
    );
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>
