<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">
      <div class="flex items-center justify-center gap-4 mb-8">
        <img
          src="@/assets/images/logo/logo-tk.png"
          alt="TK Masjid Syuhada"
          class="h-16 w-auto"
        />

        <div class="text-left">
          <p class="text-sm font-medium text-gray-500">KB & TK</p>

          <h1 class="text-lg font-semibold text-[#284945] leading-tight">
            Masjid Syuhada
          </h1>
        </div>
      </div>
      <!-- <div
        class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        :class="isSuccess ? 'bg-green-100' : 'bg-red-100'"
      >
        <CheckCircle v-if="isSuccess" class="h-9 w-9 text-green-600" />
        <XCircle v-else class="h-9 w-9 text-red-600" />
      </div> -->

      <h1
        class="text-2xl font-medium"
        :class="isSuccess ? 'text-green-600' : 'text-red-600'"
      >
        {{ title }}
      </h1>

      <p class="mt-3 text-sm text-gray-600">
        {{ message }}
      </p>

      <button
        @click="goLogin"
        class="mt-6 w-full rounded-lg bg-[#284945] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1c3431]"
      >
        Ke Halaman Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const status = computed(() => route.query.status);
const isSuccess = computed(() => status.value === "success");

const title = computed(() => {
  if (isSuccess.value) return "Email Berhasil Diverifikasi";
  return "Verifikasi Email Gagal";
});

const message = computed(() => {
  if (isSuccess.value) {
    return "Akun Anda berhasil diverifikasi. Silakan login untuk melanjutkan.";
  }

  return "Token verifikasi tidak valid atau sudah kedaluwarsa. Silakan lakukan pendaftaran ulang atau hubungi admin.";
});

onMounted(() => {
  auth.clearAuth();
});

const goLogin = () => {
  auth.clearAuth();
  router.replace("/login");
};
</script>
