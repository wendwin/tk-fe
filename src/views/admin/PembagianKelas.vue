<template>
  <div>
    <div class="mb-5">
      <h1 class="text-lg text-gray-700 font-medium">Pembagian Kelas</h1>
      <p class="text-sm text-gray-500">
        Atur penempatan siswa berdasarkan tahun ajaran, kelas tujuan, program,
        usia, dan hasil observasi.
      </p>
    </div>

    <!-- Filter -->
    <div class="bg-white border border-gray-200 rounded-xl p-4 mb-5">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="text-sm text-gray-600">Tahun Ajaran</label>
          <select
            v-model="tahunAjaranId"
            class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Pilih tahun ajaran</option>
            <option
              v-for="tahun in tahunAjaranOptions"
              :key="tahun.id"
              :value="tahun.id"
            >
              {{ tahun.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">Kelas Tujuan</label>
          <select
            v-model="kelasId"
            class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Pilih kelas</option>
            <option
              v-for="kelas in filteredKelas"
              :key="kelas.id"
              :value="kelas.id"
            >
              {{ kelas.nama }}
            </option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">Program</label>
          <select
            v-model="program"
            class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Semua</option>
            <option value="reguler">Reguler</option>
            <option value="halfday">Halfday</option>
            <option value="fullday">Fullday</option>
          </select>
        </div>

        <div class="flex items-end gap-2">
          <button
            @click="loadData"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
          >
            Tampilkan
          </button>

          <button
            @click="handleGenerate"
            :disabled="!canGenerate"
            class="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
          >
            Generate
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Unassigned -->
      <div class="bg-white border border-gray-200 rounded-xl">
        <div class="p-4 border-b flex items-center justify-between">
          <div>
            <h2 class="font-medium text-gray-700">Siswa Belum Masuk Kelas</h2>
            <p class="text-sm text-gray-500">{{ unassigned.length }} siswa</p>
          </div>
        </div>

        <div class="p-4 space-y-3 min-h-[400px]">
          <div v-if="loading" class="text-sm text-gray-500">Memuat data...</div>

          <div
            v-else-if="unassigned.length === 0"
            class="text-sm text-gray-500 text-center py-10"
          >
            Tidak ada siswa
          </div>

          <div
            v-for="siswa in unassigned"
            :key="siswa.id"
            draggable="true"
            @dragstart="dragSiswa = siswa"
            class="border rounded-xl p-4 cursor-move hover:bg-gray-50"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-medium text-gray-700">
                  {{ siswa.nama_lengkap }}
                </h3>

                <p class="text-sm text-gray-500">
                  {{ siswa.jenis.toUpperCase() }} | {{ siswa.umur }} |
                  {{ siswa.jenis_kelamin }} |
                  {{ siswa.program }}
                </p>

                <p class="text-xs text-gray-500 mt-1">
                  GPPH: {{ siswa.observasi?.gpph_total ?? "-" }} | KPSP:
                  {{ siswa.observasi?.kpsp_total_ya ?? "-" }}/10
                </p>

                <p
                  v-if="siswa.observasi?.catatan"
                  class="text-xs text-gray-500 mt-1"
                >
                  Catatan: {{ siswa.observasi.catatan }}
                </p>
              </div>

              <button
                @click="moveToTarget(siswa)"
                class="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white"
              >
                <UserPlus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Target class -->
      <div
        class="bg-white border border-gray-200 rounded-xl"
        @dragover.prevent
        @drop="handleDrop"
      >
        <div class="p-4 border-b flex items-center justify-between">
          <div>
            <h2 class="font-medium text-gray-700">
              {{ selectedKelas?.nama || "Kelas Tujuan" }}
            </h2>
            <p class="text-sm text-gray-500">
              Kapasitas {{ totalTarget }}/{{ selectedKelas?.kapasitas || 15 }}
            </p>
          </div>

          <button
            @click="handleSave"
            :disabled="selectedDraft.length === 0 || saving"
            class="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
          >
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>

        <div class="p-4 space-y-3 min-h-[400px]">
          <div
            v-if="targetStudents.length === 0"
            class="text-sm text-gray-500 text-center py-10"
          >
            Belum ada siswa di kelas ini
          </div>

          <div
            v-for="item in targetStudents"
            :key="item.key"
            class="border rounded-xl p-4"
            :class="item.isDraft ? 'bg-blue-50 border-blue-200' : 'bg-white'"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-medium text-gray-700">
                  {{ item.nama_lengkap }}
                </h3>

                <p class="text-sm text-gray-500">
                  {{ item.umur || "-" }} bulan |
                  {{ item.jenis_kelamin || "-" }}
                </p>

                <!-- <p v-if="item.isDraft" class="text-xs text-blue-600 mt-1">
                  Belum disimpan
                </p> -->
              </div>

              <button
                v-if="item.isDraft"
                @click="removeDraft(item.id)"
                class="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600"
              >
                <UserMinus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import {
  getAllKelas,
  getSiswaBelumMasukKelas,
  getRekomendasiSiswaKelas,
  getSiswaDalamKelas,
  bulkAssignSiswaKelas,
} from "@/lib/services/pembagianKelasService";

import { UserMinus, UserPlus } from "lucide-vue-next";

const kelasList = ref([]);
const tahunAjaranId = ref("");
const kelasId = ref("");
const program = ref("");

const unassigned = ref([]);
const existingStudents = ref([]);
const selectedDraft = ref([]);

const dragSiswa = ref(null);
const loading = ref(false);
const saving = ref(false);

const tahunAjaranOptions = computed(() => {
  const map = new Map();

  kelasList.value.forEach((kelas) => {
    if (kelas.tahun_ajaran) {
      map.set(kelas.tahun_ajaran.id, kelas.tahun_ajaran);
    }
  });

  return Array.from(map.values());
});

const filteredKelas = computed(() => {
  if (!tahunAjaranId.value) return kelasList.value;

  return kelasList.value.filter(
    (kelas) => kelas.tahun_ajaran_id === Number(tahunAjaranId.value),
  );
});

const selectedKelas = computed(() => {
  return kelasList.value.find((kelas) => kelas.id === Number(kelasId.value));
});

const totalTarget = computed(() => {
  return existingStudents.value.length + selectedDraft.value.length;
});

const canGenerate = computed(() => {
  return tahunAjaranId.value && kelasId.value;
});

const targetStudents = computed(() => {
  const existing = existingStudents.value.map((item) => ({
    key: `existing-${item.id}`,
    id: item.siswa?.id,
    nama_lengkap: item.siswa?.nama_lengkap,
    jenis_kelamin: item.siswa?.jenis_kelamin,
    umur_bulan: null,
    isDraft: false,
  }));

  const draft = selectedDraft.value.map((item) => ({
    key: `draft-${item.id}`,
    ...item,
    isDraft: true,
  }));

  return [...existing, ...draft];
});

const buildQuery = () => {
  const params = new URLSearchParams();

  if (tahunAjaranId.value) {
    params.append("tahun_ajaran_id", tahunAjaranId.value);
  }

  if (kelasId.value) {
    params.append("kelas_id", kelasId.value);
  }

  if (program.value) {
    params.append("program", program.value);
  }

  return `?${params.toString()}`;
};

const loadKelas = async () => {
  const res = await getAllKelas();
  kelasList.value = res.data || [];
};

const loadData = async () => {
  if (!tahunAjaranId.value || !kelasId.value) {
    showWarning("Pilih tahun ajaran dan kelas terlebih dahulu");
    return;
  }

  try {
    loading.value = true;
    selectedDraft.value = [];

    const [resUnassigned, resKelas] = await Promise.all([
      getSiswaBelumMasukKelas(buildQuery()),
      getSiswaDalamKelas(
        `?kelas_id=${kelasId.value}&tahun_ajaran_id=${tahunAjaranId.value}`,
      ),
    ]);

    unassigned.value = resUnassigned.data || [];
    existingStudents.value = resKelas.data || [];
  } catch (err) {
    showError(err.message || "Gagal memuat pembagian kelas");
  } finally {
    loading.value = false;
  }
};

const moveToTarget = (siswa) => {
  const kapasitas = selectedKelas.value?.kapasitas || 15;

  if (totalTarget.value >= kapasitas) {
    showWarning("Kapasitas kelas sudah penuh");
    return;
  }

  selectedDraft.value.push(siswa);
  unassigned.value = unassigned.value.filter((item) => item.id !== siswa.id);
};

const removeDraft = (id) => {
  const siswa = selectedDraft.value.find((item) => item.id === id);

  if (siswa) {
    unassigned.value.unshift(siswa);
  }

  selectedDraft.value = selectedDraft.value.filter((item) => item.id !== id);
};

const handleDrop = () => {
  if (!dragSiswa.value) return;

  moveToTarget(dragSiswa.value);
  dragSiswa.value = null;
};

const handleGenerate = async () => {
  try {
    if (!canGenerate.value) {
      showWarning("Pilih tahun ajaran dan kelas terlebih dahulu");
      return;
    }

    const params = new URLSearchParams({
      tahun_ajaran_id: tahunAjaranId.value,
      kelas_id: kelasId.value,
    });

    if (program.value) params.append("program", program.value);

    const res = await getRekomendasiSiswaKelas(`?${params.toString()}`);

    selectedDraft.value = [];
    const rekomendasi = res.data || [];

    rekomendasi.forEach((siswa) => {
      moveToTarget(siswa);
    });
  } catch (err) {
    showError(err.message || "Gagal membuat rekomendasi kelas");
  }
};

const handleSave = async () => {
  try {
    if (selectedDraft.value.length === 0) return;

    saving.value = true;

    await bulkAssignSiswaKelas({
      kelas_id: Number(kelasId.value),
      tahun_ajaran_id: Number(tahunAjaranId.value),
      siswa_ids: selectedDraft.value.map((item) => item.id),
    });

    showSuccess("Pembagian kelas berhasil disimpan");

    await loadData();
  } catch (err) {
    showError(err.message || "Gagal menyimpan pembagian kelas");
  } finally {
    saving.value = false;
  }
};

watch([tahunAjaranId, kelasId, program], () => {
  unassigned.value = [];
  existingStudents.value = [];
  selectedDraft.value = [];
});

onMounted(async () => {
  await loadKelas();
});
</script>
