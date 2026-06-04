<template>
  <div>
    <div class="mt-4">
      <!-- view mode -->
      <div v-if="!isEditPeserta" class="">
        <!-- peserta -->
        <div class="">
          <h3 class="font-medium text-gray-700 flex items-center gap-2 mb-4">
            <User class="w-5 h-5" /> Data Peserta
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in pesertaFields"
              :key="field.key"
              class="space-y-1"
            >
              <p class="text-sm text-gray-500">
                {{ field.label }}
              </p>
              <p class="text-sm text-gray-700 font-medium uppercase">
                {{ detail.peserta[field.key] || "-" }}
              </p>
            </div>
          </div>
        </div>

        <!-- alamat domisili -->
        <div class="">
          <h3
            class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <MapPinCheck class="w-5 h-5" /> Alamat Domisili
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in alamatFields"
              :key="field.key"
              class="space-y-1"
            >
              <p class="text-sm text-gray-500">
                {{ field.label }}
              </p>
              <p class="text-sm text-gray-700 font-medium uppercase">
                {{ detail.alamat[field.key] || "-" }}
              </p>
            </div>
          </div>
        </div>

        <!-- alamat rumah -->
        <div class="">
          <h3
            class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <MapPin class="w-5 h-5" /> Alamat Rumah
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in alamatFields"
              :key="field.key"
              class="space-y-1"
            >
              <p class="text-sm text-gray-500">
                {{ field.label }}
              </p>
              <p class="text-sm text-gray-700 font-medium uppercase">
                {{ detail.alamat[field.key] || "-" }}
              </p>
            </div>
          </div>
        </div>

        <!-- kesehatan -->
        <div class="">
          <h3
            class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <Hospital class="h-5 w-5" /> Data Kesehatan Anak
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in kesehatanFields"
              :key="field.key"
              class="space-y-1"
            >
              <p class="text-sm text-gray-500">
                {{ field.label }}
              </p>
              <p class="text-sm text-gray-700 font-medium uppercase">
                {{ detail.kesehatan[field.key] || "-" }}
              </p>
            </div>
          </div>
        </div>

        <!-- informasi -->
        <div class="">
          <h3
            class="mt-8 font-medium text-gray-700 mb-3 flex items-center gap-2"
          >
            <Info class="h-5 w-5" /> Informasi Lain-lain
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in informasiFields"
              :key="field.key"
              class="space-y-1"
            >
              <p class="text-sm text-gray-500">
                {{ field.label }}
              </p>
              <p class="text-sm text-gray-700 font-medium uppercase">
                {{ detail.informasi[field.key] || "-" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- edit mode -->
      <div v-else class="space-y-8">
        <!-- peserta -->
        <div>
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <User class="w-5 h-5" /> Data Peserta
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in pesertaFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>
              <input
                v-model="form.peserta[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <!-- alamat domisili -->
        <div>
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <MapPinCheck class="w-5 h-5" /> Alamat Domisili
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in alamatFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>
              <input
                v-model="form.alamat[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <!-- alamat rumah -->
        <div>
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <MapPin class="w-5 h-5" /> Alamat Rumah
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in alamatFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>
              <input
                v-model="form.alamat[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <!-- kesehatan -->
        <div>
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Hospital class="w-5 h-5" /> Data Kesehatan Anak
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in kesehatanFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>
              <input
                v-model="form.kesehatan[field.key]"
                class="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <!-- informasi -->
        <div>
          <h3 class="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Info class="w-5 h-5" /> Informasi Lain-lain
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="field in informasiFields"
              :key="field.key"
              class="space-y-1"
            >
              <label class="text-sm text-gray-500">
                {{ field.label }}
              </label>
              <input
                v-model="form.informasi[field.key]"
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
import { ref } from "vue";
import {
  SquarePen,
  ChevronRight,
  School,
  User,
  MapPinCheck,
  MapPin,
  Hospital,
  Users,
  Info,
} from "lucide-vue-next";

defineProps({
  detail: Object,
  form: Object,
  isEditPeserta: Boolean,

  pesertaFields: Array,
  alamatFields: Array,
  kesehatanFields: Array,
  informasiFields: Array,
});
</script>

<style lang="scss" scoped></style>
