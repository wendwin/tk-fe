<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-8 w-8">
        <img src="@/assets/images/owner.jpg" alt="User" />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">Musharof </span>

      <ChevronDown :class="{ 'rotate-180': dropdownOpen }" class="h-4 w-4" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="px-2">
        <span
          class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400"
        >
          Musharof Chowdhury
        </span>
        <span
          class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400"
        >
          randomuser@pimjo.com
        </span>
      </div>

      <ul
        class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800"
      >
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 w-5 h-5"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <!-- <router-link
        to="/signin"
        @click="signOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogOut
          @click="handleLogout"
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 w-5 h-5"
        />
        Logout
      </router-link> -->
      <button
        @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogOut
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 w-5 h-5"
        />
        Logout
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronDown, LogOut, CircleUser } from "lucide-vue-next";

import { logout } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const menuItems = [{ href: "/profile", icon: CircleUser, text: "Profile" }];

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const signOut = () => {
  // Implement sign out logic here
  console.log("Signing out...");
  closeDropdown();
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

const handleLogout = async () => {
  try {
    await logout();

    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");

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
