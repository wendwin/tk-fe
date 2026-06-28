<template>
  <div>
    <section
      class="relative h-[45vh] overflow-hidden flex items-center bg-[#3A6A59]"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/10 z-10"
      />

      <img
        :src="pattern"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-10 z-10"
      />

      <!-- Content -->
      <div
        class="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-8 text-white"
      >
        <h1 class="text-4xl lg:text-5xl font-semibold leading-tight">SPMB</h1>

        <p class="mt-4 max-w-2xl md:text-lg text-white/90 mb-2">
          Informasi Penerimaan Murid Baru (PMB) KB & TK Masjid Syuhada
          Yogyakarta
        </p>

        <span class="md:text-lg text-white/80">
          Tahun Pelajaran 2026/2027
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import pattern from "@/assets/images/hero-pattern.svg";
</script>

<style lang="scss" scoped></style>
