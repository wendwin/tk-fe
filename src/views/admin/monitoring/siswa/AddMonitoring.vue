<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-lg text-gray-700 font-medium">
        Monitoring Siswa, {{ route.query.nama || "Siswa" }}
      </h1>
      <p class="text-sm text-gray-500 mt-1">
        Pilih minggu monitoring, lalu isi perkembangan anak.
      </p>
    </div>

    <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <div>
        <label class="text-sm font-medium text-gray-700">
          Monitoring Mingguan
        </label>

        <select
          v-model.number="selectedMonitoringId"
          @change="handleSelectMonitoring"
          class="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
        >
          <option :value="null">Pilih monitoring mingguan</option>

          <option
            v-for="item in monitoringMingguanList"
            :key="item.id"
            :value="item.id"
          >
            {{ formatMonth(item.tanggal_mulai) }} - Minggu {{ item.minggu }} -
            {{ item.topik }}
          </option>
        </select>
      </div>

      <div
        v-if="selectedMonitoring"
        class="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        <div class="border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500">Topik</p>
          <p class="text-sm font-medium text-gray-700">
            {{ selectedMonitoring.topik }}
          </p>
        </div>

        <div class="border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500">Sub Topik</p>
          <p class="text-sm font-medium text-gray-700">
            {{ selectedMonitoring.sub_topik }}
          </p>
        </div>

        <div class="border border-gray-200 rounded-lg p-3">
          <p class="text-xs text-gray-500">Tanggal</p>
          <p class="text-sm font-medium text-gray-700">
            {{ selectedMonitoring.tanggal_mulai }} -
            {{ selectedMonitoring.tanggal_selesai }}
          </p>
        </div>
      </div>
    </section>

    <div
      v-if="selectedMonitoring"
      class="rounded-xl border p-4 text-sm"
      :class="
        existingMonitoringSiswa
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-amber-200 bg-amber-50 text-amber-700'
      "
    >
      <p class="font-medium">
        {{
          existingMonitoringSiswa
            ? "Monitoring minggu ini sudah diisi"
            : "Monitoring minggu ini belum diisi"
        }}
      </p>

      <p class="mt-1 text-xs">
        {{
          existingMonitoringSiswa
            ? "Data ditampilkan dalam mode lihat. Klik Edit Monitoring untuk mengubah."
            : "Silakan isi data perkembangan anak untuk minggu yang dipilih."
        }}
      </p>
    </div>

    <form
      v-if="selectedMonitoring"
      @submit.prevent="handleSubmit"
      class="space-y-6"
    >
      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h2 class="font-medium text-gray-700">Ringkasan Perkembangan</h2>
        <textarea
          v-model="form.ringkasan"
          :disabled="isReadonly"
          class="w-full min-h-28 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          placeholder="Tulis ringkasan perkembangan anak..."
        />
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h2 class="font-medium text-gray-700">Checklist Indikator</h2>

        <div v-for="kktp in kktpOptions" :key="kktp.id" class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-gray-700">
                {{ kktp.deskripsi }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ kktp.elemen }} - {{ kktp.tujuan }}
              </p>
            </div>

            <label class="flex items-center gap-2 text-sm">
              <input
                v-model="indikatorMap[kktp.id].muncul"
                type="checkbox"
                :disabled="isReadonly"
                class="w-4 h-4"
              />
              Muncul
            </label>
          </div>

          <textarea
            :disabled="isReadonly"
            v-model="indikatorMap[kktp.id].kejadian_teramati"
            class="w-full min-h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            placeholder="Kejadian yang teramati..."
          />
        </div>
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="font-medium text-gray-700">Hasil Karya</h2>

          <button
            type="button"
            v-if="!isReadonly"
            @click="addKarya"
            class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah
          </button>
        </div>

        <div v-for="(item, index) in form.karya" :key="index" class="space-y-4">
          <div>
            <label
              :for="`kktp-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              KKTP
            </label>
            <select
              :id="`kktp-${index}`"
              v-model.number="item.kktp_id"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option :value="null">Pilih KKTP</option>
              <option
                v-for="kktp in kktpOptions"
                :key="kktp.id"
                :value="kktp.id"
              >
                {{ kktp.deskripsi }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="space-y-3 flex flex-col">
              <div>
                <label
                  :for="`foto-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Foto
                </label>
                <input
                  :id="`foto-${index}`"
                  type="file"
                  accept="image/*"
                  @change="handleKaryaImage($event, index)"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>

              <!-- <div
                class="flex-1 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center min-h-[200px]"
              >
                <img
                  v-if="item.preview"
                  :src="item.preview"
                  class="w-full h-full object-cover"
                />

                <span v-else class="text-xs text-gray-400"> Preview Foto </span>
              </div> -->
              <div
                class="flex-1 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
              >
                <img
                  v-if="item.preview"
                  :src="item.preview"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-xs text-gray-400"> Preview Foto </span>
              </div>
            </div>

            <div class="md:col-span-2 space-y-3">
              <div>
                <label
                  :for="`kegiatan-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kegiatan
                </label>
                <input
                  :id="`kegiatan-${index}`"
                  v-model="item.kegiatan"
                  type="text"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Nama kegiatan"
                />
              </div>

              <div>
                <label
                  :for="`deskripsi-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi Aktivitas
                </label>
                <textarea
                  :disabled="isReadonly"
                  :id="`deskripsi-${index}`"
                  v-model="item.deskripsi"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Deskripsi aktivitas"
                />
              </div>

              <div>
                <label
                  :for="`analisa-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Analisa Guru
                </label>
                <textarea
                  :disabled="isReadonly"
                  :id="`analisa-${index}`"
                  v-model="item.analisa"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Analisa guru"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="removeKarya(index)"
            class="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100"
          >
            Hapus
          </button>
        </div>
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="font-medium text-gray-700">Catatan Anekdot</h2>

          <button
            type="button"
            v-if="!isReadonly"
            @click="addAnekdot"
            class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah
          </button>
        </div>

        <div
          v-for="(item, index) in form.anekdot"
          :key="index"
          class="space-y-3"
        >
          <div>
            <label
              :for="`anekdot-kktp-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              KKTP
            </label>
            <select
              :id="`anekdot-kktp-${index}`"
              v-model.number="item.kktp_id"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option :value="null">Pilih KKTP</option>
              <option
                v-for="kktp in kktpOptions"
                :key="kktp.id"
                :value="kktp.id"
              >
                {{ kktp.deskripsi }}
              </option>
            </select>
          </div>

          <div>
            <label
              :for="`anekdot-waktu-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Waktu Observasi
            </label>
            <input
              :id="`anekdot-waktu-${index}`"
              v-model="item.waktu"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label
              :for="`anekdot-catatan-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Catatan Observasi
            </label>
            <textarea
              :disabled="isReadonly"
              :id="`anekdot-catatan-${index}`"
              v-model="item.catatan"
              class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
              placeholder="Catatan observasi..."
            />
          </div>

          <button
            type="button"
            @click="removeAnekdot(index)"
            class="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100"
          >
            Hapus
          </button>
        </div>
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="font-medium text-gray-700">Rekomendasi Rumah</h2>

          <button
            type="button"
            v-if="!isReadonly"
            @click="addRekomendasi"
            class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah
          </button>
        </div>

        <div
          v-for="(item, index) in form.rekomendasi"
          :key="index"
          class="space-y-3"
        >
          <div>
            <label
              :for="`rekomendasi-elemen-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Elemen
            </label>
            <select
              :id="`rekomendasi-elemen-${index}`"
              v-model="item.elemen"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="kesyuhadaan">Kesyuhadaan</option>
              <option value="nabp">NABP</option>
              <option value="jd">Jati Diri</option>
              <option value="ddlmstrs">DDLMSTRS</option>
            </select>
          </div>

          <div>
            <label
              :for="`rekomendasi-tips-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Tips untuk Orang Tua
            </label>
            <textarea
              :disabled="isReadonly"
              :id="`rekomendasi-tips-${index}`"
              v-model="item.tips"
              class="w-full min-h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm"
              placeholder="Tips untuk orang tua..."
            />
          </div>

          <button
            type="button"
            @click="removeRekomendasi(index)"
            class="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100"
          >
            Hapus
          </button>
        </div>
      </section>

      <div class="flex justify-end gap-3">
        <!-- MODE VIEW -->
        <template v-if="existingMonitoringSiswa && !isEditMode">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Kembali
          </button>

          <button
            type="button"
            @click="isEditMode = true"
            class="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm hover:bg-amber-600"
          >
            Edit Monitoring
          </button>
        </template>

        <!-- MODE CREATE / EDIT -->
        <template v-else>
          <button
            v-if="existingMonitoringSiswa"
            type="button"
            @click="cancelEdit"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Batal
          </button>

          <button
            v-else
            type="button"
            @click="$router.back()"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Kembali
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {{
              saving
                ? "Menyimpan..."
                : existingMonitoringSiswa
                  ? "Update Monitoring"
                  : "Simpan Monitoring"
            }}
          </button>
        </template>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  getMonitoringMingguan,
  getMonitoringMingguanById,
  getMonitoringSiswa,
  createMonitoringSiswa,
  getMonitoringSiswaById,
  updateMonitoringSiswa,
} from "@/lib/services/monitoringService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const route = useRoute();
const router = useRouter();

const saving = ref(false);
const selectedMonitoringId = ref(null);
const selectedMonitoring = ref(null);
const monitoringMingguanList = ref([]);

const existingMonitoringSiswa = ref(null);
const isEditMode = ref(false);
const isReadonly = computed(() => {
  return !!existingMonitoringSiswa.value && !isEditMode.value;
});

const siswaKelasId = computed(() => Number(route.query.siswa_kelas_id));
const kelasId = computed(() => Number(route.query.kelas_id));

const namaSiswa = computed(() => route.query.nama || "");

const form = reactive({
  ringkasan: "",
  karya: [],
  anekdot: [],
  rekomendasi: [],
});

const indikatorMap = reactive({});

const kktpOptions = computed(() => {
  if (!selectedMonitoring.value) return [];

  return selectedMonitoring.value.tp.flatMap((tp) =>
    tp.kktp.map((kktp) => ({
      id: kktp.id,
      deskripsi: kktp.deskripsi,
      elemen: tp.elemen,
      tujuan: tp.tujuan,
    })),
  );
});

const formatMonth = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

const fileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  const filename = path.split("/").pop();

  return `${import.meta.env.VITE_API_URL}/monitoring/siswa/file/karya/${filename}`;
};

const fillExistingMonitoring = async (id) => {
  const res = await getMonitoringSiswaById(id);
  const data = res.data;

  console.log("DETAIL MONITORING SISWA", data);

  form.ringkasan = data.ringkasan || "";

  const karyaData = data.karya || data.hasil_karya || [];

  form.karya = karyaData.map((item) => ({
    id: item.id,
    kktp_id: item.kktp_id || item.kktp?.id,
    kegiatan: item.kegiatan || "",
    foto: item.foto || null,
    preview: fileUrl(item.foto),
    deskripsi: item.deskripsi || "",
    analisa: item.analisa || "",
  }));

  form.anekdot = (data.anekdot || []).map((item) => ({
    id: item.id,
    kktp_id: item.kktp_id || item.kktp?.id,
    waktu: item.waktu ? item.waktu.slice(0, 16) : "",
    catatan: item.catatan || "",
  }));

  form.rekomendasi = (data.rekomendasi || []).map((item) => ({
    id: item.id,
    elemen: item.elemen,
    tips: item.tips || "",
  }));

  initIndikator();

  (data.indikator || []).forEach((item) => {
    const kktpId = item.kktp_id || item.kktp?.id;

    if (indikatorMap[kktpId]) {
      indikatorMap[kktpId].muncul = item.muncul;
      indikatorMap[kktpId].kejadian_teramati = item.kejadian_teramati || "";
    }
  });
};

const resetDetailForm = () => {
  form.ringkasan = "";
  form.karya = [];
  form.anekdot = [];
  form.rekomendasi = [];
  initIndikator();
};

const cancelEdit = async () => {
  isEditMode.value = false;

  if (existingMonitoringSiswa.value) {
    await fillExistingMonitoring(existingMonitoringSiswa.value.id);
  }
};

const checkExistingMonitoring = async () => {
  if (!selectedMonitoringId.value || !siswaKelasId.value) return;

  const res = await getMonitoringSiswa({
    monitoring_mingguan_id: selectedMonitoringId.value,
    siswa_kelas_id: siswaKelasId.value,
  });

  existingMonitoringSiswa.value = res.data?.[0] || null;

  if (existingMonitoringSiswa.value) {
    await fillExistingMonitoring(existingMonitoringSiswa.value.id);
    isEditMode.value = false;
  } else {
    resetDetailForm();
    isEditMode.value = true;
  }
};

const initIndikator = () => {
  Object.keys(indikatorMap).forEach((key) => delete indikatorMap[key]);

  kktpOptions.value.forEach((kktp) => {
    indikatorMap[kktp.id] = {
      kktp_id: kktp.id,
      muncul: false,
      kejadian_teramati: "",
    };
  });
};

const loadMonitoringMingguan = async () => {
  const res = await getMonitoringMingguan({
    kelas_id: kelasId.value,
  });

  monitoringMingguanList.value = res.data || [];
};

const handleSelectMonitoring = async () => {
  if (!selectedMonitoringId.value) {
    selectedMonitoring.value = null;
    existingMonitoringSiswa.value = null;
    return;
  }

  const res = await getMonitoringMingguanById(selectedMonitoringId.value);

  selectedMonitoring.value = res.data;

  initIndikator();

  await checkExistingMonitoring();
};

const handleKaryaImage = (event, index) => {
  const file = event.target.files?.[0];

  if (!file) return;

  form.karya[index].foto = file;
  form.karya[index].preview = URL.createObjectURL(file);
};

const addKarya = () => {
  form.karya.push({
    kktp_id: null,
    kegiatan: "",
    foto: "",
    deskripsi: "",
    analisa: "",
  });
};

const removeKarya = (index) => {
  form.karya.splice(index, 1);
};

const addAnekdot = () => {
  form.anekdot.push({
    kktp_id: null,
    waktu: "",
    catatan: "",
  });
};

const removeAnekdot = (index) => {
  form.anekdot.splice(index, 1);
};

const addRekomendasi = () => {
  form.rekomendasi.push({
    elemen: "nabp",
    tips: "",
  });
};

const removeRekomendasi = (index) => {
  form.rekomendasi.splice(index, 1);
};

const validateForm = () => {
  if (!siswaKelasId.value) {
    showWarning("Data siswa kelas tidak ditemukan");
    return false;
  }

  if (!selectedMonitoringId.value) {
    showWarning("Monitoring mingguan wajib dipilih");
    return false;
  }

  if (!form.ringkasan) {
    showWarning("Ringkasan perkembangan wajib diisi");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const indikator = Object.values(indikatorMap);

    const formData = new FormData();

    const karyaPayload = form.karya
      .filter((item) => item.kktp_id && item.kegiatan)
      .map((item) => ({
        kktp_id: item.kktp_id,
        kegiatan: item.kegiatan,
        foto: item.foto instanceof File ? null : item.foto || null,
        deskripsi: item.deskripsi,
        analisa: item.analisa,
      }));

    const anekdotPayload = form.anekdot.map((item) => ({
      kktp_id: item.kktp_id,
      waktu: item.waktu,
      catatan: item.catatan,
    }));

    const rekomendasiPayload = form.rekomendasi.map((item) => ({
      elemen: item.elemen,
      tips: item.tips,
    }));

    formData.append(
      "data",
      JSON.stringify({
        monitoring_mingguan_id: selectedMonitoringId.value,
        siswa_kelas_id: siswaKelasId.value,
        ringkasan: form.ringkasan,
        indikator,
        karya: karyaPayload,
        anekdot: anekdotPayload,
        rekomendasi: rekomendasiPayload,
        karya: karyaPayload,
      }),
    );

    form.karya.forEach((item, index) => {
      if (item.foto instanceof File) {
        formData.append(`karya[${index}][foto]`, item.foto);
      }
    });

    const res = existingMonitoringSiswa.value
      ? await updateMonitoringSiswa(existingMonitoringSiswa.value.id, formData)
      : await createMonitoringSiswa(formData);

    showSuccess(res.message);

    router.back();
  } catch (error) {
    showError(error.message);
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  try {
    await loadMonitoringMingguan();

    const monitoringIdFromQuery = Number(route.query.monitoring_mingguan_id);

    if (monitoringIdFromQuery) {
      selectedMonitoringId.value = monitoringIdFromQuery;
      await handleSelectMonitoring();
    }
  } catch (error) {
    showError(error.message || "Gagal mengambil monitoring mingguan");
  }
});
</script>
