<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">
        {{ title }}
      </h1>

      <nav class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink :to="{ name: backRouteName }" class="hover:text-slate-700">
          Home
        </RouterLink>
        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />
        <span class="text-slate-700 font-medium">Detail</span>
      </nav>
    </div>

    <!-- header siswa -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 mb-6">
      <div class="w-full rounded-lg overflow-hidden shadow bg-white">
        <div class="h-16 bg-slate-200"></div>

        <div class="px-6 pb-6 -mt-10">
          <div class="flex items-end justify-between">
            <div
              class="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden shadow"
            >
              <img
                v-if="detail.foto?.file_path"
                :src="detail.foto.file_path"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-purple-700 font-semibold text-xl">
                {{ detail.peserta.nama_lengkap?.charAt(0) }}
              </span>
            </div>

            <p class="text-gray-400 text-sm">
              Daftar: {{ formatDateTimeID(detail.meta.created_at) }}
            </p>
          </div>

          <div class="mt-4">
            <h2 class="text-base font-semibold text-gray-800 mb-1">
              {{ detail.peserta.nama_lengkap || "-" }}
            </h2>

            <div
              class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div class="text-sm space-y-1">
                <p class="text-gray-700">
                  Tahun Ajaran: {{ detail.meta.tahun_ajaran }}
                </p>
                <p class="text-gray-700">
                  No. Pendaftaran: {{ detail.meta.no_pendaftaran }}
                </p>
                <p class="text-gray-700">{{ detail.meta.gelombang }}</p>
                <p class="text-gray-700">
                  Status:
                  <span
                    :class="[
                      'capitalize',
                      statusConfig(detail.meta.status).class,
                    ]"
                  >
                    {{ statusConfig(detail.meta.status).label }}
                  </span>
                </p>
              </div>

              <slot name="header-action" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- tab -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200">
      <div class="border-t px-6 pb-6">
        <div class="flex flex-wrap items-end justify-between">
          <div class="flex flex-wrap gap-2 md:gap-4 border-b mt-4">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="py-2 text-sm border-b-2 transition"
              :class="
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500'
              "
            >
              {{ tab }}
            </button>
          </div>

          <div v-if="canEdit" class="flex gap-2">
            <button
              v-if="!isEditPeserta"
              @click="$emit('start-edit')"
              class="flex items-center gap-2 text-sm px-3 py-1.5 text-slate-600 border rounded-lg hover:bg-gray-100"
            >
              <SquarePen class="w-4 h-4" />
              Edit
            </button>

            <template v-else>
              <button
                @click="$emit('save-edit')"
                :disabled="loading"
                class="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {{ loading ? "Menyimpan..." : "Simpan" }}
              </button>
              <button
                @click="$emit('cancel-edit')"
                class="text-sm px-3 py-1 border rounded-lg"
              >
                Batal
              </button>
            </template>
          </div>
        </div>

        <div class="mt-4">
          <PesertaTab
            v-if="activeTab === 'Peserta' || activeTab === 'Peserta Didik'"
            :detail="detail"
            :form="form"
            :isEditPeserta="isEditPeserta"
            :pesertaFields="pesertaFields"
            :alamatFields="alamatFields"
            :kesehatanFields="kesehatanFields"
            :informasiFields="informasiFields"
          />

          <OrangTuaTab
            v-else-if="activeTab === 'Orang Tua'"
            :detail="detail"
            :form="form"
            :isEditPeserta="isEditPeserta"
            :orangTuaAyahFields="orangTuaAyahFields"
            :orangTuaIbuFields="orangTuaIbuFields"
          />

          <slot v-else name="tab-content" :active-tab="activeTab" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ChevronRight, SquarePen } from "lucide-vue-next";

import PesertaTab from "@/components/admin/PesertaTab.vue";
import OrangTuaTab from "@/components/admin/OrangTuaTab.vue";

import { statusConfig, paymentConfig } from "@/lib/utils/status";
import formatDateTimeID from "@/lib/utils/formatDateTimeID";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backRouteName: {
    type: String,
    required: true,
  },
  detail: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
  isEditPeserta: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  pesertaFields: {
    type: Array,
    default: () => [],
  },
  alamatFields: {
    type: Array,
    default: () => [],
  },
  kesehatanFields: {
    type: Array,
    default: () => [],
  },
  informasiFields: {
    type: Array,
    default: () => [],
  },
  orangTuaAyahFields: {
    type: Array,
    default: () => [],
  },
  orangTuaIbuFields: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["start-edit", "save-edit", "cancel-edit"]);

const activeTab = ref(props.tabs[0] || "");

watch(
  () => props.tabs,
  (newTabs) => {
    if (!newTabs.includes(activeTab.value)) {
      activeTab.value = newTabs[0] || "";
    }
  },
);
</script>

<style lang="scss" scoped></style>
