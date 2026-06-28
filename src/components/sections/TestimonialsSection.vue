<!-- <script setup>
const testimonials = [
  {
    name: "Bunda Arini",
    role: "Ibu dari Alif (TK B)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKUm-wjsuGsVIcsKEfL9Nyg0k6aWlUfrJ46ClEHNRdT_Necw_jiJvVaSdMDLjZoj2RwNaF_yTgfRcOGu0J37SG0DI0y_BiwUNGGydfwFh4qphwCuzMNHBC9rnhgFNEnD8Qu1DpuUCjtzReDRzdiAEOZrOkOe8NLv0aBVCLcHOKd0ee2C0H83jLY_V4JWB2FSkZ6050skE8lBeHdkNHu6ss12EdLlBzU0bnOD8tZubjTqqAksDPB_6XmYnGrVT0C2vCz2rLPrkGc8U",
    text: "Perkembangan adab Alif sangat luar biasa sejak sekolah di Syuhada. Dia jadi rajin shalat tanpa disuruh dan sangat mandiri.",
  },
  {
    name: "Ayah Prasetyo",
    role: "Ayah dari Nisa (KB)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_dNCqI1J3ubzxU4zbnkqbOcu3DEKzxUkGH_lM6EkSzAD2RmbswyXwtXCGDiDcHOJB9ZWetQoFZtL2dICKc-XIRVhKe-ypsROb0Z21RV4Hhc1FbJClHI2W9k5A-gMvE8X3BvnwrfsHTdt_cnZckkYqfWO3m_TeUm6pUYVCLQ2Lzxklfp57QyUWPpaNp6gxQGj7hcPUCZC3vEPEzRCTN4NGpvtEuKukxZSiVgu-bdsLHNP3ZZdlt6tkr3gjg9bv5sNrKy6ae4vRC4I",
    text: "Metode sentra di sini benar-benar membantu Nisa yang tadinya pemalu jadi sangat eksploratif dan berani berpendapat.",
    featured: true,
  },
  {
    name: "Bunda Widya",
    role: "Ibu dari Keisha (TK A)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8jqDncagcJJK25RIZ2AbUaME_QQzjkGIgUzDxjkpb63D1NRcLO76g_awz-_oKl03fQj-i1slhT_-qbFlJqQy4g5cGUy7kDiP5hSvOddy0RV2iwvfFR39aCa3u9QL-W7U55EtCujgm4LCoLcqb70qZDYjOnKVi-fq1TAtikYskdJ3N9FnAukLTd_DCCeE99PDC-W2itsrLCnZWx7XdA_kaTGKfrPSH3Zr59BZWlq7E99z6p23ddveDmcRGv3i4Xy9B0PE4xv-eR9E",
    text: "Fasilitasnya sangat lengkap dan kebersihannya terjaga. Saya merasa tenang menitipkan anak di lingkungan yang sangat Islami ini.",
  },
];
</script>

<template>
  <section
    class="py-section-gap-desktop bg-surface-container-high overflow-hidden"
  >
    <div class="max-w-container-max-width mx-auto px-margin-page">
      <h2
        class="text-3xl text-primary leading-tight text-center font-medium mb-16"
      >
        Testimoni
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.name"
          :class="
            item.featured
              ? 'bg-primary text-on-primary p-10 rounded-lg shadow-xl relative scale-105 z-10'
              : 'bg-surface-container-lowest p-10 rounded-lg shadow-md relative'
          "
        >
          <span
            class="material-symbols-outlined text-6xl absolute top-6 right-6 opacity-20"
            :class="
              item.featured
                ? 'text-on-primary-container'
                : 'text-tertiary-container'
            "
          >
            format_quote
          </span>

          <div class="flex items-center gap-4 mb-6">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-16 h-16 rounded-full object-cover"
              :class="
                item.featured ? 'border-2 border-on-primary-container' : ''
              "
            />

            <div>
              <h4 class="font-bold">
                {{ item.name }}
              </h4>

              <p
                class="text-xs"
                :class="
                  item.featured ? 'opacity-70' : 'text-on-surface-variant'
                "
              >
                {{ item.role }}
              </p>
            </div>
          </div>

          <p
            class="italic leading-relaxed"
            :class="item.featured ? '' : 'text-on-surface-variant'"
          >
            "{{ item.text }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template> -->

<template>
  <section
    class="py-section-gap-desktop bg-surface-container-high overflow-hidden"
  >
    <div class="max-w-container-max-width mx-auto px-margin-page">
      <div class="text-center mb-16">
        <h2 class="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Testimoni Orang Tua
        </h2>

        <p class="text-on-surface-variant lg:text-lg">
          Cerita dan pengalaman dari keluarga besar KB & TK Masjid Syuhada.
        </p>
      </div>

      <Swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }"
      >
        <SwiperSlide v-for="item in testimonials" :key="item.name">
          <div
            class="bg-white rounded-3xl shadow-md p-8 h-full border border-slate-100"
          >
            <span
              class="material-symbols-outlined text-primary text-5xl opacity-20"
            >
              format_quote
            </span>

            <p
              class="mt-4 text-on-surface-variant leading-relaxed min-h-[100px]"
            >
              "{{ item.text }}"
            </p>

            <div>
              <h4 class="font-semibold">
                {{ item.name }}
              </h4>

              <p class="text-sm text-on-surface-variant">
                {{ item.role }}
              </p>
            </div>

            <!-- <div class="flex items-center gap-4 mt-8 pt-6 border-t">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h4 class="font-semibold">
                  {{ item.name }}
                </h4>

                <p class="text-sm text-on-surface-variant">
                  {{ item.role }}
                </p>
              </div>
            </div> -->
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Bunda Arini",
    role: "Ibu dari Alif (TK B)",
    image: "https://i.pravatar.cc/150?img=32",
    text: "Perkembangan adab Alif sangat luar biasa sejak sekolah di Syuhada. Dia jadi rajin shalat tanpa disuruh dan sangat mandiri.",
  },
  {
    name: "Ayah Prasetyo",
    role: "Ayah dari Nisa (KB)",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Metode sentra di sini benar-benar membantu Nisa yang tadinya pemalu jadi sangat eksploratif dan berani berpendapat.",
  },
  {
    name: "Bunda Widya",
    role: "Ibu dari Keisha (TK A)",
    image: "https://i.pravatar.cc/150?img=45",
    text: "Fasilitasnya sangat lengkap dan kebersihannya terjaga. Saya merasa tenang menitipkan anak di lingkungan yang sangat Islami ini.",
  },
  {
    name: "Ayah Fajar",
    role: "Ayah dari Aisyah (TK B)",
    image: "https://i.pravatar.cc/150?img=14",
    text: "Guru-gurunya sangat perhatian dan komunikatif. Kami selalu mendapat laporan perkembangan anak secara berkala.",
  },
  {
    name: "Bunda Rina",
    role: "Ibu dari Farhan (KB)",
    image: "https://i.pravatar.cc/150?img=24",
    text: "Lingkungan sekolah sangat nyaman dan aman. Anak saya selalu semangat berangkat sekolah setiap pagi.",
  },
];
</script>

<style>
.swiper-pagination {
  margin-top: 2rem;
  position: relative;
}
</style>
