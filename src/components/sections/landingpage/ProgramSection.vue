<template>
  <section id="program" class="py-20 mb bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Heading -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2
          class="text-2xl md:text-3xl text-primary leading-tight text-center font-semibold mb-4"
        >
          Program Pendidikan
        </h2>

        <p class="text-slate-600 lg:text-lg">
          Setiap tahap perkembangan anak mendapatkan pendekatan yang sesuai,
          terarah, dan menyenangkan melalui pembelajaran berbasis nilai Islam,
          karakter, serta pengalaman nyata.
        </p>
      </div>

      <!-- Jenjang -->
      <div class="grid md:grid-cols-3 gap-8 mb-20">
        <div
          v-for="item in jenjang"
          :key="item.title"
          class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition"
        >
          <div class="mb-6">
            <h3 class="text-xl font-medium text-primary">
              {{ item.title }}
            </h3>

            <p class="text-sm text-slate-500">
              {{ item.age }}
            </p>
          </div>

          <ul class="space-y-3">
            <li
              v-for="feature in item.features"
              :key="feature"
              class="flex items-start gap-3"
            >
              <span
                class="material-symbols-outlined text-green-600 text-[20px]"
              >
                check_circle
              </span>

              <span>
                {{ feature }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Program Unggulan -->
      <div class="mb-20">
        <h3
          class="text-2xl md:text-3xl text-primary leading-tight text-center font-semibold mb-10"
        >
          Program Unggulan
        </h3>

        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="item in unggulan"
            :key="item"
            class="bg-white text-on-surface-variant rounded-xl border border-slate-200 px-5 py-6 text-center font-medium hover:border-primary hover:bg-primary hover:text-white transition"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- Aktivitas Harian -->
      <!-- <div class="mb-20">
        <h3 class="text-3xl font-bold text-center text-primary mb-10">
          Aktivitas Harian Siswa
        </h3>

        <div class="grid md:grid-cols-4 gap-4">
          <div
            v-for="(item, index) in aktivitas"
            :key="item"
            class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center"
          >
            <div
              class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 font-bold"
            >
              {{ index + 1 }}
            </div>

            <p class="font-medium">
              {{ item }}
            </p>
          </div>
        </div>
      </div> -->

      <!-- Event -->
      <!-- <div>
        <h3 class="text-3xl font-bold text-center text-primary mb-10">
          Event & Kegiatan Khusus
        </h3>

        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="item in events"
            :key="item"
            class="px-6 py-3 rounded-full bg-primary text-white font-medium"
          >
            {{ item }}
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup>
const jenjang = [
  {
    title: "Kelompok Bermain",
    age: "Usia 2–4 Tahun",
    features: [
      "Kemandirian Dasar",
      "Stimulasi Motorik Halus",
      "Pengenalan Adab Dasar",
      "Belajar Melalui Bermain",
    ],
  },
  {
    title: "TK A (Zero)",
    age: "Usia 4–5 Tahun",
    features: [
      "Eksplorasi Minat Bakat",
      "Literasi Awal",
      "Numerasi Dasar",
      "Hafalan Doa & Surat Pendek",
    ],
  },
  {
    title: "TK B (Besar)",
    age: "Usia 5–6 Tahun",
    features: [
      "Persiapan Masuk SD",
      "Calistung",
      "Kepemimpinan Cilik",
      "Pemantapan Karakter",
    ],
  },
];

const unggulan = [
  "Kesyuhadaan",
  "Halfday & Fullday",
  "Calistung",
  "Manasik Haji",
  "Pekan Budaya",
  "Outbound",
  "PHBN & PHBI",
  "Family Day",
  "Parents Week",
  "Parenting",
];

const aktivitas = [
  "Iqro",
  "Doa & Hafalan",
  "Praktik Shalat",
  "Motorik Kasar / Senam",
  "Snack Time",
  "Kegiatan Inti",
  "Makan Siang",
  "Doa Penutup",
];

const events = [
  "Manasik Haji",
  "Parents Week",
  "Outing Class",
  "Kamis Pon",
  "Outbound",
  "Milad TK",
  "PHBN",
  "PHBI",
];
</script>
