<template>
  <section
    id="tentang"
    class="py-section-gap-desktop px-margin-page max-w-container-max-width mx-auto"
  >
    <div class="grid md:grid-cols-2 gap-20 items-center">
      <!-- IMAGE -->
      <div class="relative">
        <div
          class="absolute -top-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        />

        <div
          class="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto rounded-full overflow-hidden shadow-2xl relative z-10 rotate-2 border-8 border-white"
        >
          <img
            src="/src/assets/images/syuhada.webp"
            alt="KB TK Masjid Syuhada"
            class="w-full aspect-square object-cover"
            draggable="false"
            loading="lazy"
          />
        </div>
      </div>

      <!-- CONTENT -->
      <div class="space-y-8">
        <h2 class="text-3xl text-primary leading-tight font-medium">
          Tentang Kami
        </h2>

        <p class="text-body-lg text-on-surface-variant">
          TK Masjid Syuhada berdiri pada tanggal 16 Agustus 1960 dengan nomor SK
          pendirian sekolah 0847/H/1986 tertanggal 26 Agustus 1986. KB & TK
          Masjid Syuhada berada dalam lindungan Yayasan Masjid dan Asrama
          (YASMA) Syuhada bersama dengan SD Masjid Syuhada dan SMP IT Masjid
          Syuhada.
        </p>

        <!-- <p class="text-body-lg text-on-surface-variant">
          KB & TK Masjid Syuhada bukan sekadar tempat belajar, melainkan rumah
          kedua bagi ananda untuk tumbuh mekar. Di bawah naungan Yayasan Masjid
          Syuhada, kami mengintegrasikan nilai-nilai luhur Islam dengan metode
          pendidikan modern.
        </p> -->

        <!-- TIMELINE -->
        <div
          class="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20"
        >
          <div
            v-for="item in timeline"
            :key="item.title"
            class="relative pl-10"
          >
            <div
              class="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white"
              :class="item.color"
            />

            <h4 class="font-headline-md text-body-lg font-bold text-primary">
              {{ item.year }} — {{ item.title }}
            </h4>

            <p class="text-on-surface-variant">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const timeline = [
  {
    year: "1960",
    title: "Pendirian",
    description:
      "Didirikan sebagai salah satu pelopor pendidikan Islam anak usia dini di Yogyakarta.",
    color: "bg-primary",
  },
  {
    year: "2000",
    title: "Transformasi Sentra",
    description:
      "Mengadopsi sistem Moving Class dan Pembelajaran Sentra untuk kemandirian siswa.",
    color: "bg-tertiary",
  },
  {
    year: "Saat Ini",
    title: "Sekolah Penggerak",
    description:
      "TK Masjid Syuhada saat ini telah menjadi bagian dari Sekolah Penggerak yang menghasilkan peserta didik berkualitas dan menjadi mitra terpercaya orangtua dalam menumbuhkembangkan potensi anak di usia dini.",
    color: "bg-secondary",
  },
];
</script>
