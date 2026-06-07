<template>
  <div class="mt-4">
    <!-- view mode -->
    <div v-if="!isEditPeserta">
      <div class="mb-4">
        <h3 class="font-medium text-gray-700 flex items-center gap-2 mb-4">
          <Users class="w-5 h-5" />
          Data Orangtua/Wali
        </h3>

        <h4 class="text-sm font-semibold mb-2">Ayah</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="field in orangTuaAyahFields"
            :key="field.key"
            class="space-y-1"
          >
            <p class="text-sm text-gray-500">
              {{ field.label }}
            </p>

            <p class="text-sm text-gray-700 font-medium uppercase">
              {{ detail.ayah[field.key] || "-" }}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-semibold mb-2">Ibu</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="field in orangTuaIbuFields"
            :key="field.key"
            class="space-y-1"
          >
            <p class="text-sm text-gray-500">
              {{ field.label }}
            </p>

            <p class="text-sm text-gray-700 font-medium uppercase">
              {{ detail.ibu[field.key] || "-" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- edit mode -->
    <div v-else class="space-y-8">
      <div>
        <div class="mb-4">
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Users class="w-5 h-5" />
            Data Orangtua/Wali
          </h3>

          <h4 class="text-sm font-semibold mb-2">Ayah</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in orangTuaAyahFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>

              <input
                v-model="form.ayah[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h4 class="text-sm font-semibold mb-2">Ibu</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in orangTuaIbuFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>

              <input
                v-model="form.ibu[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Users } from "lucide-vue-next";

defineProps({
  detail: {
    type: Object,
    required: true,
  },

  form: {
    type: Object,
    required: true,
  },

  isEditPeserta: {
    type: Boolean,
    default: false,
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
</script>
