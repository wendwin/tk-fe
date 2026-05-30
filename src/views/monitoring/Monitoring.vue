<template>
  <div class="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen font-sans mt-16">
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
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md hover:border-green-100 transition duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div class="relative h-32 w-full bg-gray-100 overflow-hidden">
              <img
                :src="pekan.sampul"
                :alt="pekan.topik"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute top-3 left-3 flex gap-1.5">
                <span
                  class="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md uppercase tracking-wider"
                >
                  Minggu {{ pekan.minggu }}
                </span>
                <span
                  class="px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-md uppercase tracking-wider"
                >
                  Semester {{ pekan.semester }}
                </span>
              </div>
            </div>

            <div class="p-4">
              <span
                class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block"
                >Tema Utama</span
              >
              <h3
                class="text-base font-semibold text-gray-600 line-clamp-1 group-hover:text-green-600 transition"
              >
                {{ pekan.topik }}
              </h3>
              <p class="text-sm text-gray-500 mt-0.5 truncate">
                Sub:{{ pekan.subTopik }}
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { House } from "lucide-vue-next";

const router = useRouter();

// Emit fungsi untuk navigasi ke halaman detail saat card diklik
const emit = defineEmits(["pilih-minggu"]);

// Simulasi data historis pemantauan anak berdasarkan bulan dan minggu
const historiMonitoring = ref([
  {
    bulan: "Januari 2026",
    mingguList: [
      {
        id: "s2-m4",
        minggu: 1,
        semester: 2,
        topik: "Makanan Sehat dan Halal",
        subTopik: "Sayur dan Lauk Pauk",
        rentangTanggal: "26 - 30 Januari 2026",
        waliKelas: "Suciati, S.Pd",
        totalIndikator: 9,
        indikatorMuncul: 6, // Untuk progress singkat di card
        sampul:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      },
      {
        id: "s2-m3",
        minggu: 2,
        semester: 2,
        topik: "Rumahku Syurgaku",
        subTopik: "Bagian-Bagian Rumah",
        rentangTanggal: "19 - 23 Januari 2026",
        waliKelas: "Suciati, S.Pd",
        totalIndikator: 8,
        indikatorMuncul: 8,
        sampul:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
      },
      {
        id: "s2-m3",
        minggu: 3,
        semester: 2,
        topik: "Rumahku Syurgaku",
        subTopik: "Bagian-Bagian Rumah",
        rentangTanggal: "19 - 23 Januari 2026",
        waliKelas: "Suciati, S.Pd",
        totalIndikator: 8,
        indikatorMuncul: 8,
        sampul:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
      },
      {
        id: "s2-m3",
        minggu: 4,
        semester: 2,
        topik: "Rumahku Syurgaku",
        subTopik: "Bagian-Bagian Rumah",
        rentangTanggal: "19 - 23 Januari 2026",
        waliKelas: "Suciati, S.Pd",
        totalIndikator: 8,
        indikatorMuncul: 8,
        sampul:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
      },
    ],
  },
  {
    bulan: "Februari 2026",
    mingguList: [
      {
        id: "s2-m5",
        minggu: 1,
        semester: 2,
        topik: "Profesi Sekitarku",
        subTopik: "Petani yang Berjasa",
        rentangTanggal: "02 - 06 Februari 2026",
        waliKelas: "Suciati, S.Pd",
        totalIndikator: 10,
        indikatorMuncul: 4,
        sampul:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
      },
    ],
  },
]);

const lihatDetail = (mingguId) => {
  // Logic untuk pindah halaman atau emit event ke parent component
  console.log("Membuka detail untuk minggu ID:", mingguId);
  emit("pilih-minggu", mingguId);

  router.push({
    name: "MonitoringDetail",
    params: { id: mingguId },
  });
};
</script>
