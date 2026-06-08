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
        <!-- <label class="text-sm font-medium text-gray-700">
          Monitoring Mingguan
        </label> -->

        <h2 class="font-medium text-gray-700">
          Monitoring Mingguan <span class="text-red-500">*</span>
        </h2>

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
            {{
              formatPeriodeID(
                selectedMonitoring.tanggal_mulai,
                selectedMonitoring.tanggal_selesai,
              )
            }}
          </p>
        </div>
      </div>
    </section>

    <!-- <div
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
    </div> -->

    <form
      v-if="selectedMonitoring"
      @submit.prevent="handleSubmit"
      class="space-y-6"
    >
      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h2 class="font-medium text-gray-700">
          Ringkasan Perkembangan <span class="text-red-500">*</span>
        </h2>
        <textarea
          v-model="form.ringkasan"
          required
          :disabled="isReadonly"
          :class="fieldClass(errors.ringkasan)"
          placeholder="Tulis ringkasan perkembangan anak..."
        />
        <p v-if="errors.ringkasan" class="mt-1 text-xs text-red-500">
          {{ errors.ringkasan[0] }}
        </p>
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h2 class="font-medium text-gray-700">Checklist Indikator</h2>

        <div class="overflow-x-auto">
          <table
            class="min-w-[1100px] w-full text-sm border border-gray-300 border-collapse"
          >
            <thead>
              <tr class="bg-gray-50 font-medium text-gray-700">
                <th class="border border-gray-300 px-4 py-3 text-center w-16">
                  No
                </th>
                <th
                  class="border border-gray-300 px-4 py-3 text-left w-[260px]"
                >
                  Tujuan Pembelajaran
                </th>
                <th
                  class="border border-gray-300 px-4 py-3 text-left w-[350px]"
                >
                  KKTP
                </th>
                <th
                  class="border border-gray-300 px-4 py-3 text-center w-[80px]"
                >
                  Muncul/Tidak
                </th>
                <th class="border border-gray-300 px-4 py-3 text-left">
                  Kejadian yang Teramati
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(tp, index) in tpOptions"
                :key="tp.id"
                class="align-top"
              >
                <td class="border border-gray-300 px-4 py-4 text-center">
                  {{ index + 1 }}.
                </td>

                <td class="border border-gray-300 px-4 py-4">
                  <p class="font-medium text-gray-700">
                    {{ tp.tujuan }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ formatElemen(tp.elemen) }}
                  </p>
                </td>

                <td class="border border-gray-300 px-4 py-4">
                  <ul class="list-disc pl-5 space-y-1">
                    <li
                      v-for="kktp in tp.kktp"
                      :key="kktp.id"
                      class="text-gray-600"
                    >
                      {{ kktp.deskripsi }}
                    </li>
                  </ul>
                </td>

                <td class="border border-gray-300 px-4 py-4 text-center">
                  <input
                    v-model="indikatorMap[tp.id].muncul"
                    type="checkbox"
                    :disabled="isReadonly"
                    class="w-4 h-4"
                  />
                </td>

                <td class="border border-gray-300 px-4 py-4">
                  <textarea
                    v-model="indikatorMap[tp.id].kejadian_teramati"
                    :disabled="isReadonly"
                    class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="Tuliskan kejadian yang teramati..."
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2 space-y-3">
              <div>
                <label
                  :for="`kegiatan-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kegiatan {{ index + 1 }} <span class="text-red-500">*</span>
                </label>
                <input
                  :id="`kegiatan-${index}`"
                  required
                  v-model="item.kegiatan"
                  :disabled="isReadonly"
                  type="text"
                  :class="fieldClass(getError(`karya.${index}.kegiatan`))"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Nama kegiatan"
                />
                <p
                  v-if="getError(`karya.${index}.kegiatan`)"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError(`karya.${index}.kegiatan`) }}
                </p>
              </div>

              <div>
                <label
                  :for="`deskripsi-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi Aktivitas <span class="text-red-500">*</span>
                </label>
                <textarea
                  :disabled="isReadonly"
                  required
                  :id="`deskripsi-${index}`"
                  v-model="item.deskripsi"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  :class="fieldClass(getError(`karya.${index}.deskripsi`))"
                  placeholder="Deskripsi aktivitas"
                />
                <p
                  v-if="getError(`karya.${index}.deskripsi`)"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError(`karya.${index}.deskripsi`) }}
                </p>
              </div>

              <div>
                <label
                  :for="`kktp-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  KKTP <span class="text-red-500">*</span>
                </label>
                <select
                  :id="`kktp-${index}`"
                  :disabled="isReadonly"
                  v-model="item.kktp_id"
                  required
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  :class="fieldClass(getError(`karya.${index}.kktp_id`))"
                >
                  <option value="">Pilih KKTP</option>
                  <option
                    v-for="kktp in kktpOptions"
                    :key="kktp.id"
                    :value="kktp.id"
                  >
                    {{ kktp.deskripsi }}
                  </option>
                </select>
                <p
                  v-if="getError(`karya.${index}.kktp_id`)"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError(`karya.${index}.kktp_id`) }}
                </p>
              </div>

              <div>
                <label
                  :for="`analisa-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Analisa Guru <span class="text-red-500">*</span>
                </label>
                <textarea
                  :disabled="isReadonly"
                  :id="`analisa-${index}`"
                  required
                  v-model="item.analisa"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  :class="fieldClass(getError(`karya.${index}.analisa`))"
                  placeholder="Analisa guru"
                />
                <p
                  v-if="getError(`karya.${index}.analisa`)"
                  class="mt-1 text-xs text-red-500"
                >
                  {{ getError(`karya.${index}.analisa`) }}
                </p>
              </div>
            </div>

            <div class="space-y-3 flex flex-col">
              <div v-if="!isReadonly">
                <label
                  :for="`foto-${index}`"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Foto Kegiatan
                </label>

                <input
                  :id="`foto-${index}`"
                  type="file"
                  accept="image/*"
                  @change="handleKaryaImage($event, index)"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>

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
              KKTP <span class="text-red-500">*</span>
            </label>
            <select
              :id="`anekdot-kktp-${index}`"
              required
              :disabled="isReadonly"
              v-model="item.kktp_id"
              :class="fieldClass(getError(`anekdot.${index}.kktp_id`))"
            >
              <option value="">Pilih KKTP</option>
              <option
                v-for="kktp in kktpOptions"
                :key="kktp.id"
                :value="kktp.id"
              >
                {{ kktp.deskripsi }}
              </option>
            </select>
            <p
              v-if="getError(`anekdot.${index}.kktp_id`)"
              class="mt-1 text-xs text-red-500"
            >
              {{ getError(`anekdot.${index}.kktp_id`) }}
            </p>
          </div>

          <div>
            <label
              :for="`anekdot-waktu-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Waktu Observasi <span class="text-red-500">*</span>
            </label>
            <input
              :id="`anekdot-waktu-${index}`"
              required
              v-model="item.waktu"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              :class="fieldClass(getError(`anekdot.${index}.waktu`))"
            />
            <p
              v-if="getError(`anekdot.${index}.waktu`)"
              class="mt-1 text-xs text-red-500"
            >
              {{ getError(`anekdot.${index}.waktu`) }}
            </p>
          </div>

          <div>
            <label
              :for="`anekdot-catatan-${index}`"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Catatan Observasi <span class="text-red-500">*</span>
            </label>
            <textarea
              :disabled="isReadonly"
              :id="`anekdot-catatan-${index}`"
              required
              v-model="item.catatan"
              class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
              :class="fieldClass(getError(`anekdot.${index}.catatan`))"
              placeholder="Catatan observasi..."
            />
            <p
              v-if="getError(`anekdot.${index}.catatan`)"
              class="mt-1 text-xs text-red-500"
            >
              {{ getError(`anekdot.${index}.catatan`) }}
            </p>
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
import { formatPeriodeID } from "@/lib/utils/formatDateTimeID";

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

const errors = ref({});

const getError = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], errors.value)?.[0];
};

const fieldClass = (error) => [
  "w-full rounded-lg px-3 py-2 text-sm",
  error
    ? "border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500"
    : "border border-gray-200",
];

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

const tpOptions = computed(() => {
  if (!selectedMonitoring.value) return [];

  return selectedMonitoring.value.tp || [];
});

const formatMonth = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

const formatElemen = (elemen) => {
  const map = {
    kesyuhadaan: "Kesyuhadaan",
    nabp: "Nilai Agama & Budi Pekerti",
    jd: "Jati Diri",
    ddlmstrs: "Literasi & STEM",
  };

  return map[elemen] || elemen;
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
    const tpId = item.tp_id || item.tp?.id;

    if (indikatorMap[tpId]) {
      indikatorMap[tpId].muncul = item.muncul;
      indikatorMap[tpId].kejadian_teramati = item.kejadian_teramati || "";
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

  tpOptions.value.forEach((tp) => {
    indikatorMap[tp.id] = {
      tp_id: tp.id,
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
    kktp_id: "",
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
    kktp_id: "",
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

const handleSubmit = async () => {
  errors.value = {};

  try {
    saving.value = true;

    const indikator = tpOptions.value.map((tp) => ({
      tp_id: tp.id,
      muncul: indikatorMap[tp.id]?.muncul || false,
      kejadian_teramati: indikatorMap[tp.id]?.kejadian_teramati || "",
    }));

    const formData = new FormData();

    const karyaPayload = form.karya.map((item) => ({
      kktp_id: item.kktp_id ? Number(item.kktp_id) : null,
      kegiatan: item.kegiatan,
      foto: item.foto instanceof File ? null : item.foto || null,
      deskripsi: item.deskripsi,
      analisa: item.analisa,
    }));

    const anekdotPayload = form.anekdot.map((item) => ({
      kktp_id: item.kktp_id ? Number(item.kktp_id) : null,
      waktu: item.waktu,
      catatan: item.catatan,
    }));

    const rekomendasiPayload = form.rekomendasi
      .filter((item) => item.elemen || item.tips)
      .map((item) => ({
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
      }),
    );

    form.karya.forEach((item, index) => {
      if (item.foto instanceof File) {
        formData.append(`karya[${index}][foto]`, item.foto);
      }
    });

    console.log("PAYLOAD", {
      indikator,
      karya: karyaPayload,
      anekdot: anekdotPayload,
      rekomendasi: rekomendasiPayload,
    });

    const res = existingMonitoringSiswa.value
      ? await updateMonitoringSiswa(existingMonitoringSiswa.value.id, formData)
      : await createMonitoringSiswa(formData);

    showSuccess(res.message);

    router.back();
  } catch (error) {
    console.error(error);

    if (error.code === 422) {
      errors.value = error.errors || {};
      return;
    }

    showError(error.message || "Gagal menyimpan monitoring siswa");
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
