<template>
  <div
    class="fixed z-50 bg-white border-b border-gray-200 px-4 md:px-6 h-[60px] w-full flex items-center justify-between top-0 shadow-sm"
  >
    <nav class="flex items-center justify-between w-full max-w-6xl mx-auto">
      <RouterLink
        :to="{ name: 'HomePortal' }"
        class="flex items-center gap-2.5"
      >
        <img
          class="h-10"
          src="@/assets/images/logo/logo-tk.png"
          alt="Logo TK"
        />
        <div class="hidden sm:block text-sm text-slate-700 font-semibold">
          KB & TK Masjid Syuhada
        </div>
      </RouterLink>

      <div class="relative" ref="dropdownRef">
        <button
          class="flex items-center gap-2 text-gray-700"
          @click.prevent="toggleDropdown"
        >
          <span
            class="hidden sm:block text-slate-700 text-[12px] font-semibold px-3 py-[3px] rounded-full capitalize"
          >
            Halo, {{ fullName }}
          </span>

          <span
            class="w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-[13px] text-slate-700 bg-slate-200 hover:bg-slate-300"
          >
            {{ initial }}
          </span>

          <ChevronDown
            class="h-4 w-4 text-gray-500 transition"
            :class="{ 'rotate-180': dropdownOpen }"
          />
        </button>

        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-4 w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-lg"
        >
          <div class="px-2">
            <span class="block font-medium text-gray-700 text-sm">
              {{ fullName }}
            </span>

            <span class="mt-0.5 block text-xs text-gray-500">
              {{ email }}
            </span>
          </div>

          <ul class="flex flex-col gap-1 pt-3 pb-3 border-b border-gray-100">
            <li>
              <RouterLink
                to="/profile"
                @click="closeDropdown"
                class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg text-sm hover:bg-gray-100"
              >
                <CircleUser class="text-gray-500 w-5 h-5" />
                Profile
              </RouterLink>
            </li>
          </ul>

          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg text-sm hover:bg-gray-100"
          >
            <LogOut class="text-gray-500 w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { ChevronDown, LogOut, CircleUser } from "lucide-vue-next";

import { logout } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/auth";
import { clearPendaftaranId } from "@/lib/utils/storage";

const router = useRouter();
const auth = useAuthStore();

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const fullName = computed(() => auth.user?.full_name || "User");
const email = computed(() => auth.user?.email || "-");

const initial = computed(() => {
  return auth.user?.full_name
    ? auth.user.full_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

const handleLogout = async () => {
  try {
    await logout();

    closeDropdown();
    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");
    clearPendaftaranId();

    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
