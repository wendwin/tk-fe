<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    id="top-nav"
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent'"
  >
    <div
      class="max-w-container-max-width mx-auto px-margin-page py-6 flex justify-between items-center"
    >
      <!-- Logo -->
      <a
        href="#"
        class="text-body-lg font-headline-xl font-bold text-primary flex items-center gap-3"
      >
        <span class="material-symbols-outlined text-4xl"> mosque </span>

        <span class="leading-none tracking-tight">
          KB & TK
          <br />

          <span class="text-sm font-medium text-on-surface-variant">
            Masjid Syuhada
          </span>
        </span>
      </a>

      <!-- Menu Desktop -->
      <div class="hidden md:flex items-center gap-8">
        <a
          href="#tentang"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Tentang
        </a>

        <a
          href="#program"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Program
        </a>

        <a
          href="#kegiatan"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Kegiatan
        </a>

        <a
          href="#fasilitas"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Fasilitas
        </a>

        <a
          href="#prestasi"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Prestasi
        </a>

        <a
          href="#kontak"
          class="text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps"
        >
          Kontak
        </a>
      </div>

      <!-- CTA -->
      <button
        class="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
      >
        Daftar PPDB
      </button>
    </div>
  </nav>
</template>

<style scoped>
.glass-nav {
  background: rgba(252, 249, 244, 0.7);
  backdrop-filter: blur(16px);
}
</style>
