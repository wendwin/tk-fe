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
        class="border border-gray-200 rounded-xl p-4"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <p class="text-sm text-gray-600">
              {{ item.aspek_perkembangan }}
            </p>

            <p class="font-medium text-sm text-gray-700">
              {{ item.urutan }}.
              {{ item.kemampuan_anak }}
            </p>
          </div>
        </div>

        <div class="flex gap-6 mb-3 text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="jawaban[item.id]"
              type="radio"
              :name="`kpsp-${item.id}`"
              value="ya"
              :disabled="isSubmitted"
            />
            Ya
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="jawaban[item.id]"
              type="radio"
              :name="`kpsp-${item.id}`"
              value="tidak"
              :disabled="isSubmitted"
            />
            Tidak
          </label>
        </div>

        <textarea
          v-model="keterangan[item.id]"
          :disabled="isSubmitted"
          rows="2"
          placeholder="Keterangan"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-sm text-gray-600"> Catatan Observasi </label>

          <textarea
            v-model="catatan"
            :disabled="isSubmitted"
            rows="3"
            class="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div class="flex justify-end">
          <button
            v-if="!isSubmitted"
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
});

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
  if (!isComplete.value) {
    showWarning("Semua pertanyaan KPSP wajib diisi");

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
  await fetchPertanyaan();
  await fetchHasil();
});
</script>
