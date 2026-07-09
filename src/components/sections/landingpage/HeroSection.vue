<!-- <template>
  <header class="relative min-h-screen flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10"
      ></div>

      <img
        class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI8H0K3rA5lZblKKT5z1qhSZFY4PMNFckhnc3dwjgM1xiJYnIim4zbZ7iWa9QqJUS0LyGVOiHbmstUJ2G-i8lUgFDeh0k8vfGG8Qok6S5jSggmTPH9Juv5QKW0MdNQsRT6bdRiLK0K6riQe5d9ljnhmkUY2Y52vHoM_SP4SocJ9WbIlXEI4kwyzjm4_izY1bwbOe3uaWOUaGewy21Rwt1Z42eE-loI5Az57wVxsGfHQmdVncBtpP1-LwvZQ3wwIldPUKuuLxIsRi0"
        alt="Hero Image"
      />
    </div>

    <div
      class="relative z-20 max-w-container-max-width mx-auto w-full grid md:grid-cols-2 gap-12"
    >
      <div class="space-y-8">
        <div
          class="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-full font-label-caps text-label-caps"
        >
          <span class="material-symbols-outlined text-sm"> verified </span>

          PENDAFTARAN TAHUN AJARAN 2024/2025 DIBUKA
        </div>

        <h1
          class="font-headline-xl text-display-lg text-primary max-w-xl leading-[1.1]"
        >
          Menumbuhkan Generasi
          <span class="italic font-normal">Islami</span>, Cerdas, & Berkarakter.
        </h1>

        <p class="text-body-lg text-on-surface-variant max-w-md">
          Sejak 1960, kami berdedikasi membimbing ananda menemukan potensi
          terbaiknya melalui kurikulum berbasis adab dan stimulasi sentra yang
          menyenangkan.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <button
            class="bg-primary text-on-primary px-10 py-5 rounded-full font-headline-md text-body-lg font-bold hover:shadow-xl transition-all"
          >
            Mulai Petualangan
          </button>

          <button
            class="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
          >
            Lihat Program Kami

            <span class="material-symbols-outlined"> arrow_forward </span>
          </button>
        </div>
      </div>

      <div class="relative hidden md:block">
        <div
          class="absolute top-0 right-0 w-64 p-6 bg-surface-container-lowest/80 backdrop-blur-lg rounded-lg shadow-xl translate-x-12 translate-y-12"
        >
          <div class="text-primary font-headline-xl text-headline-xl">66+</div>

          <div class="text-on-surface-variant font-label-caps text-label-caps">
            TAHUN PENGALAMAN
          </div>
        </div>

        <div
          class="absolute bottom-20 left-10 w-48 p-6 bg-secondary-container text-on-secondary-container rounded-lg shadow-xl -rotate-3"
        >
          <div class="font-headline-xl text-headline-md">132</div>

          <div class="font-label-caps text-label-caps">SISWA AKTIF</div>
        </div>

        <div
          class="absolute top-1/2 right-1/4 w-40 p-6 bg-tertiary-container text-on-tertiary-container rounded-lg shadow-xl rotate-6"
        >
          <div class="font-headline-xl text-headline-md">16</div>

          <div class="font-label-caps text-label-caps">GURU AHLI</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script> -->

<template>
  <div
    class="relative min-h-screen bg-[#3A6A59]"
    :style="{
      backgroundImage: `url(${pattern})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="absolute inset-0 bg-black/40 z-10"></div>

    <div class="absolute inset-0 z-50 flex items-center px-6 text-white">
      <div
        class="mx-auto w-full max-w-7xl flex flex-col-reverse items-center gap-16 md:flex-row md:justify-between md:px-8 lg:px-12"
      >
        <div class="max-w-xl md:text-left">
          <h1 class="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Penerimaan Murid Baru
          </h1>

          <h2
            class="mt-2 text-xl md:text-3xl lg:text-3xl font-bold text-yellow-400"
          >
            KB & TK Masjid Syuhada Yogyakarta
          </h2>

          <p class="md:mt-2 text-xl md:text-3xl lg:text-3xl font-bold">
            Tahun Ajaran {{ tahunAjaran || "-" }}
          </p>

          <p class="text-sm md:text-base max-w-md mt-6 text-gray-100">
            " Tiada suatu pemberian yang lebih utama dari orang tua kepada
            anaknya selain pendidikan yang baik "
          </p>

          <p class="text-sm md:text-base mt-2 font-bold text-gray-100">
            (HR. Al Hakim : 7679)
          </p>

          <RouterLink
            to="/register"
            class="inline-block px-5 py-3 mt-4 md:mt-8 rounded-full font-bold text-sm bg-on-primary text-primary border-2 border-on-primary hover:bg-primary hover:text-on-primary hover:border-on-primary transition-all duration-300"
          >
            Daftar Sekarang
          </RouterLink>

          <!-- <router-link
            to="/login"
            class="inline-flex mt-4 md:mt-8 items-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-yellow-800 hover:bg-gray-200 hover:text-slate-800 transition-all duration-300"
          >
            Daftar Sekarang
          </router-link> -->
        </div>

        <div class="w-full max-w-xs md:max-w-md lg:max-w-lg">
          <img
            :src="hero"
            class="w-full drop-shadow-xl"
            alt=""
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import pattern from "@/assets/images/hero-pattern.svg";
import hero from "@/assets/images/logo/hero.webp";

defineProps({
  tahunAjaran: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
