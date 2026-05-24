<template>
  <div class="max-w-6xl mx-auto p-6 mt-16">
    <div class="">
      <h1 class="text-2xl">
        Selamat Datang di Portal KB & TK Masjid Syuhada Yogyakarta
      </h1>
      <h1 class="text-2xl">Halo, Bunda!</h1>
      <h2>Apa yang ingin Bunda lakukan hari ini?</h2>
    </div>

    <div class="flex gap-6 my-12 flex-wrap justify-center items-stretch">
      <div class="w-full md:w-[500px] rounded-2xl bg-white min-h-60 p-6">
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

      <div class="w-full md:w-[500px] rounded-2xl bg-white min-h-60 p-6">
        <h1 class="text-xl font-medium">
          Monitoring Perkembangan (Asesmen Pembelajaran)
        </h1>

        <p class="text-sm text-gray-500 mt-2 leading-6">
          Pantau perkembangan murid di sekolah dengan mudah melalui fitur
          monitoring.
        </p>

        <RouterLink
          to="/monitoring"
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

<style lang="scss" scoped></style>
