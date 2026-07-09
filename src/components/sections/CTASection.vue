<template>
  <section class="mb-section-gap-desktop max-w-7xl mx-auto">
    <div
      class="bg-primary md:rounded-xl overflow-hidden relative min-h-[500px] flex items-center"
    >
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover opacity-30"
          src="/src/assets/images/kegiatan/ctr.png"
        />

        <div
          class="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"
        />
      </div>

      <div class="relative z-10 px-16 py-20 max-w-2xl text-on-primary">
        <h2 class="text-2xl md:text-3xl text-display-lg mb-6 leading-tight">
          Mari Bergabung Menjadi Bagian dari Keluarga Besar KB & TK Masjid
          Syuhada
        </h2>

        <p class="text-md mb-10 opacity-90">
          Berikan ananda pengalaman masa kecil yang berharga dengan landasan
          tauhid yang kokoh
        </p>

        <div class="flex flex-wrap gap-4">
          <RouterLink
            to="/register"
            class="px-5 py-3 rounded-full font-bold text-sm bg-on-primary text-primary border-2 border-on-primary hover:bg-primary hover:text-on-primary hover:border-on-primary transition-all duration-300"
          >
            Daftar Sekarang
          </RouterLink>
          <!-- 
          <button
            class=""
          >
            Daftar Sekarang
          </button> -->

          <!-- <button
            class="px-5 py-3 rounded-full font-bold text-sm border-2 border-on-primary text-on-primary hover:bg-on-primary hover:text-primary transition-all duration-300"
          >
            Hubungi Kami
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
