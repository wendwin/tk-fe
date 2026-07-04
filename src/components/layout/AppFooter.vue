<template>
  <footer class="bg-surface-container-highest pt-24">
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-12 px-margin-page max-w-container-max-width mx-auto"
    >
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

        <div class="flex gap-4 mb-6">
          <a
            v-for="social in socialLinks"
            :key="social.url"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="social.label"
            class="group w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:bg-primary"
          >
            <Icon
              :icon="social.icon"
              width="20"
              height="20"
              class="text-primary transition-colors duration-300 group-hover:text-white"
            />
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-primary">Pendidikan</h4>

        <div class="space-y-3">
          <a href="#" class="block">Tentang Kami</a>
          <a href="#" class="block">Program Pendidikan</a>
          <a href="#" class="block">Fasilitas Sekolah</a>
          <a href="#" class="block">Prestasi Siswa</a>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-primary">Informasi PMB</h4>

        <div class="space-y-3">
          <a href="#" class="block">Alur PMB 2026</a>
          <a href="#" class="block">Biaya Pendidikan</a>
          <a href="#" class="block">Brosur Digital</a>
          <a href="#" class="block">Hubungi Kami</a>
        </div>
      </div>

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
      <p>
        &copy; {{ new Date().getFullYear() }} KB & TK Masjid Syuhada Yogyakarta
      </p>

      <div class="flex gap-6">
        <a href="#">Kebijakan Privasi</a>
        <a href="#">Syarat & Ketentuan</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const socialLinks = [
  {
    icon: "mdi:instagram",
    url: "https://www.instagram.com/kbtkmasjidsyuhada/",
    label: "Instagram",
  },
  {
    icon: "mdi:facebook",
    url: "https://www.facebook.com/tkmasjidsyuhadayogyakarta/?locale=id_ID",
    label: "Facebook",
  },
  {
    icon: "simple-icons:tiktok",
    url: "https://www.tiktok.com/@kbtk.masjid.syuhada",
    label: "TikTok",
  },
  {
    icon: "mdi:youtube",
    url: "https://www.youtube.com/channel/UCTHHvBDOdGhEcETiTYFZi9g",
    label: "Youtube",
  },
];
</script>
