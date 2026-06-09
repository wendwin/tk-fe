<template>
  <div>
    <h1 class="text-lg font-semibold text-gray-700 mb-4">Dashboard</h1>
    <!-- <p class="text-sm text-gray-500">
      Ringkasan data pendaftaran, observasi, dan monitoring siswa.
    </p> -->
  </div>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="item in summaryCards"
        :key="item.title"
        class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ item.title }}</p>
            <h2 class="text-2xl font-medium text-gray-700 mt-2">
              {{ loading ? "..." : item.value }}
            </h2>
          </div>

          <div
            class="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center"
          >
            <component :is="item.icon" class="w-5 h-5" />
          </div>
        </div>

        <!-- <p class="text-[13px] text-gray-500 mt-4">
          {{ item.description }}
        </p> -->
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div class="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5"
        >
          <div>
            <h2 class="font-semibold text-gray-700">Statistik Pendaftaran</h2>

            <p class="text-sm text-gray-500">
              Jumlah pendaftar KB dan TK per bulan
            </p>
          </div>

          <select
            v-model="filterTahunAjaranId"
            @change="loadDashboard"
            class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
          >
            <option
              v-for="tahun in tahunAjaranList"
              :key="tahun.id"
              :value="tahun.id"
            >
              {{ tahun.label }}
            </option>
          </select>
        </div>

        <div
          v-if="registrationStats.length === 0"
          class="h-72 flex items-center justify-center text-sm text-gray-500"
        >
          Belum ada data pendaftaran.
        </div>

        <div v-else class="h-72">
          <Bar
            :data="registrationChartData"
            :options="registrationChartOptions"
          />
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div class="px-5 py-3 border-b border-gray-200">
          <h2 class="font-semibold text-gray-700">Status Pendaftaran</h2>
        </div>

        <div class="px-5 py-1">
          <div
            v-for="item in statusStats"
            :key="item.label"
            class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600">
              {{ item.label }}
            </span>

            <span class="font-sm text-gray-600">
              {{ item.total }}
            </span>
          </div>
        </div>

        <div class="border-t border-gray-200">
          <div class="px-5 py-3 border-b border-gray-200">
            <h3 class="font-semibold text-gray-700">Jadwal Observasi</h3>
          </div>

          <div class="px-5 py-5">
            <div
              v-if="observasiSummary.total === 0"
              class="text-sm text-gray-500"
            >
              Belum ada jadwal observasi terbaru.
            </div>

            <div v-else class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">KB</span>
                <span class="text-sm text-gray-600">
                  {{ observasiSummary.kb }} Peserta
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">TK</span>
                <span class="text-sm text-gray-600">
                  {{ observasiSummary.tk }} Peserta
                </span>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-100 pt-3"
              >
                <span class="text-sm text-gray-600">Total</span>
                <span class="text-sm text-gray-600">
                  {{ observasiSummary.total }} Peserta
                </span>
              </div>

              <div
                v-if="observasiSummary.nearestDate"
                class="flex items-center justify-between border-t border-gray-100 pt-3"
              >
                <span class="text-sm text-gray-600">Tanggal</span>

                <span class="text-sm text-gray-600">
                  {{
                    formatDateTimeID(observasiSummary.nearestDate, {
                      withTime: false,
                    })
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div class="bg-white border border-gray-200 rounded-xl p-5">
        <h2 class="font-semibold text-gray-700 mb-4">Pendaftaran Terbaru</h2>

        <div
          v-if="latestPendaftaran.length === 0"
          class="text-sm text-gray-500"
        >
          Belum ada data pendaftaran.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="item in latestPendaftaran"
            :key="item.id"
            class="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-700">
                {{ getNamaSiswa(item) }}
              </p>
              <p class="text-xs text-gray-500">
                {{ item.jenis?.toUpperCase() }} - {{ item.program }}
              </p>
            </div>

            <span
              class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize"
            >
              {{ item.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-5">
        <h2 class="font-semibold text-gray-700 mb-4">Progress Monitoring</h2>

        <div
          v-if="monitoringProgress.length === 0"
          class="text-sm text-gray-500"
        >
          Belum ada monitoring mingguan.
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in monitoringProgress" :key="item.className">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">{{ item.className }}</span>
              <span class="font-medium text-gray-700">
                {{ item.done }}/{{ item.total }}
              </span>
            </div>

            <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-emerald-500 rounded-full"
                :style="{ width: `${(item.done / item.total) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  Users,
  ClipboardCheck,
  CalendarClock,
  GraduationCap,
  School,
} from "lucide-vue-next";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

import { getAllPendaftaran } from "@/lib/services/pendaftaranService";
import { getAllKelas } from "@/lib/services/kelasService";
import { getMonitoringMingguan } from "@/lib/services/monitoringService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";
import { formatDateTimeID } from "@/lib/utils/formatDateTimeID";

const loading = ref(false);

const pendaftaranList = ref([]);
const kelasList = ref([]);
const monitoringList = ref([]);
const tahunAjaranAktif = ref(null);
const tahunAjaranList = ref([]);
const filterTahunAjaranId = ref("");

const buildQuery = (params) => {
  return `?${new URLSearchParams(params).toString()}`;
};

const getNamaSiswa = (item) => {
  return item.peserta?.nama_lengkap || item.nama_lengkap || "-";
};

const countBy = (field, value) => {
  return pendaftaranList.value.filter((item) => item[field] === value).length;
};

const summaryCards = computed(() => [
  {
    title: "Total Pendaftar",
    value: pendaftaranList.value.length,
    description: "Total pendaftar",
    icon: Users,
  },
  {
    title: "Siswa Aktif",
    value: countBy("status", "accepted"),
    description: "Siswa diterima",
    icon: GraduationCap,
  },
  {
    title: "Total Kelas",
    value: kelasList.value.length,
    description: "Jumlah kelas ",
    icon: School,
  },
  {
    title: "Total Monitoring",
    value: monitoringList.value.length,
    description: "Monitoring mingguan",
    icon: ClipboardCheck,
  },
]);

const monthLabels = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const registrationStats = computed(() => {
  const counts = Array.from({ length: 12 }, (_, index) => ({
    month: monthLabels[index],
    kb: 0,
    tk: 0,
    total: 0,
  }));

  pendaftaranList.value.forEach((item) => {
    const date = new Date(item.tanggal_daftar || item.created_at);

    if (isNaN(date)) return;

    const monthIndex = date.getMonth();
    const jenis = item.jenis?.toLowerCase();

    if (jenis === "kb") {
      counts[monthIndex].kb++;
    }

    if (jenis === "tk") {
      counts[monthIndex].tk++;
    }

    counts[monthIndex].total++;
  });

  return counts.filter((item) => item.total > 0);
});

const registrationChartData = computed(() => ({
  labels: registrationStats.value.map((item) => item.month),
  datasets: [
    {
      label: "KB",
      data: registrationStats.value.map((item) => item.kb),
      backgroundColor: "#3b82f6",
      borderRadius: 6,
    },
    {
      label: "TK",
      data: registrationStats.value.map((item) => item.tk),
      backgroundColor: "#10b981",
      borderRadius: 6,
    },
  ],
}));

const registrationChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw} pendaftar`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
};

const statusStats = computed(() => [
  { label: "Draft", total: countBy("status", "draft") },
  { label: "Pending", total: countBy("status", "pending") },
  { label: "Verified", total: countBy("status", "verified") },
  { label: "Accepted", total: countBy("status", "accepted") },
  { label: "Rejected", total: countBy("status", "rejected") },
]);

const observasiSummary = computed(() => {
  const terjadwal = pendaftaranList.value.filter(
    (item) => item.status_observasi === "terjadwal",
  );

  return {
    kb: terjadwal.filter((item) => item.jenis === "kb").length,
    tk: terjadwal.filter((item) => item.jenis === "tk").length,
    total: terjadwal.length,
    nearestDate:
      terjadwal
        .filter((item) => item.observasi_at)
        .sort((a, b) => new Date(a.observasi_at) - new Date(b.observasi_at))[0]
        ?.observasi_at || null,
  };
});

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

      return {
        className:
          kelas.jenjang === "kb"
            ? kelas.nama
            : `${kelas.jenjang?.toUpperCase()}-${kelas.kelompok?.toUpperCase()} ${kelas.nama}`,
        done,
        total,
      };
    })
    .filter((item) => item.total > 0);
});

const latestPendaftaran = computed(() => {
  return pendaftaranList.value.slice(0, 5);
});

const loadDashboard = async () => {
  try {
    loading.value = true;

    if (tahunAjaranList.value.length === 0) {
      const tahunRes = await getAllTahunAjaran();

      tahunAjaranList.value = tahunRes.data || [];
      tahunAjaranAktif.value = tahunAjaranList.value.find(
        (item) => item.is_active,
      );

      if (!filterTahunAjaranId.value) {
        filterTahunAjaranId.value =
          tahunAjaranAktif.value?.id || tahunAjaranList.value[0]?.id || "";
      }
    }

    const tahunAjaranId = filterTahunAjaranId.value;

    const [pendaftaranRes, kelasRes, monitoringRes] = await Promise.all([
      getAllPendaftaran(
        buildQuery({
          page: 1,
          per_page: 100,
          tahun_ajaran_id: tahunAjaranId,
        }),
      ),
      getAllKelas(),
      getMonitoringMingguan({
        page: 1,
        per_page: 100,
        tahun_ajaran_id: tahunAjaranId,
      }),
    ]);

    pendaftaranList.value = pendaftaranRes.data || [];
    kelasList.value = (kelasRes.data || []).filter(
      (item) => Number(item.tahun_ajaran_id) === Number(tahunAjaranId),
    );
    monitoringList.value = monitoringRes.data || [];
  } finally {
    loading.value = false;
  }
};

onMounted(loadDashboard);
</script>
