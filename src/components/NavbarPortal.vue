<template>
  <div>
    <Disclosure
      as="nav"
      class="fixed top-0 left-0 right-0 z-50 bg-transparent"
      v-slot="{ open }"
    >
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <!-- MOBILE BUTTON -->
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton class="p-2 text-gray-400 hover:text-white">
              <Bars3Icon v-if="!open" class="size-6" />
              <XMarkIcon v-else class="size-6" />
            </DisclosureButton>
          </div>

          <!-- LOGO + MENU -->
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex items-center">
              <img class="h-10" :src="logo" />
              <div class="text-sm ml-2 text-white">
                <h6>KB & TK</h6>
                <h6 class="-mt-1">Masjid Syuhada</h6>
              </div>
            </div>

            <!-- DESKTOP MENU -->
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.route"
                  v-slot="{ isActive }"
                  :class="[
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- RIGHT MENU -->
          <div class="hidden md:flex items-center gap-3">
            <template v-if="isLogin">
              <router-link to="/dashboard" class="px-3 py-2 text-white">
                Dashboard
              </router-link>
            </template>

            <template v-else>
              <router-link
                to="/login"
                class="nline-flex mr-3 items-center rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-gray-200 hover:text-slate-800 focus:outline-none"
              >
                Login
              </router-link>

              <router-link
                to="/register"
                class="inline-flex items-center rounded-md border-2 border-white bg-[#F7EF52] px-4 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <!-- MOBILE MENU -->
      <DisclosurePanel class="sm:hidden px-2 pb-3">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.route"
          class="block px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white"
        >
          {{ item.name }}
        </router-link>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo.svg";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const isLogin = false;

const navigation = [
  { name: "Home", route: "/" },
  { name: "Pendaftaran", route: "/pendaftaran" },
];
</script>
