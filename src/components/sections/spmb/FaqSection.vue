<template>
  <div>
    <section class="bg-slate-50 py-16 md:py-24" id="faq">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-primary mb-3">
            Pertanyaan Umum
          </h2>

          <p class="text-on-surface-variant">
            Menjawab pertanyaan yang paling sering diajukan terkait proses SPMB
            KB & TK Masjid Syuhada
          </p>
        </div>

        <div class="space-y-4">
          <details
            v-for="(faq, index) in faqItems"
            :key="index"
            :open="faq.open"
            class="group bg-white rounded-xl border border-outline-variant p-6"
          >
            <summary
              class="flex cursor-pointer items-center justify-between font-medium text-primary list-none"
            >
              {{ faq.question }}

              <span
                class="material-symbols-outlined transition-transform group-open:rotate-180"
              >
                expand_more
              </span>
            </summary>

            <div class="mt-4 text-on-surface-variant">
              <p v-if="faq.answer" class="leading-relaxed">
                {{ faq.answer }}
              </p>

              <template v-if="faq.paragraphs">
                <p
                  v-for="(paragraph, idx) in faq.paragraphs"
                  :key="idx"
                  :class="idx > 0 ? 'mt-3' : ''"
                >
                  {{ paragraph }}
                </p>
              </template>

              <template v-if="faq.list">
                <ul class="space-y-2 list-disc pl-5">
                  <li v-for="(item, idx) in faq.list" :key="idx">
                    {{ item }}
                  </li>
                </ul>
              </template>

              <p v-if="faq.note" class="mt-3 text-sm">
                {{ faq.note }}
              </p>
            </div>
          </details>
        </div>

        <!-- CTA -->
        <div class="text-center mt-10">
          <p class="text-on-surface-variant mb-4">
            Tidak menemukan jawaban yang Anda cari?
          </p>

          <div
            class="mt-5 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm text-on-surface-variant"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-base"> call </span>

              <span>Bu Evi – 0821-2512-4586</span>
            </div>

            <div class="hidden md:block h-4 w-px bg-outline"></div>

            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-base">
                schedule
              </span>

              <span>Senin–Jumat, 08.00–15.00 WIB</span>
            </div>
          </div>

          <a
            href="https://wa.me/6282125124586"
            target="_blank"
            class="inline-flex mt-10 items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Hubungi Admin SPMB
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqItems = [
  {
    question: "Berapa kelas yang dibuka pada Tahun Pelajaran 2026/2027?",
    answer:
      "KB membuka 2 kelas (usia 2–3 tahun dan 3–4 tahun), sedangkan TK membuka 7 kelas yang terdiri dari 3 kelas TK A dan 4 kelas TK B.",
    open: true,
  },
  {
    question: "Setiap kelas diampu oleh berapa guru?",
    answer:
      "Setiap kelas didampingi oleh 2 orang guru yang bertugas mendampingi proses belajar dan perkembangan peserta didik.",
  },
  {
    question: "Bagaimana jam belajar program Reguler, Halfday, dan Fullday?",
    list: [
      "Reguler : hingga pukul 10.00–11.30 WIB",
      "Halfday : hingga pukul 14.30 WIB",
      "Fullday : hingga pukul 16.00 WIB",
    ],
    note: "Jadwal lengkap dapat dilihat pada bagian Program Belajar.",
  },
  {
    question: "Apa saja ekstrakurikuler yang tersedia?",
    answer:
      "Program ekstrakurikuler meliputi tahfidz, menari, bernyanyi, renang, angklung, gamelan, menggambar, dan berbagai kegiatan pengembangan minat sesuai jenjang kelas.",
  },
  {
    question: "Apakah Dana Deposit dapat dicicil?",
    paragraphs: [
      "Ya. Dana Deposit dapat dicicil maksimal 2 kali dengan pembayaran awal minimal Rp2.000.000.",
      "Dana Pengembangan dapat dicicil maksimal selama 3 bulan (Juli–September 2026).",
    ],
  },
  {
    question: "Apakah terdapat potongan Dana Pengembangan?",
    list: [
      "Gelombang 1: Potongan Rp1.000.000",
      "Gelombang 2: Potongan Rp500.000",
      "Potongan Kakak-Adik: Rp500.000 per anak",
    ],
    note: "Potongan hanya berlaku setelah Dana Deposit lunas dan tidak dapat digabungkan dengan program potongan lainnya.",
  },
  {
    question: "Bagaimana jika membatalkan pendaftaran?",
    answer:
      "Dana yang dikembalikan kepada pendaftar sebesar 20% dari total dana yang telah dibayarkan. Sisanya menjadi infaq atau wakaf untuk sekolah.",
  },
  {
    question: "Apakah tersedia program Halfday dan Fullday?",
    answer:
      "Ya. Selain Program Reguler, tersedia Program Halfday dan Fullday. Biaya program tambahan tersebut terpisah dari biaya Program Reguler dan dapat dilihat pada bagian Program Belajar.",
  },
];

const contactInfo = {
  admin: "Bu Evi",
  phone: "0821-2512-4586",
  operationalHours: "Senin–Jumat, 08.00–15.00 WIB",
  whatsappUrl: "https://wa.me/6282125124586",
};
</script>

<style lang="scss" scoped></style>
