<template>
  <div>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div
        class="px-6 pt-5 pb-4 border-b border-gray-200 flex items-start gap-3"
      >
        <div>
          <h2 class="text-[16px] font-semibold mb-1">
            Asesmen Orang Tua/Wali Murid
          </h2>

          <div class="flex items-start gap-2 text-sm text-gray-500">
            <CircleAlert class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div class="max-w-xl">
              <p>
                Asesmen terdiri dari 11 pertanyaan yang wajib diisi. Pastikan
                untuk menjawab dengan jujur dan lengkap agar kami dapat
                memberikan layanan terbaik untuk Anda dan anak Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-5 space-y-5">
        <div>
          <div
            v-for="item in pertanyaanList"
            :key="item.id"
            class="space-y-1 mb-5"
          >
            <label class="block text-sm font-medium text-gray-700 mb-3">
              {{ item.urutan }}. {{ item.pertanyaan }}
              <span class="text-red-500">*</span>
            </label>

            <textarea
              v-model="item.value"
              :readonly="isSubmitted"
              rows="2"
              placeholder="Tulis jawaban Anda..."
              class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10"
            ></textarea>
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button
            @click="submitAsesmen"
            :disabled="loading || isSubmitted"
            class="h-9 px-5 rounded-lg bg-brand-500 text-white text-sm hover:bg-brand-600 disabled:opacity-50"
          >
            {{
              isSubmitted
                ? "Sudah Disimpan"
                : loading
                  ? "Menyimpan..."
                  : "Simpan"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { getPertanyaanAsesmen } from "@/lib/services/asesmenService";
import { createJawabanAsesmen } from "@/lib/services/asesmenService";
import { CircleAlert } from "lucide-vue-next";

const loading = ref(false);
const isSubmitted = ref(false);
const pertanyaanList = ref([]);
const props = defineProps({
  pendaftaranId: {
    type: Number,
    required: true,
  },
  pertanyaan: {
    type: Array,
    default: () => [],
  },
  initialJawaban: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["submitted"]);

const submitAsesmen = async () => {
  try {
    const isValid = pertanyaanList.value.every(
      (item) => item.value && item.value.trim() !== "",
    );

    if (!isValid) {
      showWarning("Semua pertanyaan wajib diisi");
      return;
    }

    loading.value = true;

    const payload = {
      id_pendaftaran: props.pendaftaranId,
      jawaban: pertanyaanList.value.map((item) => ({
        id_pertanyaan: item.id,
        jawaban: item.value,
      })),
    };

    await createJawabanAsesmen(payload);

    isSubmitted.value = true;
    emit("submitted");
  } catch (err) {
    showError(err.message || "Gagal menyimpan jawaban");
  } finally {
    loading.value = false;
  }
};

watch(
  () => [props.pertanyaan, props.initialJawaban],
  ([pertanyaan, jawaban]) => {
    if (!pertanyaan || pertanyaan.length === 0) return;

    pertanyaanList.value = pertanyaan.map((item) => {
      const found = jawaban?.find((j) => j.id_pertanyaan === item.id);

      return {
        id: item.id,
        pertanyaan: item.pertanyaan,
        urutan: item.urutan,
        value: found ? found.jawaban : "",
      };
    });

    isSubmitted.value = (jawaban || []).length > 0;
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
