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
import img1 from "@/assets/images/kegiatan/1.jpeg";
import img2 from "@/assets/images/kegiatan/2.jpg";
import img3 from "@/assets/images/kegiatan/3.jpg";
import img4 from "@/assets/images/kegiatan/4.jpg";
import img5 from "@/assets/images/kegiatan/5.jpg";
import img6 from "@/assets/images/kegiatan/6.jpg";
import img7 from "@/assets/images/kegiatan/7.jpg";
import img8 from "@/assets/images/kegiatan/8.jpg";

const centers = [
  { title: "Polisi Sahabat Anak", image: img1 },
  { title: "HUT Kota Yogyakarta", image: img2 },
  { title: "Outbond", image: img3 },
  { title: "Belajar Memasak", image: img4 },
  { title: "", image: img5 },
  { title: "Manasik haji", image: img6 },
  { title: "Sentra Musik", image: img7 },
  { title: "", image: img8 },
];
</script>
