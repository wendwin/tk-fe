<template>
  <div class="space-y-5">
    <div>
      <h3 class="font-medium text-gray-700 mb-1">
        Kuesioner Pra Skrining Perkembangan (KPSP)
      </h3>

      <p class="text-sm text-gray-600">Usia saat ini: {{ umur }}</p>

      <p class="text-sm text-gray-600">
        {{
          isSubmitted
            ? "Data hasil observasi KPSP"
            : `KPSP usia ${usiaBulan} bulan`
        }}
      </p>
    </div>

    <div v-if="loading" class="text-sm text-gray-600">Memuat pertanyaan...</div>

    <div v-else class="space-y-4">
      <div
        v-for="item in pertanyaan"
        :key="item.id"
        :class="[
          'rounded-lg p-4 transition',
          errors[item.id]
            ? 'border border-red-400 bg-red-50/30 error-field'
            : 'border border-gray-200',
        ]"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <p class="text-sm font-medium text-gray-800">
              {{ item.aspek_perkembangan }}
            </p>

            <p class="text-sm text-gray-700">
              {{ item.urutan }}. {{ item.kemampuan_anak }}
              <span class="text-red-500">*</span>
            </p>
          </div>
        </div>

        <div class="">
          <div class="flex gap-6 mb-2 text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="jawaban[item.id]"
                type="radio"
                :name="`kpsp-${item.id}`"
                value="ya"
                :disabled="isSubmitted || readonly"
                @change="delete errors[item.id]"
              />
              Ya
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="jawaban[item.id]"
                type="radio"
                :name="`kpsp-${item.id}`"
                value="tidak"
                :disabled="isSubmitted || readonly"
                @change="delete errors[item.id]"
              />
              Tidak
            </label>
          </div>

          <div v-if="errors[item.id]" class="text-xs text-red-500">
            {{ errors[item.id] }}
          </div>
        </div>

        <textarea
          v-model="keterangan[item.id]"
          :disabled="isSubmitted || readonly"
          rows="2"
          placeholder="Keterangan"
          class="w-full border rounded-lg px-3 py-2 text-sm mt-2"
        />
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-sm text-gray-600"> Catatan Observasi </label>

          <textarea
            v-model="catatan"
            :disabled="isSubmitted"
            rows="3"
            class="w-full border rounded-lg px-3 py-2 text-sm text-gray-700"
          />
        </div>

        <div class="flex justify-end">
          <button
            v-if="!isSubmitted && !readonly"
            @click="handleSubmit"
            :disabled="submitting"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
          >
            {{ submitting ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </div>

      <!-- <div v-if="hasil" class="border rounded-xl p-4 bg-gray-50">
        <h4 class="font-medium text-gray-700 mb-2">Hasil KPSP</h4>

        <div class="space-y-2 text-sm">
          <div class="flex gap-2">
            <span class="text-gray-600">Ya:</span>
            <span class="font-medium">
              {{ totalYa }}
            </span>
          </div>

          <div class="flex gap-2">
            <span class="text-gray-600">Tidak:</span>
            <span class="font-medium">
              {{ totalTidak }}
            </span>
          </div>

          <div class="pt-2 border-t">
            <p class="text-gray-600 mb-1">Catatan:</p>

            <p class="text-gray-700">
              {{ hasil.catatan || "-" }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import {
  getPertanyaanKpsp,
  createObservasiKpsp,
  getHasilObservasiKpsp,
} from "@/lib/services/observasiService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const props = defineProps({
  pendaftaranId: {
    type: Number,
    required: true,
  },
  umur: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const errors = ref({});
const loading = ref(false);
const submitting = ref(false);

const pertanyaan = ref([]);

const jawaban = ref({});
const keterangan = ref({});

const hasil = ref(null);

const usiaBulan = ref(null);

const catatan = ref("");

const isSubmitted = ref(false);

const totalYa = computed(() => {
  return Object.values(jawaban.value).filter((v) => v === "ya").length;
});

const totalTidak = computed(() => {
  return Object.values(jawaban.value).filter((v) => v === "tidak").length;
});

const fetchPertanyaan = async () => {
  try {
    loading.value = true;

    const res = await getPertanyaanKpsp(props.pendaftaranId);

    pertanyaan.value = res.data?.pertanyaan || [];

    usiaBulan.value = res.data?.usia_bulan;

    pertanyaan.value.forEach((item) => {
      jawaban.value[item.id] ??= null;
      keterangan.value[item.id] ??= "";
    });
  } catch (err) {
    showError(err.message || "Gagal memuat soal KPSP");
  } finally {
    loading.value = false;
  }
};

const fetchHasil = async () => {
  try {
    const res = await getHasilObservasiKpsp(props.pendaftaranId);

    const data = res.data;

    if (!data || !Array.isArray(data.jawaban) || data.jawaban.length === 0) {
      hasil.value = null;
      isSubmitted.value = false;
      return;
    }

    hasil.value = data;
    isSubmitted.value = true;

    catatan.value = data.catatan || "";

    pertanyaan.value = data.jawaban.map((item, index) => ({
      id: item.pertanyaan_id,
      urutan: index + 1,
      usia_bulan: item.usia_bulan,
      aspek_perkembangan: item.aspek_perkembangan,
      kemampuan_anak: item.kemampuan_anak,
    }));

    usiaBulan.value = data.jawaban[0]?.usia_bulan || null;

    data.jawaban.forEach((item) => {
      jawaban.value[item.pertanyaan_id] = item.jawaban;
      keterangan.value[item.pertanyaan_id] = item.keterangan || "";
    });
  } catch (err) {
    hasil.value = null;
    isSubmitted.value = false;

    if (err.code !== 404) {
      showError(err.message || "Gagal memuat hasil KPSP");
    }
  }
};

const isComplete = computed(() => {
  return pertanyaan.value.every((item) => !!jawaban.value[item.id]);
});

const handleSubmit = async () => {
  errors.value = {};

  const unanswered = pertanyaan.value.filter((item) => !jawaban.value[item.id]);

  if (unanswered.length) {
    unanswered.forEach((item) => {
      errors.value[item.id] = "Pertanyaan wajib diisi";
    });

    showWarning("Semua pertanyaan KPSP wajib diisi");

    document.querySelector(".border-red-300")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return;
  }

  try {
    submitting.value = true;

    const payload = {
      catatan: catatan.value,

      jawaban: pertanyaan.value.map((item) => ({
        pertanyaan_id: item.id,
        jawaban: jawaban.value[item.id],
        keterangan: keterangan.value[item.id],
      })),
    };

    await createObservasiKpsp(props.pendaftaranId, payload);

    showSuccess("Observasi KPSP berhasil disimpan");

    isSubmitted.value = true;

    await fetchHasil();
  } catch (err) {
    showError(err.message || "Gagal menyimpan observasi KPSP");
  } finally {
    submitting.value = false;
  }
};

onMounted(async () => {
  await fetchHasil();

  if (!isSubmitted.value && !props.readonly) {
    await fetchPertanyaan();
  }
});
</script>
