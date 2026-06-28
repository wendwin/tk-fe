<template>
  <section
    id="dokumentasi"
    class="py-section-gap-desktop px-margin-page max-w-container-max-width mx-auto"
  >
    <h2
      class="text-2xl md:text-3xl font-semibold text-primary text-center mb-16"
    >
      Dokumentasi Kegiatan
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="item in centers"
        :key="item.title"
        class="relative rounded-lg overflow-hidden aspect-square group cursor-pointer"
        :class="item.large ? 'md:row-span-2 md:aspect-auto' : ''"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6"
        >
          <!-- <h4 class="text-gray-200 font-bold text-lg">
            {{ item.title }}
          </h4> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const centers = [
  {
    title: "Polisi Sahabat Anak",
    image: "/src/assets/images/kegiatan/1.jpeg",
  },
  {
    title: "HUT Kota Yogyakarta",
    image: "/src/assets/images/kegiatan/2.jpg",
  },
  {
    title: "Outbond",
    image: "/src/assets/images/kegiatan/3.jpg",
  },
  {
    title: "Belajar Memasak",
    image: "/src/assets/images/kegiatan/4.jpg",
  },
  {
    title: "",
    image: "/src/assets/images/kegiatan/5.jpg",
  },
  {
    title: "Manasik haji",
    image: "/src/assets/images/kegiatan/6.jpg",
  },
  {
    title: "Sentra Musik",
    image: "/src/assets/images/kegiatan/7.jpg",
  },
  {
    title: "",
    image: "/src/assets/images/kegiatan/8.jpg",
  },
];
</script>
