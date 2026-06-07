<template>
  <!-- <div
    class="relative h-screen bg-[#1181B2]"
    :style="{
      backgroundImage: `url(${pattern})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="absolute z-50 w-full mt-32 px-6 text-white">
      <div
        class="mx-auto max-w-7xl flex flex-col-reverse items-center gap-10 md:flex-row md:justify-around"
      >
        <div class="max-w-xl text-center md:text-left">
          <h1 class="text-sm font-bold text-center leading-tight md:text-3xl">
            Penerimaan Peserta Didik Baru
          </h1>

          <h2 class="mt-2 text-sm font-bold text-center md:text-3xl">
            KB & TK Masjid Syuhada Yogyakarta
          </h2>

          <p class="mt-2 text-sm font-bold text-center md:text-3xl">
            Tahun Ajaran 2026/2027
          </p>

          <p class="text-xs md:text-sm mt-6 text-center">
            " Tiada suatu pemberian yang lebih utama dari orang tua kepada
            anaknya selain pendidikan yang baik "
          </p>

          <p class="text-xs md:text-sm mt-2 font-bold text-center">
            (HR. Al Hakim : 7679)
          </p>

          <div class="flex justify-center">
            <router-link
              to="/pendaftaran"
              class="inline-flex mt-4 md:mt-8 items-center rounded-md border-2 border-white bg-transparent px-4 py-3 text-sm font-medium text-white hover:bg-gray-200 hover:text-slate-800"
            >
              Daftar Sekarang
            </router-link>
          </div>
        </div>

        <div class="w-full max-w-md md:max-w-lg">
          <img
            :src="hero"
            class="w-full drop-shadow-xl"
            alt=""
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div> -->

  <div class="h-[3000px]">
    <div
      class="relative h-screen bg-[#3A6A59]"
      :style="{
        backgroundImage: `url(${pattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <div class="absolute inset-0 bg-black/40 z-10"></div>

      <div class="absolute z-50 w-full mt-32 px-6 text-white">
        <div
          class="mx-auto max-w-7xl flex flex-col-reverse items-center gap-10 md:flex-row md:justify-around"
        >
          <div class="max-w-xl md:text-left">
            <h1 class="text-sm font-bold leading-tight md:text-4xl">
              Penerimaan Murid Baru
            </h1>

            <h2 class="mt-2 text-sm font-bold md:text-3xl text-yellow-400">
              KB & TK Masjid Syuhada Yogyakarta
            </h2>

            <p class="mt-2 text-sm font-bold md:text-2xl">
              Tahun Ajaran 2026/2027
            </p>

            <p class="text-xs md:text-sm max-w-md mt-6 text-gray-100">
              " Tiada suatu pemberian yang lebih utama dari orang tua kepada
              anaknya selain pendidikan yang baik "
            </p>

            <p class="text-xs md:text-sm mt-2 font-bold text-gray-100">
              (HR. Al Hakim : 7679)
            </p>

            <router-link
              to="/login"
              class="inline-flex mt-4 md:mt-8 items-center rounded-md bg-yellow-400 px-4 py-3 text-sm font-medium text-yellow-800 hover:bg-gray-200 hover:text-slate-800"
            >
              Daftar Sekarang
            </router-link>
          </div>

          <div class="w-full max-w-md md:max-w-lg">
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
  </div>
</template>

<script setup>
import pattern from "@/assets/images/hero-pattern.svg";
import hero from "@/assets/images/logo/hero.svg";
</script>
