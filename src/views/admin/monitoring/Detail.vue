<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">
        Detail Monitoring
      </h1>

      <nav class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink
          :to="{ name: 'AdminMonitoring' }"
          class="hover:text-slate-700"
        >
          Monitoring Mingguan
        </RouterLink>

        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />

        <span class="text-slate-700 font-medium">Detail</span>
      </nav>
    </div>

    <div class="bg-white border border-gray-200 rounded-2xl p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            Minggu {{ detail?.minggu }} - {{ detail?.topik }}
          </h1>

          <p class="text-xl font-medium text-gray-700 mt-1">
            {{ detail?.sub_topik }}
          </p>

          <div class="mt-3 space-y-3">
            <div class="flex items-center gap-2">
              <p
                class="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md"
              >
                {{ formatKelas(detail?.kelas) }}
              </p>
              <p
                class="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md"
              >
                {{ detail?.tahun_ajaran?.label }}
              </p>
              <p>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md"
                >
                  Semester {{ detail?.semester }}
                </span>
              </p>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Tanggal:
              {{ formatTanggal(detail?.tanggal_mulai) }} -
              {{ formatTanggal(detail?.tanggal_selesai) }}
            </p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-2xl font-bold text-blue-600">
            {{ totalSelesai }}/{{ totalSiswa }}
          </p>
          <p class="text-xs text-gray-500">Monitoring Siswa</p>
        </div>
      </div>

      <div class="mt-5">
        <div class="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progress Pengisian</span>
          <span>{{ progress }}%</span>
        </div>

        <div class="w-full h-2 bg-gray-100 rounded-full">
          <div
            class="h-2 bg-blue-500 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <section class="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 class="font-semibold text-gray-900 mb-4">
        Tujuan Pembelajaran & KKTP
      </h2>

      <div class="overflow-x-auto">
        <table
          class="min-w-[1000px] w-full text-sm border border-gray-300 border-collapse"
        >
          <thead>
            <tr class="bg-gray-50">
              <th
                class="border border-gray-300 px-4 py-3 text-center w-16 text-gray-800 font-semibold"
              >
                No
              </th>

              <th
                class="border border-gray-300 px-4 py-3 text-left w-1/4 text-gray-800 font-semibold"
              >
                Elemen
              </th>

              <th
                class="border border-gray-300 px-4 py-3 text-left w-1/3 text-gray-800 font-semibold"
              >
                Tujuan Pembelajaran
              </th>

              <th
                class="border border-gray-300 px-4 py-3 text-left text-gray-800 font-semibold"
              >
                Kriteria Ketercapaian Tujuan Pembelajaran
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(tp, index) in detail?.tp || []"
              :key="tp.id"
              class="text-gray-700"
            >
              <td class="border border-gray-300 px-4 py-4 text-center">
                {{ index + 1 }}.
              </td>

              <td class="border border-gray-300 px-4 py-4">
                {{ formatElemen(tp.elemen) }}
              </td>

              <td class="border border-gray-300 px-4 py-4">
                {{ tp.tujuan }}
              </td>

              <td class="border border-gray-300 px-4 py-4">
                <ul class="list-disc pl-5 space-y-1">
                  <li v-for="kktp in tp.kktp" :key="kktp.id" class="">
                    {{ kktp.deskripsi }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="mt-4 grid md:grid-cols-2 gap-4">
      <section class="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 class="font-semibold text-gray-900 mb-4">Kegiatan</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="item in detail?.kegiatan || []" :key="item.id" class="">
            <p class="font-medium text-gray-800">{{ item.nama }}</p>
            <p class="text-sm text-gray-500 mt-1">
              Media: {{ item.media || "-" }}
            </p>
          </div>
        </div>
      </section>

      <section
        v-if="detail?.asesmen_awal"
        class="bg-white border border-gray-200 rounded-2xl p-6"
      >
        <h2 class="font-semibold text-gray-900 mb-4">Asesmen Awal</h2>

        <div class="space-y-3 text-sm">
          <p>
            <span class="font-medium text-gray-700">Teknik:</span>
            {{ detail.asesmen_awal.teknik }}
          </p>

          <p>
            <span class="font-medium text-gray-700">Rancangan Kegiatan:</span>
            {{ detail.asesmen_awal.rancangan_kegiatan }}
          </p>

          <p>
            <span class="font-medium text-gray-700">Hasil:</span>
            {{ detail.asesmen_awal.hasil || "-" }}
          </p>
        </div>
      </section>
    </div>

    <section class="bg-white border border-gray-200 rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-gray-900">Daftar Siswa</h2>

        <button
          v-if="canPublish"
          @click="handlePublish"
          class="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
        >
          Publish Monitoring
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-500">
            <tr>
              <th class="px-4 py-3">No</th>
              <th class="px-4 py-3">Nama</th>
              <th class="px-4 py-3">NISN</th>
              <th class="px-4 py-3">Jenis Kelamin</th>
              <th class="px-4 py-3">Kelas</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in siswaStatusList"
              :key="item.siswa_kelas_id"
              class="border-b border-gray-100"
            >
              <td class="px-4 py-3">{{ index + 1 }}</td>

              <td class="px-4 py-3 font-medium text-gray-700">
                {{ item.nama }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-700">
                {{ item.nisn }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-700">
                {{ item.jenis_kelamin }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-700">
                {{ item.kelas }}
              </td>

              <td class="px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs"
                  :class="
                    item.sudah_diisi
                      ? 'bg-green-50 text-green-600'
                      : 'bg-amber-50 text-amber-600'
                  "
                >
                  {{ item.sudah_diisi ? "Sudah Diisi" : "Belum Diisi" }}
                </span>
              </td>

              <td class="px-4 py-3">
                <router-link
                  :to="{
                    name: 'AdminMonitoringSiswaCreate',
                    query: {
                      monitoring_mingguan_id: detail.id,
                      siswa_kelas_id: item.siswa_kelas_id,
                      kelas_id: detail.kelas.id,
                      nama: item.nama,
                    },
                  }"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {{ item.sudah_diisi ? "Lihat" : "Isi Monitoring" }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ChevronRight } from "lucide-vue-next";

import {
  getMonitoringMingguanById,
  getMonitoringSiswa,
  publishMonitoringMingguan,
} from "@/lib/services/monitoringService";
import { getKelasById } from "@/lib/services/kelasService";
import { showError, showSuccess } from "@/lib/utils/toast";

const route = useRoute();

const detail = ref(null);
const kelasDetail = ref(null);
const monitoringSiswaList = ref([]);

const totalSiswa = computed(() => siswaStatusList.value.length);
const totalSelesai = computed(() => {
  return siswaStatusList.value.filter((item) => item.sudah_diisi).length;
});

const progress = computed(() => {
  if (!totalSiswa.value) return 0;
  return Math.round((totalSelesai.value / totalSiswa.value) * 100);
});

const canPublish = computed(() => {
  return (
    detail.value?.status === "draft" &&
    totalSiswa.value > 0 &&
    totalSiswa.value === totalSelesai.value
  );
});

const siswaStatusList = computed(() => {
  const siswaKelas = kelasDetail.value?.siswa_kelas || [];

  console.log(JSON.parse(JSON.stringify(siswaKelas)));
  return siswaKelas
    .filter((item) => item.status === "aktif")
    .map((item) => {
      const monitoring = monitoringSiswaList.value.find((mon) => {
        const siswaKelasId = mon.siswa_kelas_id || mon.siswa_kelas?.id;

        return Number(siswaKelasId) === Number(item.id);
      });

      return {
        siswa_kelas_id: item.id,
        nama:
          item.siswa?.nama_lengkap || item.siswa?.peserta?.nama_lengkap || "-",
        nisn: item.siswa?.nisn || item.siswa?.peserta?.nisn || "-",
        jenis_kelamin:
          item.siswa?.jenis_kelamin ||
          item.siswa?.peserta?.jenis_kelamin ||
          "-",
        kelas: formatKelas(item.kelas),
        sudah_diisi: !!monitoring,
        monitoring_siswa_id: monitoring?.id || null,
      };
    });
});

const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(tanggal));
};

const formatKelas = (kelas) => {
  if (!kelas) return "-";

  const jenjang = kelas.jenjang ? kelas.jenjang.toUpperCase() : "";
  const kelompok = kelas.kelompok ? kelas.kelompok.toUpperCase() : "";
  const nama = kelas.nama || "";

  if (kelas.jenjang === "kb") return nama;
  if (kelompok && nama) return `${jenjang}-${kelompok} ${nama}`;
  if (kelompok) return `${jenjang}-${kelompok}`;

  return nama || jenjang || "-";
};

const formatElemen = (elemen) => {
  const map = {
    kesyuhadaan: "Kesyuhadaan",
    nabp: "Nilai Agama & Budi Pekerti",
    jd: "Jati Diri",
    ddlmstrs: "Literasi & STEM",
  };

  return map[elemen] || elemen;
};

const loadData = async () => {
  try {
    const id = route.params.id;

    const detailRes = await getMonitoringMingguanById(id);
    detail.value = detailRes.data;

    const kelasRes = await getKelasById(detail.value.kelas.id);
    kelasDetail.value = kelasRes.data;

    const monitoringSiswaRes = await getMonitoringSiswa({
      monitoring_mingguan_id: detail.value.id,
      page: 1,
      per_page: 100,
    });

    monitoringSiswaList.value = monitoringSiswaRes.data || [];
  } catch (error) {
    showError(error.message || "Gagal mengambil detail monitoring");
  }
};

const handlePublish = async () => {
  try {
    const res = await publishMonitoringMingguan(detail.value.id);

    showSuccess(res.message || "Monitoring berhasil dipublish");

    await loadData();
  } catch (error) {
    showError(error.message || "Gagal publish monitoring");
  }
};

onMounted(loadData);
</script>
