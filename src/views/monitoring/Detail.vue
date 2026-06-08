<template>
  <div
    class="max-w-7xl mx-auto p-4 md:py-4 md:px-8 bg-gray-50 min-h-screen font-sans mt-16"
  >
    <div
      v-if="!detail"
      class="bg-white rounded-2xl p-6 text-center text-gray-500 mt-10"
    >
      Memuat detail monitoring...
    </div>

    <div v-else>
      <nav
        class="flex items-center justify-end gap-2 text-[13px] font-medium text-gray-400 mb-4 px-2"
      >
        <router-link
          :to="{ name: 'HomePortal' }"
          class="hover:text-green-600 transition flex items-center gap-1"
        >
          <House class="w-4 h-4" /> Portal
        </router-link>

        <span>/</span>

        <router-link
          :to="{ name: 'Monitoring' }"
          class="hover:text-green-600 transition"
        >
          Jurnal Mingguan
        </router-link>

        <span>/</span>

        <span class="text-gray-600 font-semibold">
          Detail Pekan {{ mingguan.minggu }}
        </span>
      </nav>

      <header
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <span
          class="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider"
        >
          Semester {{ mingguan.semester }} - Minggu {{ mingguan.minggu }}
        </span>

        <h1 class="text-2xl font-semibold text-gray-800 mt-2">
          Tema: {{ mingguan.topik }}
        </h1>
        <h1 class="text-lg font-medium text-gray-700 mt-1">
          Sub: {{ mingguan.sub_topik }}
        </h1>

        <p class="text-gray-500 text-sm mt-1">
          <span class="italic text-gray-400">{{ rentangTanggal }}</span>
        </p>

        <p class="text-sm text-gray-500 mt-3">
          Nama:
          <span class="font-medium text-gray-700">
            {{ siswa.nama_lengkap || "-" }}
          </span>
        </p>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-base font-semibold text-gray-800 mb-3">
            Tujuan Pembelajaran
          </h2>

          <ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li v-for="tp in mingguan.tp || []" :key="tp.id">
              {{ tp.tujuan }}
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-base font-semibold text-gray-800 mb-3">
            Kegiatan Pekan Ini
          </h2>

          <div class="grid grid-cols-1 gap-2">
            <div
              v-for="item in mingguan.kegiatan || []"
              :key="item.id"
              class="p-2.5 bg-gray-100 rounded-lg border border-gray-100"
            >
              <p class="text-sm font-medium text-gray-800">
                {{ item.nama }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          <!-- <section
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Grafik Capaian Perkembangan Ananda
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                v-for="(elemen, key) in masterElemen"
                :key="key"
                class="flex flex-col items-center p-3 bg-gray-50 rounded-xl text-center"
              >
                <div class="relative w-20 h-20">
                  <svg
                    class="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      class="text-gray-200"
                      stroke-width="3"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    <path
                      :class="elemen.teksWarna"
                      stroke-width="3"
                      :stroke-dasharray="`${skorElemen[key]}, 100`"
                      stroke-linecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>

                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="text-sm font-bold text-gray-700">
                      {{ skorElemen[key] }}%
                    </span>
                  </div>
                </div>

                <span class="text-xs font-semibold text-gray-600 mt-2">
                  {{ elemen.nama }}
                </span>
              </div>
            </div>
          </section> -->

          <section
            class="bg-white rounded-2xl p-6 shadow-xs border border-gray-150"
          >
            <h2 class="text-xl font-medium text-gray-800 mb-1">
              Jurnal Capaian Pembelajaran
            </h2>

            <p class="text-sm text-gray-600 mb-6">
              Detail indikator perkembangan anak yang diamati guru.
            </p>

            <div class="space-y-6">
              <div
                v-for="(grup, key) in indikatorPerElemen"
                :key="key"
                v-show="grup.list.length > 0"
                class="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-2xs"
              >
                <div
                  class="px-4 py-3 border-b border-gray-100 flex items-center justify-between"
                  :class="grup.warna"
                >
                  <h3 class="text-xs font-bold text-white uppercase">
                    {{ grup.nama }}
                  </h3>

                  <span class="text-[11px] font-semibold text-white/90">
                    {{ grup.list.filter((i) => i.muncul).length }} /
                    {{ grup.list.length }} Tercapai
                  </span>
                </div>

                <div class="divide-y divide-gray-300">
                  <div
                    v-for="item in grup.list"
                    :key="item.id"
                    class="p-4 flex items-start gap-3 hover:bg-gray-50/40"
                  >
                    <CircleCheckBig
                      v-if="item.muncul"
                      class="w-5 h-5 shrink-0 text-green-500 mt-0.5"
                    />

                    <CircleAlert
                      v-else
                      class="w-5 h-5 shrink-0 text-amber-500 mt-0.5"
                    />

                    <div>
                      <p
                        class="text-sm font-medium"
                        :class="
                          item.muncul ? 'text-gray-800' : 'text-gray-500 italic'
                        "
                      >
                        {{ item.teks }}
                      </p>

                      <div v-if="item.tp?.kktp?.length" class="mt-2">
                        <p class="text-sm font-semibold text-gray-500 mb-2">
                          Indikator Perkembangan
                        </p>

                        <ul class="space-y-1 list-disc list-inside">
                          <li
                            v-for="kktp in item.tp.kktp"
                            :key="kktp.id"
                            class="text-sm text-gray-600"
                          >
                            {{ kktp.deskripsi }}
                          </li>
                        </ul>
                      </div>

                      <p
                        v-if="item.kejadian_teramati"
                        class="text-sm text-gray-500 mt-3"
                      >
                        <span class="font-semibold text-gray-700">
                          Hasil Pengamatan Guru:
                        </span>
                        {{ item.kejadian_teramati }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- <section
            v-if="detail.rekomendasi?.length"
            class="bg-amber-50/60 rounded-2xl p-6 border border-amber-100"
          >
            <h2 class="text-base font-semibold text-amber-900 mb-3">
              Tips Stimulasi Akhir Pekan
            </h2>

            <div class="space-y-4">
              <div
                v-for="item in detail.rekomendasi"
                :key="item.id"
                class="bg-white p-3 rounded-xl border border-amber-100/70"
              >
                <span
                  class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1"
                >
                  Fokus: {{ masterElemen[item.elemen]?.nama || item.elemen }}
                </span>

                <p class="text-sm text-gray-600">
                  {{ item.tips }}
                </p>
              </div>
            </div>
          </section> -->
        </div>

        <div class="space-y-6">
          <section class="bg-white rounded-2xl p-6 border">
            <h2 class="text-base font-semibold text-gray-800 mb-3">
              Asesmen Awal
            </h2>

            <div class="space-y-2 text-sm">
              <p class="text-gray-600">
                <strong class="text-gray-800">Metode:</strong>
                {{ mingguan.asesmen_awal?.teknik || "-" }}
              </p>

              <p class="text-gray-600">
                <strong class="text-gray-800">Rancangan Kegiatan:</strong>
                {{ mingguan.asesmen_awal?.rancangan_kegiatan || "-" }}
              </p>

              <div
                class="p-2.5 bg-white rounded-xl border border-gray-200 text-gray-700 italic"
              >
                "{{ mingguan.asesmen_awal?.hasil || "-" }}"
              </div>
            </div>
          </section>

          <section
            v-if="detail.karya?.length"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 class="text-lg font-semibold text-gray-800 mb-1">
              Dokumentasi & Analisis Karya
            </h2>

            <p class="text-sm text-gray-600 mb-4">
              Evaluasi proses belajar anak melalui hasil karya.
            </p>

            <div class="space-y-6">
              <div
                v-for="karya in detail.karya"
                :key="karya.id"
                class="rounded-xl border border-gray-100 overflow-hidden bg-gray-50/50"
              >
                <img
                  :src="fileUrl(karya.foto)"
                  :alt="karya.kegiatan"
                  class="w-full h-44 object-cover"
                />

                <div class="p-4 space-y-3">
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ karya.kegiatan }}
                    </h3>

                    <p class="text-sm text-gray-600 mt-1">
                      {{ karya.kktp?.deskripsi }}
                    </p>
                  </div>

                  <div class="text-sm">
                    <strong class="font-semibold text-gray-700">
                      Deskripsi Aktivitas:
                    </strong>

                    <p class="text-gray-500">
                      {{ karya.deskripsi }}
                    </p>
                  </div>

                  <div class="text-sm">
                    <strong class="font-semibold text-gray-700">
                      Analisis Guru:
                    </strong>

                    <p class="text-gray-500">
                      {{ karya.analisa }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            v-if="detail.anekdot?.length"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 class="text-lg font-semibold text-gray-800">
              Catatan Anekdot Terpilih
            </h2>

            <p class="text-sm text-gray-600 mb-4">
              Catatan guru mengenai kejadian atau perilaku signifikan anak.
            </p>

            <div class="space-y-3">
              <div
                v-for="anekdot in detail.anekdot"
                :key="anekdot.id"
                class="bg-purple-50/40 text-xs"
              >
                <div class="text-xs text-gray-500 font-bold uppercase mb-2">
                  {{ formatDateTime(anekdot.waktu) }}
                </div>

                <p class="text-gray-500 mb-1.5 text-sm">
                  <strong class="text-gray-700">Kriteria Capaian:</strong>
                  {{ anekdot.kktp?.deskripsi }}
                </p>

                <p
                  class="text-sm text-gray-700 bg-white p-2.5 rounded-lg border border-purple-100/50 italic"
                >
                  "{{ anekdot.catatan }}"
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { House, CircleCheckBig, CircleAlert } from "lucide-vue-next";
import { getPortalMonitoringById } from "@/lib/services/portalMonitoringService";

const route = useRoute();
const detail = ref(null);

const masterElemen = ref({
  kesyuhadaan: {
    nama: "Kesyuhadaan",
    warna: "bg-green-500",
    teksWarna: "text-green-500",
  },
  nabp: {
    nama: "Nilai Agama & Budi Pekerti",
    warna: "bg-blue-500",
    teksWarna: "text-blue-500",
  },
  jd: {
    nama: "Jati Diri",
    warna: "bg-purple-500",
    teksWarna: "text-purple-500",
  },
  ddlmstrs: {
    nama: "Literasi & STEM",
    warna: "bg-amber-500",
    teksWarna: "text-amber-500",
  },
});

const mingguan = computed(() => detail.value?.monitoring_mingguan || {});
const siswa = computed(() => detail.value?.siswa_kelas?.siswa || {});

const formatTanggal = (mulai, selesai) => {
  if (!mulai || !selesai) return "-";

  const start = new Date(mulai).toLocaleDateString("id-ID", {
    day: "2-digit",
  });

  const end = new Date(selesai).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${start} - ${end}`;
};

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const rentangTanggal = computed(() =>
  formatTanggal(mingguan.value.tanggal_mulai, mingguan.value.tanggal_selesai),
);

const fileUrl = (path) => {
  if (!path) {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
  }

  if (path.startsWith("http")) return path;

  const filename = path.split("/").pop();

  return `${import.meta.env.VITE_API_URL}/monitoring/siswa/file/karya/${filename}`;
};

const indikatorPerElemen = computed(() => {
  const grouped = {};

  Object.keys(masterElemen.value).forEach((key) => {
    grouped[key] = {
      ...masterElemen.value[key],
      list: [],
    };
  });

  (detail.value?.indikator || []).forEach((item) => {
    const elemen = item.tp?.elemen;

    if (grouped[elemen]) {
      grouped[elemen].list.push({
        id: item.id,
        tp: item.tp,
        teks: item.tp?.tujuan,
        muncul: item.muncul,
        kejadian_teramati: item.kejadian_teramati,
      });
    }
  });

  return grouped;
});

const skorElemen = computed(() => {
  const hasil = {};

  Object.keys(indikatorPerElemen.value).forEach((key) => {
    const list = indikatorPerElemen.value[key].list;
    const total = list.length;
    const muncul = list.filter((item) => item.muncul).length;

    hasil[key] = total ? Math.round((muncul / total) * 100) : 0;
  });

  return hasil;
});

const fetchDetail = async () => {
  const res = await getPortalMonitoringById(route.params.id);
  detail.value = res.data;
};

onMounted(fetchDetail);
</script>
