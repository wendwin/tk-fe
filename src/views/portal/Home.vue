<!-- <template>
  <div class="max-w-6xl mx-auto p-6 pt-20">
    <div class="">
      <h1 class="text-2xl">
        Selamat Datang di Portal KB & TK Masjid Syuhada Yogyakarta
      </h1>
      <h1 class="text-2xl">Halo, Bunda!</h1>
      <h2>Apa yang ingin Bunda lakukan hari ini?</h2>
    </div>

    <div class="flex gap-6 my-12 flex-wrap justify-center items-stretch">
      <div class="w-full md:w-[500px] rounded-lg bg-white min-h-60 p-6">
        <h1 class="text-xl font-medium">Pendaftaran Murid Baru</h1>

        <p class="text-sm text-gray-500 mt-2">
          Daftarkan murid baru dengan cepat dan mudah melalui sistem online.
        </p>

        <RouterLink
          :to="{ name: 'Pendaftaran' }"
          class="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-6 text-sm"
        >
          Daftar Sekarang
        </RouterLink>
      </div>

      <div class="w-full md:w-[500px] rounded-lg bg-white min-h-60 p-6">
        <h1 class="text-xl font-medium">
          Monitoring Perkembangan (Asesmen Pembelajaran)
        </h1>

        <p class="text-sm text-gray-500 mt-2 leading-6">
          Pantau perkembangan murid di sekolah dengan mudah melalui fitur
          monitoring.
        </p>

        <RouterLink
          :to="{ name: 'Monitoring' }"
          class="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-6 text-sm"
        >
          Lihat Monitoring
        </RouterLink>
      </div>
    </div>

    <button
      class="absolute bottom-4 right-4 bg-white text-slate-900 py-2 px-4 rounded hover:bg-slate-100"
      @click="handleLogout"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";
import { logout } from "@/lib/services/authService";
import { clearPendaftaranId } from "@/lib/utils/storage";

const router = useRouter();
const auth = useAuthStore();

const handleLogout = async () => {
  try {
    await logout();

    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");
    clearPendaftaranId();

    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<style lang="scss" scoped></style> -->

<template>
  <div class="min-h-screen bg-gray-50 pt-20 px-4 pb-10">
    <div class="max-w-6xl mx-auto space-y-8">
      <section class="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 class="mb-2 text-2xl md:text-3xl font-semibold text-gray-800">
              Halo, Bunda!
            </h1>

            <p class="text-base font-medium text-[#1181B2]">
              Selamat Datang di Syuhada School Portal
            </p>

            <p class="mt-1 text-sm text-gray-500 max-w-xl leading-6">
              KB & TK Masjid Syuhada Yogyakarta. Kelola pendaftaran dan pantau
              perkembangan belajar dalam satu tempat
            </p>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- PENDAFTARAN -->
        <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          <div class="flex items-start justify-between gap-10">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                Pendaftaran Anak
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Lanjutkan pendaftaran yang sudah dibuat atau daftarkan anak baru
              </p>
            </div>

            <RouterLink
              :to="{ name: 'Pendaftaran' }"
              class="shrink-0 px-4 py-2 rounded-md bg-[#1181B2] text-white text-sm hover:bg-[#0d6f9b]"
            >
              Daftar Baru
            </RouterLink>
          </div>

          <div v-if="loadingPendaftaran" class="text-sm text-gray-400">
            Memuat data pendaftaran...
          </div>

          <div
            v-else-if="pendaftaranList.length === 0"
            class="rounded-lg p-6 text-center"
          >
            <p class="text-base font-medium text-gray-700">
              Belum ada pendaftaran
            </p>
            <p class="text-sm text-gray-500 mt-1">
              Silakan mulai pendaftaran anak baru
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="item in pendaftaranList"
              :key="item.id"
              class="border border-gray-200 rounded-xl p-4 hover:border-[#1181B2]/30 hover:bg-blue-50/30 transition hover:cursor-pointer"
            >
              <RouterLink :to="{ name: 'Pendaftaran', query: { id: item.id } }">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{
                        item.peserta.nama_lengkap || "Nama anak belum tersedia"
                      }}
                    </h3>

                    <p class="text-sm text-gray-500 mt-1">
                      No. {{ item.no_pendaftaran }}
                      {{ formatJenis(item.jenis) }} -
                      {{ item.tahun_ajaran.label || "-" }}
                    </p>

                    <p class="text-sm text-gray-500 mt-1">
                      {{ item.gelombang.nama }}
                    </p>
                  </div>

                  <span
                    class="px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="statusClass(item.status)"
                  >
                    {{ formatStatus(item.status) }}
                  </span>
                </div>

                <!-- <div class="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div class="bg-gray-50 rounded-xl p-3">
                    <p class="text-gray-400">Berkas</p>
                    <p class="mt-1 font-medium text-gray-700">
                      {{ formatStatusBerkas(item.status_berkas) }}
                    </p>
                  </div>
  
                  <div class="bg-gray-50 rounded-xl p-3">
                    <p class="text-gray-400">Pembayaran</p>
                    <p class="mt-1 font-medium text-gray-700">
                      {{ formatStatusPembayaran(item.status_pembayaran) }}
                    </p>
                  </div>
                </div> -->

                <!-- <RouterLink
                  :to="{ name: 'Pendaftaran', query: { id: item.id } }"
                  class="flex justify-end mt-4 text-sm font-medium text-[#1181B2] hover:underline"
                >
                  {{ item.status === "draft" ? "Lanjutkan" : "Lihat" }}
                </RouterLink> -->
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- MONITORING -->
        <div class="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              Monitoring Perkembangan
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              Lihat jurnal perkembangan anak yang sudah dipublikasikan guru
            </p>
          </div>

          <div class="border border-gray-100 rounded-lg p-5 bg-green-50/40">
            <p class="text-sm font-medium text-gray-700">
              Jurnal Perkembangan Ananda
            </p>

            <p class="text-sm text-gray-500 mt-1 leading-5">
              Monitoring akan muncul jika anak sudah menjadi siswa dan guru
              telah mempublikasikan jurnal mingguan
            </p>

            <RouterLink
              :to="{ name: 'Monitoring' }"
              class="inline-block mt-4 px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700"
            >
              Lihat Monitoring
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getMyPendaftaran } from "@/lib/services/pendaftaranService";
import { showError } from "@/lib/utils/toast";

const router = useRouter();

const loadingPendaftaran = ref(false);
const pendaftaranList = ref([]);

const loadPendaftaran = async () => {
  try {
    loadingPendaftaran.value = true;

    const res = await getMyPendaftaran();
    pendaftaranList.value = res.data || [];
    console.log(res.data);
  } catch (error) {
    showError(error.message || "Gagal mengambil data pendaftaran");
  } finally {
    loadingPendaftaran.value = false;
  }
};

const formatJenis = (jenis) => {
  const map = {
    kb: "KB",
    tk: "TK",
  };

  return map[jenis] || jenis || "-";
};

const formatStatus = (status) => {
  const map = {
    draft: "Draft",
    pending: "Menunggu Verifikasi",
    verified: "Terverifikasi",
    accepted: "Diterima",
    rejected: "Ditolak",
  };

  return map[status] || status || "-";
};

const formatStatusBerkas = (status) => {
  const map = {
    belum_upload: "Belum Upload",
    pending: "Menunggu Verifikasi",
    verified: "Terverifikasi",
    rejected: "Ditolak",
  };

  return map[status] || status || "-";
};

const formatStatusPembayaran = (status) => {
  const map = {
    unpaid: "Belum Bayar",
    pending: "Menunggu Verifikasi",
    paid: "Lunas",
    failed: "Gagal",
  };

  return map[status] || status || "-";
};

const statusClass = (status) => {
  const map = {
    draft: "bg-gray-100 text-gray-600",
    pending: "bg-amber-100 text-amber-700",
    verified: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return map[status] || "bg-gray-100 text-gray-600";
};

const statusPillClass = computed(() => {
  switch (props.statusPembayaran) {
    case "unpaid":
      return "bg-gray-200 text-gray-700";
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "paid":
      return "bg-green-200 text-green-800";
    case "":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200";
  }
});
onMounted(loadPendaftaran);
</script>
