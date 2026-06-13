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

          <h1 class="text-2xl font-semibold text-[#284945]">Reset Password</h1>
        </div>

        <form @submit.prevent="submit">
          <div>
            <label
              for="password_baru"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Password Baru<span class="text-error-500">*</span>
            </label>
            <div class="relative">
              <input
                id="password_baru"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-lg border px-3 py-2 pr-10 text-sm"
                :class="fieldClass(errors.password)"
                placeholder="Masukkan password baru"
              />

              <p v-if="errors.password" class="mt-1 text-xs text-red-500">
                {{ errors.password }}
              </p>

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="mt-4">
            <label
              for="konfirmasi_password"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Konfirmasi Password<span class="text-error-500">*</span>
            </label>

            <div class="relative">
              <input
                id="konfirmasi_password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full rounded-lg border px-3 py-2 pr-10 text-sm"
                :class="fieldClass(errors.confirmPassword)"
                placeholder="Ulangi password baru"
              />

              <p
                v-if="errors.confirmPassword"
                class="mt-1 text-xs text-red-500"
              >
                {{ errors.confirmPassword }}
              </p>

              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <EyeOff v-if="showConfirmPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            :disabled="loading"
            class="w-full mt-6 rounded-lg py-2.5 text-white font-medium transition"
            :class="
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#284945] hover:bg-[#1c3431]'
            "
          >
            {{ loading ? "Menyimpan..." : "Reset Password" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Eye, EyeOff } from "lucide-vue-next";
import { resetPassword } from "@/lib/services/authService";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const route = useRoute();
const router = useRouter();

const form = ref({
  token: route.query.token,
  password: "",
});

const confirmPassword = ref("");
const loading = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const errors = ref({});

const fieldClass = (error) =>
  error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-[#284945] focus:border-[#284945]";

const validateForm = () => {
  const newErrors = {};

  if (!form.value.password) {
    newErrors.password = "Password wajib diisi";
  } else if (form.value.password.length < 8) {
    newErrors.password = "Password minimal 8 karakter";
  }

  if (!confirmPassword.value) {
    newErrors.confirmPassword = "Konfirmasi password wajib diisi";
  } else if (form.value.password !== confirmPassword.value) {
    newErrors.confirmPassword = "Konfirmasi password tidak sesuai";
  }

  errors.value = newErrors;

  return Object.keys(newErrors).length === 0;
};

const submit = async () => {
  if (loading.value) return;

  if (!form.value.token) {
    showError("Token reset password tidak ditemukan");
    return;
  }

  if (!validateForm()) return;

  loading.value = true;

  try {
    await resetPassword(form.value);

    showSuccess("Password berhasil direset");

    errors.value = {};
    form.value.password = "";
    confirmPassword.value = "";

    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  } catch (err) {
    showError(err.message || "Gagal reset password");
  } finally {
    loading.value = false;
  }
};
</script>
