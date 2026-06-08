<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-10 space-y-3"
  >
    <h1 class="text-6xl font-bold text-gray-800 dark:text-white">
      403: Forbidden
    </h1>
    <p class="text-xl text-gray-500 dark:text-gray-400">
      Anda tidak memiliki izin untuk mengakses halaman ini.
    </p>
    <button
      @click="goHome"
      class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
    >
      Kembali ke Beranda
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";
import { redirectByRole } from "@/lib/utils/redirectByRole";

const router = useRouter();
const auth = useAuthStore();

const goHome = () => {
  if (auth.isAuthenticated) {
    router.replace(redirectByRole(auth.role));
  } else {
    router.replace("/login");
  }
};
</script>

<style lang="scss" scoped></style>
