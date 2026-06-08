<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-md p-8">
        <div class="text-center mb-6">
          <router-link :to="{ name: 'Home' }">
            <img
              src="@/assets/images/logo/logo-tk.png"
              alt="Logo"
              class="h-16 mx-auto mb-4"
            />
          </router-link>

          <h1 class="text-2xl font-semibold text-[#284945]">Lupa Password</h1>

          <p class="text-sm text-gray-500 mt-2">
            Masukkan email yang terdaftar untuk menerima link reset password.
          </p>
        </div>

        <form @submit.prevent="submit">
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Email<span class="text-error-500">*</span>
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Masukkan email"
            />
          </div>

          <button
            :disabled="loading || cooldown > 0"
            class="w-full mt-6 rounded-lg py-2.5 text-white font-medium transition"
            :class="
              loading || cooldown > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#284945] hover:bg-[#1c3431]'
            "
          >
            <span class="text-sm" v-if="loading">Mengirim...</span>
            <span class="text-sm" v-else-if="cooldown > 0">
              Kirim ulang dalam {{ cooldown }} detik
            </span>
            <span class="text-sm" v-else>Kirim Link Reset</span>
          </button>
        </form>

        <p v-if="success" class="text-green-600 text-sm text-center mt-4">
          Link reset password berhasil dikirim.
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
  success.value = false;

  try {
    await forgotPassword(form.value);
    success.value = true;
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
