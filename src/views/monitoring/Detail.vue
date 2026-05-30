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
        class="hover:text-green-600 transition"
      >
        Jurnal Mingguan
      </router-link>
      <span>/</span>
      <span class="text-gray-600 font-semibold"
        >Detail Pekan {{ dataPekanIni.minggu }}</span
      >
    </nav>

    <header
      class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <span
            class="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider"
          >
            Semester {{ dataPekanIni.semester }} - Minggu
            {{ dataPekanIni.minggu }}
          </span>

          <h1 class="text-2xl font-semibold text-gray-800 mt-2">
            Tema: {{ dataPekanIni.topik }}
          </h1>

          <p class="text-gray-500 text-sm mt-1">
            Sub-topik: {{ dataPekanIni.subTopik }} •
            <span class="italic text-gray-400">{{
              dataPekanIni.rentangTanggal
            }}</span>
          </p>

          <div class="mt-4 pt-3 border-t border-gray-300 space-y-1">
            <div class="mb-2">
              <h6
                class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Wali Kelas:
              </h6>
              <h6 class="text-sm text-gray-700 font-medium rounded-md">
                {{ dataPekanIni.timPengajar.waliKelas }}
              </h6>
            </div>

            <div class="">
              <h6
                class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Pendamping:
              </h6>
              <h6 class="text-sm text-gray-700 font-medium rounded-md">
                {{ dataPekanIni.timPengajar.pendamping }}
              </h6>
            </div>
          </div>
        </div>

        <!-- <router-link :to="{ name: 'Monitoring' }">
          <button
            class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition shrink-0"
          >
            ← Kembali ke Daftar Minggu
          </button>
        </router-link> -->
      </div>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-3">
          <h2 class="text-base font-semibold text-gray-800">
            Tujuan Pembelajaran
          </h2>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
          <li
            v-for="(tp, index) in dataPekanIni.tujuanPembelajaran"
            :key="index"
            class="text-gray-650 leading-relaxed"
          >
            {{ tp }}
          </li>
        </ul>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-3">
          <h2 class="text-base font-semibold text-gray-800">
            Aktivitas Main Pekan Ini
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            v-for="(kegiatan, index) in dataPekanIni.kegiatanPekanIni"
            :key="index"
            class="p-2.5 bg-gray-50 rounded-xl border border-gray-100"
          >
            <p class="text-sm font-semibold text-gray-800 mb-0.5">
              {{ kegiatan.nama }}
            </p>
            <!-- <p class="text-sm text-gray-400 truncate">
              Bahan: {{ kegiatan.media }}
            </p> -->
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <section
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
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-sm font-bold text-gray-700"
                    >{{ skorElemen[key] }}%</span
                  >
                </div>
              </div>
              <span
                class="text-xs font-semibold text-gray-600 mt-2 line-clamp-2 leading-tight h-8"
              >
                {{ elemen.nama }}
              </span>
            </div>
          </div>
        </section>

        <section
          class="bg-white rounded-2xl p-6 shadow-xs border border-gray-150"
        >
          <div class="mb-6">
            <h2
              class="text-xl font-semibold text-gray-800 flex items-center gap-2"
            >
              Jurnal Capaian Pembelajaran
            </h2>
            <p class="text-sm text-gray-600 mt-0.5">
              Detail indikator perkembangan kompetensi anak yang diamati guru
              sepanjang pekan ini
            </p>
          </div>

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
                <h3
                  class="text-xs font-bold text-white uppercase tracking-wider"
                >
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
                  class="p-4 flex items-center gap-3 transition hover:bg-gray-50/40"
                >
                  <div class="shrink-0 mt-0.5">
                    <div v-if="item.muncul" class="text-green-500">
                      <CircleCheckBig class="w-4 h-4" />
                    </div>

                    <div v-else class="text-amber-500">
                      <CircleAlert class="w-4 h-4" />
                    </div>
                  </div>

                  <div class="flex-1">
                    <p
                      class="text-sm font-medium leading-relaxed transition duration-200"
                      :class="
                        item.muncul ? 'text-gray-800' : 'text-gray-500 italic'
                      "
                    >
                      {{ item.teks }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-amber-50/60 rounded-2xl p-6 border border-amber-100">
          <div class="mb-3">
            <h2 class="text-base font-semibold text-amber-900">
              Tips Stimulasi Akhir Pekan
            </h2>
          </div>
          <p class="text-sm text-amber-800 mb-4 leading-relaxed">
            Berdasarkan pengamatan aktivitas kelas minggu ini, berikut ide
            aktivitas seru bersama Ayah/Bunda di rumah:
          </p>

          <div class="space-y-4">
            <div
              v-for="(tips, index) in dataPekanIni.rekomendasiRumah"
              :key="index"
              class="bg-white p-3 rounded-xl border border-amber-100/70 shadow-2xs"
            >
              <span
                class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1"
              >
                Fokus: {{ masterElemen[tips.elemenKey].nama }}
              </span>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ tips.tips }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <!-- <section
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 class="text-lg font-bold text-gray-800 mb-4">Galeri Aktivitas</h2>
          <div class="space-y-4">
            <div
              v-for="foto in dataPekanIni.galeri"
              :key="foto.id"
              class="group overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
            >
              <img
                :src="foto.foto"
                :alt="foto.judul"
                class="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
              />
              <div class="p-3">
                <p class="text-xs font-semibold text-gray-700">
                  {{ foto.judul }}
                </p>
              </div>
            </div>
          </div>
        </section> -->

        <section class="bg-white rounded-2xl p-6 border mb-6">
          <div class="mb-3">
            <h2 class="text-base font-semibold text-gray-800">
              Asesmen Awal Pekan
            </h2>
          </div>
          <div class="space-y-2 text-sm">
            <p class="text-gray-600">
              <strong class="text-gray-800">Metode:</strong>
              {{ dataPekanIni.asesmenAwal.teknik }}
            </p>
            <p class="text-gray-600">
              <strong class="text-gray-800">Rancangan Kegiatan:</strong>
              {{ dataPekanIni.asesmenAwal.kegiatan }}
            </p>
            <div
              class="p-2.5 bg-white rounded-xl border border-blue-100/60 text-gray-700 italic"
            >
              "{{ dataPekanIni.asesmenAwal.hasil }}"
            </div>
          </div>
        </section>

        <section
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <h2 class="text-lg font-semibold text-gray-800 mb-1">
            Dokumentasi & Analisis Karya
          </h2>
          <p class="text-sm text-gray-600 mb-4">
            Evaluasi mendalam proses belajar anak melalui hasil karya praktiknya
          </p>

          <div class="space-y-6">
            <div
              v-for="karya in dataPekanIni.asesmenHasilKarya"
              :key="karya.id"
              class="rounded-xl border border-gray-100 overflow-hidden bg-gray-50/50"
            >
              <img
                :src="karya.foto"
                :alt="karya.kegiatan"
                class="w-full h-44 object-cover"
              />

              <div class="p-4 space-y-3">
                <div class="">
                  <h3 class="font-semibold text-gray-900">
                    {{ karya.kegiatan }}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ karya.kktp }}
                  </p>
                  <!-- <span class="text-base text-gray-800">
                    {{ karya.kegiatan }}
                  </span>
                  <p class="text-xs text-gray-500 mt-1.5">
                    <strong class="text-gray-700">Target KKTP:</strong>
                    {{ karya.kktp }}
                  </p> -->
                </div>

                <div class="text-sm">
                  <strong class="font-semibold text-gray-700"
                    >Deskripsi Aktivitas:</strong
                  >
                  <p class="text-gray-500">
                    {{ karya.deskripsi }}
                  </p>
                </div>

                <div class="text-sm">
                  <strong class="font-semibold text-gray-700"
                    >Analisis Guru:</strong
                  >

                  <p class="text-gray-500">{{ karya.analisa }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          v-if="dataPekanIni.catatanAnekdot.length > 0"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            Catatan Anekdot Terpilih
          </h2>
          <p class="text-sm text-gray-600 mb-4">
            Catatan guru mengenai kejadian atau perilaku signifikan anak di
            kelas.
          </p>

          <div class="space-y-3">
            <div
              v-for="(anekdot, idx) in dataPekanIni.catatanAnekdot"
              :key="idx"
              class="p-4 bg-purple-50/40 rounded-xl border border-purple-100 text-xs"
            >
              <div
                class="flex justify-between items-center text-xs text-gray-500 font-bold uppercase mb-2"
              >
                <span>{{ anekdot.waktu }}</span>
              </div>
              <p class="text-gray-500 mb-1.5 text-sm">
                <strong class="text-gray-700">Kriteria Capaian:</strong>
                {{ anekdot.kktp }}
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { House, CircleCheckBig, CircleAlert } from "lucide-vue-next";

const route = useRoute();
const mingguId = route.params.id;

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
    nama: "Jatidiri (Motorik & Karakter)",
    warna: "bg-purple-500",
    teksWarna: "text-purple-500",
  },
  ddlmstrs: {
    nama: "Eksplorasi, Sains & Literasi",
    warna: "bg-amber-500",
    teksWarna: "text-amber-500",
  },
});

const dataPekanIni = ref({
  minggu: 4,
  semester: 2,
  topik: "Makanan Sehat dan Halal",
  subTopik: "Sayur dan Lauk Pauk",
  rentangTanggal: "26 - 30 Januari 2026",

  timPengajar: {
    waliKelas: "Suciati, S.Pd",
    pendamping: "Atfiroh Amri Nasta'in, S.H., S.Pd",
  },

  asesmenAwal: {
    teknik: "Observasi",
    kegiatan:
      "Diskusi pemantik menggunakan video & tanya jawab interaktif mengenai sayur dan lauk pauk.",
    hasil:
      "Ananda secara umum antusias. Beberapa anak sudah mengenali jenis sayur lokal, namun perlu bimbingan dalam memahami proses pertumbuhan tanaman bawang.",
  },

  asesmenHasilKarya: [
    {
      id: 1,
      kegiatan: "Eksperimen dengan Kunyit",
      foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      kktp: "Mengamati perubahan pada kegiatan eksperimen & menceritakan kembali hasil pengamatan.",
      deskripsi:
        "Ananda menuangkan cairan cuka dan deterjen ke dalam air kunyit secara mandiri, lalu mengamati perubahan warnanya dengan saksama.",
      analisa:
        "Ananda sudah mampu memahami konsep perubahan warna (sains dasar) dan bisa mengidentifikasi sifat asam-basa secara sederhana dari perubahan warna tersebut.",
    },
    {
      id: 2,
      kegiatan: "Praktik Membuat Telur Asin",
      foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      kktp: "Murid melakukan gerakan motorik halus (koordinasi mata dan tangan) & menyelesaikan hasil karya hingga tuntas.",
      deskripsi:
        "Ananda meremas adonan batu bata dan garam, lalu membungkus telur bebek hingga tertutup rapat tanpa bantuan guru.",
      analisa:
        "Kekuatan motorik halus otot-otot jari tangan Ananda berkembang sangat baik, koordinasi mata-tangan juga presisi saat membungkus telur.",
    },
  ],

  catatanAnekdot: [
    {
      waktu: "Selasa, 27 Januari 2026 (08.50 WIB)",
      kktp: "Menunjukkan sikap sopan, santun, dan peduli lingkungan.",
      catatan:
        "Saat toilet training dan makan bekal bersama, Ananda secara sukarela membantu temannya yang kesulitan membuka kotak bekalnya, lalu merapikan kembali sisa tisu ke tempat sampah tanpa diminta.",
    },
  ],

  tujuanPembelajaran: [
    "Murid menerapkan nilai-nilai ajaran agama dalam kehidupan sehari-hari (NABP)",
    "Murid mengenal ciri-ciri tubuh yang sehat (NABP)",
    "Murid melakukan gerakan motorik kasar dengan melibatkan keseimbangan dan kekuatan koordinasi (JD)",
    "Murid melakukan gerakan motorik halus (koordinasi mata dan tangan) (JD)",
    "Murid membuat rangkaian kata sederhana (DDLMSTRS)",
    "Murid terlibat dalam kegiatan eksplorasi, eksperimen, atau penelitian tentang objek dan/atau peristiwa (DDLMSTRS)",
  ],

  kegiatanPekanIni: [
    { nama: "Bermain Teka-Teki Silang", media: "Sayuran, spidol" },
    {
      nama: "Eksperimen dengan Kunyit",
      media: "Kunyit, air, kapas, deterjen, cuka, gelas, sendok",
    },
    {
      nama: "Eksplorasi Kacang Panjang",
      media: "Kacang panjang, plastik, kertas, spidol",
    },
    {
      nama: "Menanam Bawang Merah",
      media: "Gelas plastik, kapas, bawang merah, air",
    },
    {
      nama: "Praktik Membuat Telur Asin",
      media: "Telur bebek, batu bata, garam, baskom",
    },
  ],

  galeri: [
    {
      id: 1,
      foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      judul: "Eksperimen Perubahan Warna Kunyit",
    },
    {
      id: 2,
      foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      judul: "Praktik Menanam Bawang Merah",
    },
  ],

  // Hasil Asesmen Checklist yang diisi guru (KKTP)
  indikatorAsesmen: [
    // Elemen Kesyuhadaan & NABP
    {
      id: 1,
      elemenKey: "kesyuhadaan",
      teks: "Hafalan & implementasi Hadist: Makan minum dengan tangan kanan",
      muncul: true,
    },
    {
      id: 2,
      elemenKey: "nabp",
      teks: "Mengucapkan doa sebelum dan sesudah kegiatan",
      muncul: true,
    },
    {
      id: 3,
      elemenKey: "nabp",
      teks: "Menjelaskan secara sederhana manfaat makan sayur dan lauk bagi tubuh",
      muncul: false,
    },

    // Elemen Jatidiri (JD)
    {
      id: 4,
      elemenKey: "jd",
      teks: "Melakukan gerakan melompat, zig-zag, atau rintangan sesuai instruksi",
      muncul: true,
    },
    {
      id: 5,
      elemenKey: "jd",
      teks: "Menjaga keseimbangan tubuh saat bergerak",
      muncul: false,
    },
    {
      id: 6,
      elemenKey: "jd",
      teks: "Menanam bawang merah sesuai tahapan sederhana",
      muncul: true,
    },

    // Elemen Literasi & STEM (DDLMSTRS)
    {
      id: 7,
      elemenKey: "ddlmstrs",
      teks: "Anak mampu menulis kata pada permainan teka teki silang",
      muncul: true,
    },
    {
      id: 8,
      elemenKey: "ddlmstrs",
      teks: "Mengamati perubahan pada kegiatan eksperimen (kunyit, menanam bawang)",
      muncul: true,
    },
    {
      id: 9,
      elemenKey: "ddlmstrs",
      teks: "Menceritakan kembali hasil pengamatan dengan bahasa sendiri",
      muncul: false,
    },
  ],

  rekomendasiRumah: [
    {
      elemenKey: "jd",
      tips: "Yuk Ayah/Bunda, ajak Ananda bermain engklek atau melompati garis lurus di halaman rumah akhir pekan ini untuk melatih keseimbangan tubuhnya!",
    },
    {
      elemenKey: "ddlmstrs",
      tips: "Saat makan bersama, pancing Ananda untuk menceritakan kembali bagaimana warna air kunyit berubah saat dicampur deterjen ya, Bun.",
    },
  ],
});

// Mengelompokkan indikator asesmen berdasarkan masterElemen secara otomatis
const indikatorPerElemen = computed(() => {
  const kelompok = {};

  // Ambil struktur dari masterElemen agar urutannya konsisten
  Object.keys(masterElemen.value).forEach((key) => {
    kelompok[key] = {
      ...masterElemen.value[key],
      list: dataPekanIni.value.indikatorAsesmen.filter(
        (item) => item.elemenKey === key,
      ),
    };
  });

  return kelompok;
});

// Menghitung persentase "Muncul" otomatis per elemen dari data indikator dinamis
const skorElemen = computed(() => {
  const hasil = {};

  Object.keys(masterElemen.value).forEach((key) => {
    const listIndikator = dataPekanIni.value.indikatorAsesmen.filter(
      (ind) => ind.elemenKey === key,
    );
    const total = listIndikator.length;
    const muncul = listIndikator.filter((ind) => ind.muncul).length;

    hasil[key] = total > 0 ? Math.round((muncul / total) * 100) : 0;
  });

  return hasil;
});
</script>
