<template>
  <div class="">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">
        {{ isGuru ? "Kelas" : "Detail Kelas" }}
      </h1>

      <nav v-if="!isGuru" class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink :to="{ name: 'AdminKelas' }" class="hover:text-slate-700">
          Kelas
        </RouterLink>

        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />

        <span class="text-slate-700 font-medium">Detail</span>
      </nav>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
      <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-gray-500">Kelas</p>

            <h2 class="text-2xl font-medium text-gray-800 mt-1">
              {{ emptyMessage ? "-" : formatKelas(kelas) }}
            </h2>

            <p class="text-sm mt-2 text-slate-700">
              {{
                emptyMessage
                  ? emptyMessage
                  : `Tahun ajaran ${kelas?.tahun_ajaran?.label || "-"}`
              }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-sm text-gray-500">Siswa</p>
            <p class="text-2xl text-gray-700">
              {{ jumlahSiswa }}/{{ kelas?.kapasitas || 0 }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-6">
          <div class="rounded-lg border border-gray-200 p-3">
            <p class="text-xs text-gray-500">Jenjang</p>
            <p class="font-semibold text-gray-700 uppercase">
              {{ kelas?.jenjang || "-" }}
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 p-3">
            <p class="text-xs text-gray-500">Kelompok</p>
            <p class="font-semibold text-gray-700 uppercase">
              {{ kelas?.kelompok || "-" }}
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 p-3">
            <p class="text-xs text-gray-500">Jumlah Guru</p>
            <p class="font-semibold text-gray-700">
              {{ guruKelas.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="font-medium text-gray-700">Guru Kelas</h2>
          </div>
        </div>

        <div v-if="guruKelas.length > 0" class="space-y-2">
          <div
            v-for="item in guruKelas"
            :key="item.id"
            class="border-b border-gray-200"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm text-gray-700 truncate">
                  {{ item.guru?.full_name || "-" }}
                </p>
              </div>

              <span class="shrink-0 text-sm text-gray-500 capitalize">
                {{ item.peran }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="text-sm text-gray-500 text-center">
          Belum ada guru kelas
        </div>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div class="p-4 border-b">
        <h2 class="font-medium text-gray-700">Daftar Siswa</h2>
      </div>

      <KelasSiswaTable :items="siswaKelas" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "@/lib/stores/auth";
import { ROLES } from "@/lib/constants/roles";
import { showError } from "@/lib/utils/toast";

import { getKelasById } from "@/lib/services/kelasService";
import { getMyGuruKelas } from "@/lib/services/guruKelasService";

import KelasSiswaTable from "@/components/admin/KelasSiswaTable.vue";
import { ChevronRight } from "lucide-vue-next";

const route = useRoute();
const auth = useAuthStore();

const isGuru = computed(() => auth.role === ROLES.GURU);

const kelas = ref(null);
const loading = ref(false);
const emptyMessage = ref("");

const siswaKelas = computed(() => kelas.value?.siswa_kelas || []);
const guruKelas = computed(() => kelas.value?.guru_kelas || []);

const jumlahSiswa = computed(() => {
  return kelas.value?.jumlah_siswa || siswaKelas.value.length;
});

const formatKelas = (kelas) => {
  if (!kelas) return "-";

  const jenjang = kelas.jenjang ? kelas.jenjang.toUpperCase() : "";
  const kelompok = kelas.kelompok ? kelas.kelompok.toUpperCase() : "";
  const nama = kelas.nama || "";

  if (kelas.jenjang === "kb") return nama;
  if (kelompok && nama) return `${jenjang}-${kelompok} ${nama}`;
  if (kelompok) return `${jenjang}-${kelompok}`;

  return nama || jenjang || "-";
};

const loadDetail = async () => {
  try {
    loading.value = true;
    emptyMessage.value = "";

    let id = route.params.id;

    if (isGuru.value && !id) {
      const res = await getMyGuruKelas();
      id = res.data?.[0]?.kelas?.id;

      if (!id) {
        kelas.value = null;
        emptyMessage.value =
          "Anda belum ditugaskan sebagai guru kelas pada tahun ajaran aktif.";
        return;
      }
    }

    if (!id) return;

    const res = await getKelasById(id);
    kelas.value = res.data;
  } catch (err) {
    kelas.value = null;

    if (isGuru.value) {
      emptyMessage.value =
        err.message || "Anda belum ditugaskan sebagai guru kelas.";
      return;
    }

    showError(err.message || "Gagal memuat detail kelas");
  } finally {
    loading.value = false;
  }
};

onMounted(loadDetail);

watch(
  () => route.params.id,
  () => {
    kelas.value = null;
    loadDetail();
  },
);
</script>
