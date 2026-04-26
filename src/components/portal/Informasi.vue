<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-semibold mb-1">Informasi Pendaftaran</h2>

          <div class="flex items-start gap-2 text-sm text-gray-500">
            <CircleAlert class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div class="max-w-xl">
              <p>
                Berikut adalah informasi terbaru terkait proses pendaftaran dan
                jadwal observasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-8 space-y-6">
        <!-- STATUS UTAMA -->
        <div class="text-center space-y-2">
          <h1
            class="text-2xl font-bold text-gray-800"
            :class="['text-2xl font-bold', statusClass]"
          >
            {{ statusText }}
          </h1>
          <p class="text-sm text-gray-500">Status pendaftaran Anda saat ini</p>
        </div>

        <!-- OBSERVASI + DOWNLOAD -->
        <div class="grid md:grid-cols-2 gap-4">
          <!-- OBSERVASI -->
          <div class="p-4 rounded-lg bg-yellow-50 border text-sm">
            <p class="font-semibold text-gray-700 mb-1">Jadwal Observasi</p>
            <p class="text-gray-600">{{ observasiInfo }}</p>
          </div>

          <!-- DOWNLOAD -->
          <div
            class="p-4 rounded-lg bg-blue-50 border text-sm flex flex-col justify-between"
          >
            <div>
              <p class="font-semibold text-gray-700 mb-1">Bukti Pendaftaran</p>
              <p class="text-gray-600">Unduh ringkasan data pendaftaran Anda</p>
            </div>

            <button
              class="mt-3 h-9 px-4 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        <!-- NEXT STEP -->
        <!-- <div class="p-4 rounded-lg bg-gray-50 border text-sm">
          <p class="font-semibold text-gray-700 mb-1">Informasi Lanjutan</p>
          <p class="text-gray-600">{{ nextStep }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { CircleAlert } from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const data = computed(() => props.data);

const statusClass = computed(() => {
  switch (data.value?.status) {
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-blue-600";
  }
});

const statusText = computed(() => {
  switch (data.value?.status) {
    case "pending":
      return "Berkas Anda sedang diverifikasi";
    case "verified":
      return "Berkas pendaftaran berhasil diverifikasi";
    case "accepted":
      return "Selamat! Anda diterima";
    case "rejected":
      return "Mohon maaf, Anda belum diterima";
    default:
      return "-";
  }
});

const observasiInfo = computed(() => {
  if (!data.value) return "-";

  switch (data.value.status_observasi) {
    case "belum":
      return "Jadwal observasi akan diinformasikan";
    case "terjadwal":
      return `Jadwal observasi pada ${data.value.tanggal_observasi} jam ${data.value.jam_observasi}`;
    case "hadir":
      return "Anda telah mengikuti observasi";
    case "tidak_hadir":
      return "Anda tidak hadir pada jadwal observasi";
    default:
      return "-";
  }
});

const nextStep = computed(() => {
  const status = data.value?.status;
  const obs = data.value?.status_observasi;

  if (status === "pending") {
    return "Menunggu verifikasi berkas oleh admin";
  }

  if (status === "verified" && obs === "belum") {
    return "Menunggu jadwal observasi";
  }

  if (obs === "terjadwal") {
    return "Harap hadir sesuai jadwal observasi";
  }

  if (obs === "hadir") {
    return "Menunggu hasil seleksi";
  }

  if (status === "accepted") {
    return "Silakan lakukan daftar ulang";
  }

  return "-";
});

// const formatDate = (date) => {
//   if (!date) return "-";
//   return new Date(date).toLocaleDateString("id-ID", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// };
</script>

<style lang="scss" scoped></style>
