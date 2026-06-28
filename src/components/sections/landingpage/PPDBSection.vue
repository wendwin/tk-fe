<template>
  <section
    class="py-section-gap-desktop px-margin-page max-w-container-max-width mx-auto"
  >
    <div class="text-center mb-16">
      <h2 class="font-headline-xl text-headline-xl text-primary mb-4">
        Alur Pendaftaran
      </h2>

      <p class="text-on-surface-variant">
        Proses pendaftaran yang mudah dan transparan.
      </p>
    </div>

    <div class="grid md:grid-cols-5 gap-8">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="text-center space-y-4"
      >
        <div
          class="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold"
        >
          {{ index + 1 }}
        </div>

        <h4 class="font-bold">
          {{ step.title }}
        </h4>

        <p class="text-sm text-on-surface-variant">
          {{ step.desc }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: "Registrasi Online",
    desc: "Mengisi formulir di website resmi",
  },
  {
    title: "Verifikasi Berkas",
    desc: "Penyerahan dokumen administrasi",
  },
  {
    title: "Observasi Anak",
    desc: "Pemetaan kesiapan dan potensi",
  },
  {
    title: "Wawancara Ortu",
    desc: "Penyelarasan visi sekolah dan rumah",
  },
  {
    title: "Daftar Ulang",
    desc: "Penyelesaian biaya dan seragam",
  },
];
</script>
