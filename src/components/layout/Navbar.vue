<template>
  <div>
    <Disclosure
      as="nav"
      v-slot="{ open: mobileOpen }"
      :class="[
        'fixed top-0 left-0 right-0 z-[999] transition-all duration-300',
        mobileOpen || isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
      ]"
    >
      <div
        :class="[
          'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8',
          mobileOpen && !isScrolled ? 'bg-white' : '',
        ]"
      >
        <div class="relative flex h-16 items-center justify-between">
          <!-- mobile menu -->
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              :class="[
                'p-2 transition-colors duration-300',
                isScrolled || mobileOpen
                  ? 'text-slate-800 hover:text-slate-600'
                  : 'text-white hover:text-gray-200',
              ]"
            >
              <Bars3Icon v-if="!mobileOpen" class="size-6" />
              <XMarkIcon v-else class="size-6" />
            </DisclosureButton>
          </div>

          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex items-center">
              <img
                class="h-10 transition-all duration-300"
                :src="isScrolled || mobileOpen ? logoDark : logo"
                alt="Logo KB & TK Masjid Syuhada"
              />
              <div
                :class="[
                  'text-sm ml-2 transition-colors duration-300',
                  isScrolled || mobileOpen ? 'text-slate-800' : 'text-white',
                ]"
              >
                <h6>KB & TK</h6>
                <h6 class="-mt-1">Masjid Syuhada</h6>
              </div>
            </div>

            <!-- desktop menu -->
            <div class="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-2">
              <div class="flex space-x-4">
                <router-link
                  to="/"
                  :class="[
                    'px-3 py-2 text-sm font-medium transition-colors',
                    isScrolled || mobileOpen ? 'text-slate-800' : 'text-white',
                  ]"
                >
                  Home
                </router-link>
                <Menu as="div" class="relative" v-slot="{ open: profileOpen }">
                  <MenuButton
                    :class="[
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                      isScrolled ? 'text-slate-800' : 'text-white',
                    ]"
                  >
                    Profil

                    <ChevronDown
                      :size="16"
                      :class="[
                        'transition-transform duration-200',
                        profileOpen ? 'rotate-180' : '',
                      ]"
                    />
                  </MenuButton>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="absolute left-0 mt-4 w-64 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      <div class="p-2">
                        <MenuItem v-slot="{ active }">
                          <router-link
                            to="/#tentang"
                            :class="[
                              active ? 'bg-gray-100' : '',
                              'block rounded-lg px-4 py-3 text-sm text-slate-700',
                            ]"
                          >
                            Tentang Sekolah
                          </router-link>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <router-link
                            to="/#visi-misi"
                            :class="[
                              active ? 'bg-gray-100' : '',
                              'block rounded-lg px-4 py-3 text-sm text-slate-700',
                            ]"
                          >
                            Visi & Misi
                          </router-link>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <router-link
                            to="/#program"
                            :class="[
                              active ? 'bg-gray-100' : '',
                              'block rounded-lg px-4 py-3 text-sm text-slate-700',
                            ]"
                          >
                            Program Pendidikan
                          </router-link>
                        </MenuItem>

                        <MenuItem v-slot="{ active }">
                          <router-link
                            to="/#dokumentasi"
                            :class="[
                              active ? 'bg-gray-100' : '',
                              'block rounded-lg px-4 py-3 text-sm text-slate-700',
                            ]"
                          >
                            Dokumentasi
                          </router-link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>

                <Menu as="div" class="relative" v-slot="{ open: spmbOpen }">
                  <MenuButton
                    :class="[
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                      isScrolled ? 'text-slate-800' : 'text-white',
                    ]"
                  >
                    SPMB

                    <ChevronDown
                      :size="16"
                      :class="[
                        'transition-transform duration-200',
                        spmbOpen ? 'rotate-180' : '',
                      ]"
                    />
                  </MenuButton>

                  <MenuItems
                    class="absolute left-0 mt-4 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5"
                  >
                    <div class="p-2">
                      <MenuItem v-slot="{ active }">
                        <router-link
                          to="/spmb/informasi"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block rounded-lg px-4 py-3 text-sm text-slate-700',
                          ]"
                        >
                          Informasi Pendaftaran
                        </router-link>
                      </MenuItem>

                      <MenuItem v-slot="{ active }">
                        <router-link
                          :to="{
                            path: '/spmb/informasi',
                            hash: '#faq',
                          }"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block rounded-lg px-4 py-3 text-sm text-slate-700',
                          ]"
                        >
                          FAQ
                        </router-link>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <!-- right menu -->
          <div class="hidden md:flex items-center gap-3">
            <template v-if="isAuthenticated">
              <router-link
                to="/pendaftaran"
                :class="[
                  'px-3 py-2 transition-colors duration-300',
                  isScrolled || mobileOpen ? 'text-slate-800' : 'text-white',
                ]"
              >
                Dashboard
              </router-link>

              <button
                @click="handleLogout"
                :class="[
                  'px-4 py-2 rounded-md border transition-all duration-300',
                  isScrolled
                    ? 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-slate-800',
                ]"
              >
                Logout
              </button>
            </template>

            <!-- <template v-if="isLogin">
              <router-link to="/dashboard" class="px-3 py-2 text-white">
                Dashboard
              </router-link>
            </template> -->

            <template v-else>
              <router-link
                to="/login"
                :class="[
                  'inline-flex mr-3 items-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300',
                  isScrolled || mobileOpen
                    ? 'border-[#3A6A59] text-[#3A6A59]'
                    : 'border-white text-white',
                ]"
              >
                Login
              </router-link>

              <router-link
                to="/register"
                :class="[
                  'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300',
                  isScrolled || mobileOpen
                    ? 'bg-[#3A6A59] text-white'
                    : 'bg-yellow-400 text-yellow-900',
                ]"
              >
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <!-- mobile menu -->
      <DisclosurePanel
        v-slot="{ close }"
        class="sm:hidden bg-white shadow-lg border-t border-slate-100"
      >
        <div class="px-4 py-4 space-y-1">
          <router-link
            v-for="item in mobileMenu"
            :key="item.title"
            :to="item.route"
            @click="close()"
            class="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            {{ item.title }}
          </router-link>

          <div class="border-t border-slate-100 my-3"></div>

          <template v-if="isAuthenticated">
            <router-link
              @click="close()"
              to="/pendaftaran"
              class="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Dashboard
            </router-link>

            <button
              @click="handleLogout"
              class="w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              @click="close()"
              class="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Login
            </router-link>

            <router-link
              to="/register"
              @click="close()"
              class="block rounded-lg px-4 py-3 text-sm font-medium bg-primary text-white text-center"
            >
              Register
            </router-link>
          </template>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronDown } from "lucide-vue-next";
import logo from "@/assets/images/logo/logo-tk.svg";
import logoDark from "@/assets/images/logo/logo-tk-dark.svg";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth";
import { logout } from "@/lib/services/authService";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

const router = useRouter();

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleLogout = async () => {
  await logout();
  auth.clearAuth();
  router.push("/login");
};

const mobileMenu = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "Tentang Sekolah",
    route: "/#tentang",
  },
  {
    title: "Visi & Misi",
    route: "/#visi-misi",
  },
  {
    title: "Program Pendidikan",
    route: "/#program",
  },
  {
    title: "Dokumentasi",
    route: "/#dokumentasi",
  },
  {
    title: "Informasi Pendaftaran",
    route: "/spmb/informasi",
  },
  {
    title: "FAQ",
    route: {
      path: "/spmb/informasi",
      hash: "#faq",
    },
  },
];

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
