<template>
  <div>
    <section class="bg-slate-50 py-16 md:py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-2xl md:text-3xl font-bold text-primary mb-4">
            Langkah Pendaftaran
          </h2>

          <p class="text-on-surface-variant max-w-2xl mx-auto">
            Ikuti tahapan berikut untuk menjadi bagian dari keluarga besar KB &
            TK Masjid Syuhada Yogyakarta
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-6 top-0 bottom-0 w-px bg-primary/20"></div>

          <div class="space-y-10">
            <div
              v-for="step in registrationSteps"
              :key="step.id"
              class="relative flex gap-6"
            >
              <div
                class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 z-10"
              >
                {{ step.id }}
              </div>

              <div>
                <h3 class="text-xl font-semibold mb-2 text-primary">
                  {{ step.title }}
                </h3>

                <p class="text-on-surface-variant leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>

            <!-- Nanti kalau mau aktifkan -->
            <!--
            <div class="relative flex gap-6">
              <div
                class="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shrink-0 z-10"
              >
                ✓
              </div>

              <div class="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-green-700 mb-2">
                  Selamat Bergabung
                </h3>

                <p class="text-green-700">
                  Buah hati Anda resmi menjadi bagian dari keluarga besar KB &
                  TK Masjid Syuhada Yogyakarta.
                </p>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const registrationSteps = [
  {
    id: 1,
    title: "Pembelian Formulir",
    description:
      "Membeli formulir pendaftaran sebesar Rp100.000 melalui sekolah atau unggah bukti transfer melalui pendaftaran online.",
  },
  {
    id: 2,
    title: "Isi Formulir & Lengkapi Berkas",
    description:
      "Lengkapi formulir pendaftaran dan unggah atau serahkan dokumen persyaratan.",
  },
  {
    id: 3,
    title: "Pembayaran Dana Deposit",
    description:
      "Melakukan pembayaran Dana Deposit sesuai ketentuan yang berlaku.",
  },
  {
    id: 4,
    title: "Observasi & Asesmen Anak",
    description:
      "Anak mengikuti observasi perkembangan dan asesmen bersama guru.",
  },
  {
    id: 5,
    title: "Wawancara Orang Tua",
    description:
      "Orang tua atau wali mengikuti sesi wawancara sebagai bagian dari proses penerimaan.",
  },
  {
    id: 6,
    title: "Pengumuman Hasil",
    description:
      "Hasil seleksi akan diinformasikan melalui Syuhada School Portal.",
  },
];
</script>
