<template>
  <footer class="bg-surface-container-highest pt-24">
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-12 px-margin-page max-w-container-max-width mx-auto"
    >
      <!-- Brand -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <img src="/src/assets/images/logo/logo-tk-dark.svg" alt="" />
          <h3 class="text-headline-md font-medium text-primary">
            KB & TK Masjid Syuhada
          </h3>
        </div>

        <p class="text-on-surface-variant">
          Jl. I Dewa Nyoman Oka No.13, Kotabaru, Gondokusuman, Yogyakarta 55224
        </p>

        <div class="flex gap-4">
          <button
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">public</span>
          </button>

          <button
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">alternate_email</span>
          </button>

          <button
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      <!-- Pendidikan -->
      <div>
        <h4 class="font-bold mb-6">Pendidikan</h4>

        <div class="space-y-3">
          <a href="#" class="block">Tentang Kami</a>
          <a href="#" class="block">Program Pendidikan</a>
          <a href="#" class="block">Fasilitas Sekolah</a>
          <a href="#" class="block">Prestasi Siswa</a>
        </div>
      </div>

      <!-- PPDB -->
      <div>
        <h4 class="font-bold mb-6">Informasi PMB</h4>

        <div class="space-y-3">
          <a href="#" class="block">Alur PMB 2026</a>
          <a href="#" class="block">Biaya Pendidikan</a>
          <a href="#" class="block">Brosur Digital</a>
          <a href="#" class="block">Hubungi Kami</a>
        </div>
      </div>

      <!-- Maps -->
      <div>
        <div class="overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=TK%20Masjid%20Syuhada%20Yogyakarta&output=embed"
            width="100%"
            height="220"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>

    <div
      class="px-margin-page max-w-container-max-width mx-auto mt-16 py-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between gap-4"
    >
      <p>© 2026 KB & TK Masjid Syuhada Yogyakarta.</p>

      <div class="flex gap-6">
        <a href="#">Kebijakan Privasi</a>
        <a href="#">Syarat & Ketentuan</a>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
