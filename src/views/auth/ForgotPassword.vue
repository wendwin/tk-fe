<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-md p-8">
        <!-- Back -->
        <router-link
          :to="{ name: 'Home' }"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#284945] transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>

          <span>Kembali ke Beranda</span>
        </router-link>

        <!-- Header -->
        <div class="text-center mb-8">
          <router-link :to="{ name: 'Home' }">
            <img
              src="@/assets/images/logo/logo-tk.png"
              alt="Logo"
              class="h-16 mx-auto mb-5"
            />
          </router-link>

          <h1 class="text-2xl font-semibold text-[#284945]">Lupa Password</h1>

          <p class="mt-2 text-sm leading-6 text-gray-500">
            Masukkan email yang terdaftar untuk menerima tautan reset password.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submit">
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
              <span class="text-error-500">*</span>
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Masukkan email"
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#284945] focus:ring-2 focus:ring-[#284945]/20 outline-none transition"
            />
          </div>

          <button
            :disabled="loading || cooldown > 0"
            class="mt-6 w-full rounded-lg py-2.5 font-medium text-white transition"
            :class="
              loading || cooldown > 0
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-[#284945] hover:bg-[#1f3b38]'
            "
          >
            <span v-if="loading">Mengirim...</span>

            <span v-else-if="cooldown > 0">
              Kirim ulang dalam {{ cooldown }} detik
            </span>

            <span v-else> Kirim Link Reset </span>
          </button>
        </form>

        <p
          v-if="success"
          class="mt-5 rounded-lg bg-green-50 px-4 py-3 text-center text-sm text-green-700"
        >
          {{ success }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { forgotPassword } from "@/lib/services/authService";
import { showError, showWarning } from "@/lib/utils/toast";
import Home from "../Home.vue";

const form = ref({
  email: "",
});

const loading = ref(false);
const success = ref(false);
const cooldown = ref(0);
const cooldownInterval = ref(null);

const startCooldown = () => {
  cooldown.value = 60;

  cooldownInterval.value = setInterval(() => {
    cooldown.value--;

    if (cooldown.value <= 0) {
      clearInterval(cooldownInterval.value);
      cooldownInterval.value = null;
    }
  }, 1000);
};

const submit = async () => {
  if (loading.value || cooldown.value > 0) return;

  if (!form.value.email) {
    showWarning("Email wajib diisi");
    return;
  }

  loading.value = true;
  success.value = "";

  try {
    const res = await forgotPassword(form.value);

    success.value = res.message;

    startCooldown();
  } catch (err) {
    showError(err.message || "Gagal mengirim link reset password");
  } finally {
    loading.value = false;
  }
};

onUnmounted(() => {
  if (cooldownInterval.value) {
    clearInterval(cooldownInterval.value);
  }
});
</script>
