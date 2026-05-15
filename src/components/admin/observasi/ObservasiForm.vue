<template>
  <div class="space-y-5">
    <div>
      <h3 class="font-medium text-gray-700 mb-1">
        Deteksi Dini Gangguan Pemusatan Perhatian Hiperaktivitas (GPPH) Anak
        Prasekolah
      </h3>
      <p class="text-sm text-gray-500 mb-1">
        {{
          isSubmitted
            ? "Data hasil observasi GPPH"
            : "Isi nilai setiap pertanyaan dengan skala 0 sampai 3."
        }}
      </p>
      <div class="text-sm text-gray-500 space-y-2">
        <p class="">Skala penilaian:</p>
        <ul class="space-y-2">
          <li>0 = Tidak ditemukan pada anak</li>
          <li>1 = Kadang-kadang ditemukan pada anak</li>
          <li>2 = Sering ditemukan pada anak</li>
          <li>3 = Selalu ada pada anak</li>
        </ul>
      </div>
    </div>

    <div v-if="loading" class="text-sm text-gray-500">Memuat pertanyaan...</div>

    <div v-else class="space-y-3">
      <div
        v-for="item in pertanyaan"
        :key="item.id"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex items-start gap-3">
          <!-- <div
            class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-sm flex items-center justify-center shrink-0"
          >
            {{ item.nomor }}
          </div> -->

          <div class="flex-1">
            <p class="text-sm text-gray-700 font-medium mb-3">
              {{ item.nomor }}. {{ item.pertanyaan }}
            </p>

            <div class="flex flex-wrap gap-8">
              <label
                v-for="nilai in nilaiOptions"
                :key="nilai.value"
                class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  v-model="jawaban[item.id]"
                  type="radio"
                  :name="`gpph-${item.id}`"
                  :value="nilai.value"
                  :disabled="isSubmitted"
                  class="w-4 h-4"
                />
                <span>{{ nilai.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end pt-4">
        <!-- <p class="text-sm text-gray-600">
          Total Skor:
          <span class="font-semibold text-gray-800">{{ totalSkor }}</span>
        </p> -->
        <button
          v-if="!isSubmitted"
          @click="handleSubmit"
          :disabled="submitting"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {{ submitting ? "Menyimpan..." : "Simpan" }}
        </button>
      </div>

      <div
        v-if="hasil"
        class="border border-gray-200 rounded-xl p-4 bg-gray-50 w-full max-w-md"
      >
        <h4 class="font-medium text-gray-700 mb-3">Hasil Observasi GPPH</h4>

        <div class="grid grid-cols-5 gap-2 text-sm">
          <div class="bg-white border rounded-lg p-2 text-center min-w-0">
            <p class="text-gray-500 text-[11px]">Nilai 0</p>
            <p class="font-semibold text-base">
              {{ hasil.jumlah["0"] }}
            </p>
          </div>

          <div class="bg-white border rounded-lg p-2 text-center min-w-0">
            <p class="text-gray-500 text-[11px]">Nilai 1</p>
            <p class="font-semibold text-base">
              {{ hasil.jumlah["1"] }}
            </p>
          </div>

          <div class="bg-white border rounded-lg p-2 text-center min-w-0">
            <p class="text-gray-500 text-[11px]">Nilai 2</p>
            <p class="font-semibold text-base">
              {{ hasil.jumlah["2"] }}
            </p>
          </div>

          <div class="bg-white border rounded-lg p-2 text-center min-w-0">
            <p class="text-gray-500 text-[11px]">3</p>
            <p class="font-semibold text-base">
              {{ hasil.jumlah["3"] }}
            </p>
          </div>

          <div
            class="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center min-w-0"
          >
            <p class="text-blue-600 text-[11px]">Total</p>
            <p class="font-bold text-base text-blue-700">
              {{ hasil.total_nilai }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getPertanyaanGpph,
  createObservasiGpph,
  getHasilObservasiGpph,
} from "@/lib/services/observasiService";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const props = defineProps({
  pendaftaranId: {
    type: Number,
    required: true,
  },
  detail: {
    type: Object,
    default: () => ({}),
  },
});

const loading = ref(false);
const submitting = ref(false);
const pertanyaan = ref([]);
const jawaban = ref({});
const isSubmitted = ref(false);
const hasil = ref(null);

const nilaiOptions = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
];

const totalSkor = computed(() => {
  return Object.values(jawaban.value).reduce((total, nilai) => {
    return total + Number(nilai || 0);
  }, 0);
});

const fetchPertanyaan = async () => {
  try {
    loading.value = true;

    const res = await getPertanyaanGpph();

    pertanyaan.value = res.data || [];

    pertanyaan.value.forEach((item) => {
      jawaban.value[item.id] ??= null;
    });
  } catch (err) {
    showError(err.message || "Gagal memuat pertanyaan GPPH");
  } finally {
    loading.value = false;
  }
};

const isComplete = computed(() => {
  return pertanyaan.value.every((item) => jawaban.value[item.id] !== null);
});

const handleSubmit = async () => {
  if (!isComplete.value) {
    showWarning("Semua pertanyaan GPPH wajib diisi");
    return;
  }

  try {
    submitting.value = true;

    const payload = {
      jawaban: pertanyaan.value.map((item) => ({
        pertanyaan_id: item.id,
        nilai: Number(jawaban.value[item.id]),
      })),
    };

    await createObservasiGpph(props.pendaftaranId, payload);

    showSuccess("Observasi GPPH berhasil disimpan");

    isSubmitted.value = true;

    await fetchHasil();
  } catch (err) {
    showError(err.message || "Gagal menyimpan observasi GPPH");
  } finally {
    submitting.value = false;
  }
};

const fetchHasil = async () => {
  try {
    const res = await getHasilObservasiGpph(props.pendaftaranId);

    const data = res?.data;

    if (!data || !Array.isArray(data.jawaban) || data.jawaban.length === 0) {
      hasil.value = null;
      isSubmitted.value = false;

      pertanyaan.value.forEach((item) => {
        jawaban.value[item.id] = null;
      });

      return;
    }

    hasil.value = data;
    isSubmitted.value = true;

    data.jawaban.forEach((item) => {
      jawaban.value[item.pertanyaan_id] = item.nilai;
    });
  } catch (err) {
    hasil.value = null;
    isSubmitted.value = false;

    if (err.code !== 404) {
      showError(err.message || "Gagal memuat hasil observasi");
    }
  }
};

onMounted(async () => {
  await fetchPertanyaan();
  await fetchHasil();
});
</script>
