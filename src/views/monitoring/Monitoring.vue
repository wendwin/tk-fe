<template>
  <div
    class="max-w-7xl mx-auto p-4 lg:px-10 bg-gray-50 min-h-screen font-sans pt-20"
  >
    <nav
      class="flex items-center justify-end gap-2 text-[13px] font-medium text-gray-400 mb-4 px-2"
    >
      <router-link
        :to="{ name: 'HomePortal' }"
        class="hover:text-green-600 transition flex items-center gap-1"
      >
        <span><House class="w-4 h-4" /></span> Portal
      </router-link>
      <span>/</span>
      <router-link
        :to="{ name: 'Monitoring' }"
        class="text-gray-600 font-semibold"
      >
        Jurnal Mingguan
      </router-link>
    </nav>
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">
        Jurnal Perkembangan Ananda
      </h1>
      <p class="text-sm text-gray-500 mt-1">
        Silakan pilih pekan pembelajaran untuk melihat laporan perkembangan
      </p>
    </header>

    <div v-if="anakList.length > 1" class="mb-8">
      <p class="text-sm font-semibold text-gray-700 mb-3">Pilih Anak</p>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="anak in anakList"
          :key="anak.id"
          type="button"
          @click="selectedSiswaId = anak.id"
          class="px-4 py-2 rounded-lg text-sm font-medium border transition"
          :class="
            selectedSiswaId === anak.id
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50'
          "
        >
          {{ anak.nama_lengkap || anak.nama_panggilan || "Ananda" }}
        </button>
      </div>
    </div>

    <div
      v-if="!loading && historiMonitoring.length === 0"
      class="flex items-center justify-center min-h-[50vh]"
    >
      <div class="max-w-2xl w-full p-8 text-center">
        <img
          src="@/assets/images/guru-asesmen.png"
          alt="Belum ada jurnal"
          class="w-48 mx-auto mb-6"
          draggable="false"
        />

        <h3 class="text-xl font-bold text-gray-800">
          Belum Ada Catatan Perkembangan
        </h3>

        <p class="mt-3 text-sm leading-relaxed text-gray-500">
          Catatan perkembangan, dokumentasi kegiatan, dan hasil pembelajaran
          Ananda akan muncul di sini setelah guru menyelesaikan serta
          mempublikasikan jurnal mingguan
        </p>

        <!-- <div
          class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium animate-pulse"
        >
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          Menunggu publikasi jurnal
        </div> -->
      </div>
    </div>

    <p v-if="loading" class="text-center text-gray-500 mt-10">
      <span class="animate-pulse text-gray-500">Memuat jurnal...</span>
    </p>

    <div v-for="grup in historiMonitoring" :key="grup.bulan" class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-lg font-bold text-gray-700 whitespace-nowrap">
          {{ grup.bulan }}
        </h2>
        <div class="w-full h-[1px] bg-gray-200"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div
          v-for="pekan in grup.mingguList"
          :key="pekan.id"
          @click="lihatDetail(pekan.id)"
          class="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:border-green-100 transition duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div
              class="relative h-24 w-full overflow-hidden bg-gradient-to-br"
              :class="weekCoverStyle(pekan.minggu).gradient"
            >
              <div class="absolute inset-0 opacity-15">
                <div
                  class="absolute bg-white"
                  :class="weekCoverStyle(pekan.minggu).shape1"
                />
                <div
                  class="absolute bg-white"
                  :class="weekCoverStyle(pekan.minggu).shape2"
                />
              </div>

              <div
                class="absolute right-4 bottom-2 text-4xl opacity-25 select-none"
              >
                {{ weekCoverStyle(pekan.minggu).icon }}
              </div>

              <div
                class="relative h-full p-4 text-white flex flex-col justify-between"
              >
                <div class="flex justify-between items-start">
                  <span
                    class="px-2 py-1 rounded-md bg-white/20 text-sm capitalize"
                  >
                    Minggu {{ pekan.minggu }}
                  </span>

                  <span
                    class="px-2 py-1 rounded-md bg-white/20 text-sm capitalize"
                  >
                    Semester {{ pekan.semester }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4 group-hover:bg-slate-50 transition">
              <span
                class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block"
                >Tema
              </span>
              <h3
                class="text-base font-semibold text-gray-600 line-clamp-1 transition capitalize"
              >
                {{ pekan.topik }}
              </h3>
              <p class="text-sm text-gray-500 mt-0.5 truncate capitalize">
                Sub: {{ pekan.subTopik }}
              </p>

              <div
                class="text-sm flex items-center justify-between text-gray-400 border-t border-gray-50 mt-2"
              >
                <span>{{ pekan.rentangTanggal }}</span>
                <!-- <span>{{ pekan.waliKelas }}</span> -->
              </div>
            </div>
          </div>

          <!-- <div class="px-4 pb-4 pt-1">
            <div
              class="bg-gray-50 rounded-xl p-2 flex items-center justify-between gap-3"
            >
              <div class="flex-1">
                <div
                  class="flex justify-between text-[11px] font-semibold text-gray-500 mb-1"
                >
                  <span>Perkembangan Terpantau</span>
                  <span
                    >{{ pekan.indikatorMuncul }}/{{
                      pekan.totalIndikator
                    }}
                    Indikator</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden"
                >
                  <div
                    class="bg-green-500 h-full rounded-full transition-all duration-500"
                    :style="{
                      width: `${(pekan.indikatorMuncul / pekan.totalIndikator) * 100}%`,
                    }"
                  ></div>
                </div>
              </div>

              <span
                class="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-xs text-gray-400 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition"
              >
                →
              </span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { House } from "lucide-vue-next";
import { getPortalMonitoring } from "@/lib/services/portalMonitoringService";
import { showError } from "@/lib/utils/toast";

const router = useRouter();

const loading = ref(false);
const monitoringList = ref([]);
const selectedSiswaId = ref(null);

const formatTanggal = (tanggalMulai, tanggalSelesai) => {
  const mulai = new Date(tanggalMulai);
  const selesai = new Date(tanggalSelesai);

  const mulaiText = mulai.toLocaleDateString("id-ID", {
    day: "2-digit",
  });

  const selesaiText = selesai.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${mulaiText} - ${selesaiText}`;
};

const formatBulan = (tanggal) => {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

const weekCoverStyle = (minggu) => {
  const map = {
    1: {
      gradient: "from-blue-500 to-cyan-500",
      shape1: "w-24 h-24 -right-6 -top-6 rounded-full",
      shape2: "w-16 h-16 -left-4 -bottom-4 rounded-full",
    },
    2: {
      gradient: "from-green-500 to-emerald-500",
      shape1: "w-28 h-14 -right-8 top-4 rounded-full rotate-12",
      shape2: "w-20 h-20 -left-8 -bottom-8 rounded-3xl rotate-12",
    },
    3: {
      gradient: "from-amber-500 to-orange-500",
      shape1: "w-20 h-20 right-4 -top-8 rounded-2xl rotate-45",
      shape2: "w-24 h-12 -left-6 bottom-3 rounded-full -rotate-12",
    },
    4: {
      gradient: "from-purple-500 to-fuchsia-500",
      shape1: "w-24 h-24 -right-8 -bottom-8 rounded-full",
      shape2: "w-16 h-16 left-4 -top-6 rounded-2xl rotate-45",
    },
  };

  return (
    map[String(minggu)] || {
      gradient: "from-slate-500 to-slate-600",
      shape1: "w-24 h-24 -right-6 -top-6 rounded-full",
      shape2: "w-16 h-16 -left-4 -bottom-4 rounded-full",
    }
  );
};

const anakList = computed(() => {
  const map = {};

  monitoringList.value.forEach((item) => {
    const siswa = item.siswa_kelas?.siswa;

    if (!siswa) return;

    map[siswa.id] = {
      id: siswa.id,
      nama_lengkap: siswa.nama_lengkap,
      nama_panggilan: siswa.nama_panggilan,
    };
  });

  return Object.values(map);
});

const filteredMonitoringList = computed(() => {
  if (!selectedSiswaId.value) return monitoringList.value;

  return monitoringList.value.filter((item) => {
    return item.siswa_kelas?.siswa?.id === selectedSiswaId.value;
  });
});

const historiMonitoring = computed(() => {
  const groups = {};

  filteredMonitoringList.value.forEach((item) => {
    const mingguan = item.monitoring_mingguan;
    const bulan = formatBulan(mingguan.tanggal_mulai);

    if (!groups[bulan]) {
      groups[bulan] = {
        bulan,
        mingguList: [],
      };
    }

    groups[bulan].mingguList.push({
      id: item.id,
      minggu: mingguan.minggu,
      semester: mingguan.semester,
      topik: mingguan.topik,
      subTopik: mingguan.sub_topik,
      rentangTanggal: formatTanggal(
        mingguan.tanggal_mulai,
        mingguan.tanggal_selesai,
      ),
    });
  });

  return Object.values(groups);
});

const loadMonitoring = async () => {
  try {
    loading.value = true;

    const res = await getPortalMonitoring({
      page: 1,
      per_page: 50,
    });

    monitoringList.value = res.data || [];

    if (!selectedSiswaId.value && anakList.value.length > 0) {
      selectedSiswaId.value = anakList.value[0].id;
    }
  } catch (error) {
    showError(error.message || "Gagal mengambil monitoring");
  } finally {
    loading.value = false;
  }
};

const lihatDetail = (monitoringSiswaId) => {
  router.push({
    name: "MonitoringDetail",
    params: { id: monitoringSiswaId },
  });
};

onMounted(loadMonitoring);
</script>
