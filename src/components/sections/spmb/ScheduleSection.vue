<template>
  <div>
    <section class="bg-white py-14 md:py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-xl md:text-3xl text-primary font-bold mb-4">
            Jadwal Pendaftaran
          </h2>

          <p class="text-on-surface-variant lg:text-lg">
            Pendaftaran peserta didik baru dibuka dalam tiga gelombang
          </p>
        </div>

        <div class="relative">
          <div class="grid md:grid-cols-3 gap-8 relative">
            <div
              v-for="wave in registrationWaves"
              :key="wave.id"
              class="bg-white rounded-xl shadow-md border border-surface-container p-4 text-center"
            >
              <h3 class="text-xl md:text-2xl font-medium text-primary mb-3">
                {{ wave.title }}
              </h3>

              <p class="lg:text-lg text-on-surface-variant mb-0">
                {{ wave.period }}
              </p>

              <p class="lg:text-lg text-on-surface-variant mb-0">
                {{ wave.discount }}
              </p>

              <span
                :class="[
                  'inline-flex items-center px-4 py-2 mt-4 rounded-full font-semibold text-sm',
                  wave.status === 'active' ? 'text-green-700' : 'text-red-700',
                ]"
              >
                {{ wave.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  registrationWaves: {
    type: Array,
    default: () => [],
  },
});

// const waveMeta = {
//   "Gelombang 1": {
//     discount: "Potongan Rp 1.000.000",
//   },
//   "Gelombang 2": {
//     discount: "Potongan Rp 500.000",
//   },
//   "Gelombang 3": {
//     discount: "Potongan Rp -",
//   },
// };

// const registrationWaves = [
//   {
//     id: 1,
//     title: "Gelombang 1",
//     period: "Oktober - Desember 2026",
//     discount: "Potongan Rp 1.000.000",
//     status: "nonaktif",
//     label: "Pendaftaran Ditutup",
//   },
//   {
//     id: 2,
//     title: "Gelombang 2",
//     period: "Januari - Maret 2027",
//     discount: "Potongan Rp 500.000",
//     status: "nonaktif",
//     label: "Pendaftaran Ditutup",
//   },
//   {
//     id: 3,
//     title: "Gelombang 3",
//     period: "April - Juni 2027",
//     discount: "Potongan Rp -",
//     status: "active",
//     label: "Pendaftaran Dibuka",
//   },
// ];
</script>

<style lang="scss" scoped></style>
