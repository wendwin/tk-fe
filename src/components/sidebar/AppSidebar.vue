<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen overflow-hidden transition-all duration-300 ease-in-out z-50 border-r border-gray-200',
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
      ref="sidebarScrollRef"
      class="flex-1 min-h-0 overflow-y-auto duration-300 ease-linear no-scrollbar"
    >
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div
            v-for="(menuGroup, groupIndex) in filteredMenuGroups"
            :key="groupIndex"
          >
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
                      'menu-item-active': isSubmenuActive(groupIndex, index),
                      'menu-item-inactive': !isSubmenuActive(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuActive(groupIndex, index)
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
                  @click="openSubmenu = null"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item),
                      'menu-item-inactive': !isActive(item),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item)
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
                              'menu-dropdown-item-active': isActive(subItem),
                              'menu-dropdown-item-inactive': !isActive(subItem),
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
import { ref, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "@/lib/stores/auth";
import { canAccess } from "@/lib/utils/rbac";
import { ROLES } from "@/lib/constants/roles";

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
  NotepadText,
} from "lucide-vue-next";

const route = useRoute();
const auth = useAuthStore();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const sidebarScrollRef = ref(null);

const menuGroups = [
  {
    title: "Menu",
    items: [
      {
        icon: LayoutGrid,
        name: "Dashboard",
        to: { name: "AdminDashboard" },
        activeNames: ["AdminDashboard"],
        meta: { role: [ROLES.ADMIN, ROLES.GURU] },
      },
      {
        icon: Users,
        name: "Data Pendaftaran",
        to: { name: "AdminPendaftaran" },
        activeNames: ["AdminPendaftaran", "AdminPendaftarDetail"],
        meta: { role: [ROLES.ADMIN] },
      },
      {
        icon: UserSearch,
        name: "Observasi",
        to: { name: "AdminObservasi" },
        activeNames: ["AdminObservasi", "AdminObservasiDetail"],
        meta: { role: [ROLES.ADMIN, ROLES.GURU] },
      },
    ],
  },

  // {
  //   title: "Pendaftaran",
  //   items: [
  //     {
  //       icon: Users,
  //       name: "Data Pendaftaran",
  //       to: { name: "AdminPendaftaran" },
  //       meta: { role: [ROLES.ADMIN] },
  //     },
  //     {
  //       icon: UserSearch,
  //       name: "Observasi",
  //       to: { name: "AdminObservasi" },
  //       meta: { role: [ROLES.ADMIN, ROLES.GURU] },
  //     },
  //     // {
  //     //   icon: Layers3,
  //     //   name: "Gelombang",
  //     //   to: { name: "AdminGelombang" },
  //     // },
  //   ],
  // },

  {
    title: "Akademik",
    items: [
      {
        icon: School,
        name: "Kelas",
        to:
          auth.role === ROLES.GURU
            ? { name: "GuruKelasSaya" }
            : { name: "AdminKelas" },
        activeNames: ["AdminKelas", "AdminKelasDetail", "GuruKelasSaya"],
        meta: { role: [ROLES.ADMIN, ROLES.GURU] },
      },
      {
        icon: UserRoundCheck,
        name: "Guru Kelas",
        to: { name: "AdminGuruKelas" },
        activeNames: ["AdminGuruKelas"],
        meta: { role: [ROLES.ADMIN] },
      },
      {
        icon: Shuffle,
        name: "Pembagian Kelas",
        to: { name: "AdminPembagianKelas" },
        activeNames: ["AdminPembagianKelas"],
        meta: { role: [ROLES.ADMIN] },
      },
      {
        icon: UsersRound,
        name: "Siswa",
        to: { name: "AdminSiswa" },
        activeNames: [
          "AdminSiswa",
          "AdminSiswaDetail",
          "GuruSiswa",
          "GuruSiswaDetail",
        ],
        meta: { role: [ROLES.ADMIN] },
      },
      {
        icon: PieChartIcon,
        name: "Monitoring",
        to: { name: "AdminMonitoring" },
        activeNames: ["AdminMonitoring", "AdminMonitoringDetail"],
        meta: { role: [ROLES.ADMIN, ROLES.GURU] },
      },
    ],
  },

  {
    title: "Kelola",
    items: [
      {
        icon: UserCog,
        name: "User",
        to: { name: "AdminUser" },
        activeNames: ["AdminUser"],
        meta: { role: [ROLES.ADMIN] },
      },
      {
        icon: CalendarDays,
        name: "Tahun Ajaran",
        to: { name: "AdminTahunAjaran" },
        activeNames: ["AdminTahunAjaran", "AdminTahunAjaranDetail"],
        meta: { role: [ROLES.ADMIN] },
      },
      ,
      // {
      //   icon: CalendarClock,
      //   name: "Gelombang",
      //   to: { name: "AdminGelombang" },
      //   meta: { role: [ROLES.ADMIN] },
      // },
      {
        icon: NotepadText,
        name: "Observasi",
        subItems: [
          {
            name: "Asesmen",
            to: { name: "AdminAsesmenObservasi" },
            activeNames: ["AdminAsesmenObservasi"],
            meta: { role: [ROLES.ADMIN] },
          },
          {
            name: "KPSP",
            to: { name: "AdminKpspObservasi" },
            activeNames: ["AdminKpspObservasi"],
            meta: { role: [ROLES.ADMIN] },
          },
          {
            name: "GPPH",
            to: { name: "AdminGpphObservasi" },
            activeNames: ["AdminGpphObservasi"],
            meta: { role: [ROLES.ADMIN] },
          },
        ],
        meta: { role: [ROLES.ADMIN] },
      },
    ],
  },
];

const findActiveSubmenuKey = () => {
  for (
    let groupIndex = 0;
    groupIndex < filteredMenuGroups.value.length;
    groupIndex++
  ) {
    const group = filteredMenuGroups.value[groupIndex];

    for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
      const item = group.items[itemIndex];

      if (item.subItems?.some((subItem) => isActive(subItem))) {
        return `${groupIndex}-${itemIndex}`;
      }
    }
  }

  return null;
};

const isSubmenuActive = (groupIndex, itemIndex) => {
  const item = filteredMenuGroups.value[groupIndex]?.items[itemIndex];

  return item?.subItems?.some((subItem) => isActive(subItem));
};

const filteredMenuGroups = computed(() => {
  return menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        canAccess(auth.role, item.meta?.role),
      ),
    }))
    .filter((group) => group.items.length > 0);
});

const isActive = (itemOrTo) => {
  if (!itemOrTo) return false;

  if (itemOrTo.activeNames) {
    return itemOrTo.activeNames.includes(route.name);
  }

  const to = itemOrTo.to || itemOrTo;

  if (to.name) {
    return route.name === to.name;
  }

  if (to.path) {
    return route.path === to.path || route.path.startsWith(`${to.path}/`);
  }

  return false;
};

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;

  const item = filteredMenuGroups.value[groupIndex]?.items[itemIndex];

  return (
    openSubmenu.value === key ||
    item?.subItems?.some((subItem) => isActive(subItem))
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

watch(
  () => route.name,
  async () => {
    const activeKey = findActiveSubmenuKey();

    openSubmenu.value = activeKey;

    await nextTick();

    const activeEl = document.querySelector(".menu-dropdown-item-active");

    if (activeEl && sidebarScrollRef.value) {
      activeEl.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  },
  { immediate: true },
);
</script>
