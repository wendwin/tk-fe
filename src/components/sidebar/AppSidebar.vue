<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div
      :class="[
        'py-8 flex',
        !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
      ]"
    >
      <router-link to="/">
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="dark:hidden"
          src="@/assets/images/logo/logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="hidden dark:block"
          src="@/assets/images/logo/logo-dark.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-else
          src="@/assets/images/logo/logo-icon.svg"
          alt="Logo"
          width="32"
          height="32"
        />
      </router-link>
    </div>
    <div
      class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar"
    >
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-1">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" class="w-5 h-5" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                  <ChevronDown
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(
                          groupIndex,
                          index,
                        ),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.to"
                  :to="item.to"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.to),
                      'menu-item-inactive': !isActive(item.to),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.to)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" class="w-5 h-5" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                </router-link>
                <transition
                  @enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) &&
                      (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.to"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(subItem.to),
                              'menu-dropdown-item-inactive': !isActive(
                                subItem.to,
                              ),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.to,
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.to,
                                  ),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.to,
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.to,
                                  ),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { useSidebar } from "@/composables/useSidebar";
import {
  ChevronDown,
  LayoutGrid,
  Users,
  UserSearch,
  UsersRound,
  School,
  PieChartIcon,
  CalendarDays,
  Shuffle,
  UserRoundCheck,
  UserCog,
  Layers3,
} from "lucide-vue-next";
import path from "node:path";

const route = useRoute();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const menuGroups = [
  {
    title: "Menu",
    items: [
      {
        icon: LayoutGrid,
        name: "Dashboard",
        to: { name: "AdminDashboard" },
      },
    ],
  },

  {
    title: "Pendaftaran",
    items: [
      {
        icon: Users,
        name: "Data Pendaftaran",
        to: { name: "AdminPendaftaran" },
      },
      {
        icon: UserSearch,
        name: "Observasi",
        to: { name: "AdminObservasi" },
      },
      // {
      //   icon: Layers3,
      //   name: "Gelombang",
      //   to: { name: "AdminGelombang" },
      // },
    ],
  },

  {
    title: "Akademik",
    items: [
      {
        icon: CalendarDays,
        name: "Tahun Ajaran",
        to: { name: "AdminTahunAjaran" },
      },
      {
        icon: School,
        name: "Kelas",
        to: { name: "AdminKelas" },
      },
      {
        icon: UserRoundCheck,
        name: "Guru Kelas",
        to: { name: "AdminGuruKelas" },
      },
      {
        icon: Shuffle,
        name: "Pembagian Kelas",
        to: { name: "AdminPembagianKelas" },
      },
      {
        icon: UsersRound,
        name: "Siswa",
        to: { name: "AdminSiswa" },
      },
    ],
  },

  {
    title: "Pengaturan",
    items: [
      {
        icon: UserCog,
        name: "Kelola User",
        to: { name: "AdminUser" },
      },
    ],
  },
];
const isActive = (path) => route.path === path;

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems &&
        item.subItems.some((subItem) => isActive(subItem.path)),
    ),
  );
});

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path),
      ))
  );
};

const startTransition = (el) => {
  el.style.height = "auto";
  const height = el.scrollHeight;
  el.style.height = "0px";
  el.offsetHeight; // force reflow
  el.style.height = height + "px";
};

const endTransition = (el) => {
  el.style.height = "";
};
</script>
