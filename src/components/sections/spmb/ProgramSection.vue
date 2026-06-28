<template>
  <div>
    <section class="bg-surface-container-low py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-2xl md:text-3xl font-bold text-primary mb-3">
            Program Belajar
          </h2>

          <p class="text-on-surface-variant max-w-2xl mx-auto">
            Pilih waktu belajar yang paling sesuai dengan kebutuhan tumbuh
            kembang dan aktivitas keluarga Anda
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div
            v-for="program in programs"
            :key="program.id"
            :class="[
              program.featured
                ? 'relative bg-white rounded-2xl border-2 border-primary p-8 shadow-md'
                : 'bg-white rounded-2xl border border-outline-variant p-8 shadow-sm hover:shadow-md transition-all',
            ]"
          >
            <div
              v-if="program.featured"
              class="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              <span
                class="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold"
              >
                Terfavorit
              </span>
            </div>

            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-4">
              {{ program.name }}
            </h3>

            <p class="text-on-surface-variant leading-relaxed min-h-[72px]">
              {{ program.description }}
            </p>

            <div class="border-t border-outline-variant my-6"></div>

            <div>
              <p class="text-xl md:text-2xl text-primary font-bold">
                {{ program.time }}
              </p>

              <p
                :class="
                  program.featured
                    ? 'font-medium text-on-surface mt-1'
                    : 'font-medium text-primary mt-1'
                "
              >
                {{ program.days }}
              </p>
            </div>
          </div>
        </div>

        <!-- <div class="mt-10 text-center text-sm text-on-surface-variant">
          Jadwal dapat berubah sesuai kalender akademik dan kebijakan sekolah.
        </div> -->
      </div>
    </section>
  </div>
</template>

<script setup>
const programs = [
  {
    id: 1,
    name: "Reguler",
    description:
      "Waktu belajar inti yang fokus pada pembentukan karakter, kemandirian, dan stimulasi perkembangan anak.",
    time: "07.30 – 11.00 WIB",
    days: "Senin – Jumat",
    featured: false,
  },
  {
    id: 2,
    name: "Halfday",
    description:
      "Program tambahan dengan fokus pada penguatan materi agama, pembiasaan ibadah, serta aktivitas pendampingan.",
    time: "07.30 – 13.00 WIB",
    days: "Senin – Jumat",
    featured: true,
  },
  {
    id: 3,
    name: "Fullday",
    description:
      "Layanan belajar dan penitipan edukatif untuk membantu orang tua yang membutuhkan pendampingan hingga sore hari.",
    time: "07.30 – 16.00 WIB",
    days: "Senin – Jumat",
    featured: false,
  },
];
</script>

<style lang="scss" scoped></style>
