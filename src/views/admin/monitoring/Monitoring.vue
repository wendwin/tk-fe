<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Monitoring Mingguan</h1>

      <p class="text-sm text-gray-500 mt-1">
        Isi data umum pembelajaran mingguan untuk kelas.
      </p>

      <div class="mt-4 grid md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-gray-500">Tahun Ajaran</p>
          <p class="font-medium">
            {{ tahunAjaranAktif?.label || "-" }}
          </p>
        </div>

        <div>
          <div>
            <p class="text-sm text-gray-500">Kelas</p>
            <p class="font-medium">
              {{ formatKelas(selectedKelas?.kelas) }}
            </p>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-500">Peran</p>
          <p class="font-medium capitalize">
            {{ selectedKelas?.peran || "-" }}
          </p>
        </div>
      </div>
    </div>

    <section class="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Monitoring yang Sudah Dibuat
      </h2>

      <div v-if="monitoringList.length === 0" class="text-sm text-gray-500">
        Belum ada monitoring mingguan untuk kelas ini.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="item in monitoringList"
          :key="item.id"
          class="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
            >
              Minggu {{ item.minggu }}
            </span>

            <span
              class="text-xs px-2 py-1 rounded-full"
              :class="
                item.status === 'published'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-amber-50 text-amber-600'
              "
            >
              {{ item.status === "published" ? "Published" : "Draft" }}
            </span>
          </div>

          <h3 class="font-semibold text-gray-900 mt-3">
            {{ item.topik }}
          </h3>

          <p class="text-sm text-gray-500">
            {{ item.sub_topik }}
          </p>

          <p class="text-xs text-gray-400 mt-2">
            {{ item.tanggal_mulai }} - {{ item.tanggal_selesai }}
          </p>

          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-xs text-gray-400 uppercase tracking-wide">
              Progress Monitoring
            </p>

            <div class="flex items-center justify-between mt-1">
              <span class="text-sm font-medium text-gray-700">
                {{ item.total_selesai || 0 }} /
                {{ item.total_siswa || 0 }} siswa
              </span>

              <span class="text-xs text-gray-500">
                {{
                  item.total_siswa
                    ? Math.round((item.total_selesai / item.total_siswa) * 100)
                    : 0
                }}%
              </span>
            </div>

            <div class="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div
                class="h-2 bg-blue-500 rounded-full"
                :style="{
                  width: `${
                    item.total_siswa
                      ? (item.total_selesai / item.total_siswa) * 100
                      : 0
                  }%`,
                }"
              />
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <router-link
              :to="{
                name: 'AdminMonitoringMingguanDetail',
                params: { id: item.id },
              }"
              class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 text-center"
            >
              Detail
            </router-link>

            <button
              v-if="item.status === 'draft'"
              type="button"
              @click="handlePublish(item)"
              :disabled="(item.total_selesai || 0) < (item.total_siswa || 0)"
              class="px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>

    <div ref="formAnchor"></div>

    <form
      @submit.prevent="handleSubmit"
      class="bg-white rounded-2xl border border-gray-200 p-6 space-y-6"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ isEditMode ? "Edit Monitoring" : "Tambah Monitoring" }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div>
          <label class="text-sm font-medium">Semester</label>
          <input
            v-model.number="form.semester"
            type="number"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Minggu</label>
          <input
            v-model.number="form.minggu"
            type="number"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Topik</label>
          <input
            v-model="form.topik"
            type="text"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Sub Topik</label>
          <input
            v-model="form.sub_topik"
            type="text"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Tanggal Mulai</label>
          <input
            v-model="form.tanggal_mulai"
            type="date"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Tanggal Selesai</label>
          <input
            v-model="form.tanggal_selesai"
            type="date"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <section class="space-y-4 mb-10">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-gray-900">
            Tujuan Pembelajaran & KKTP
          </h2>

          <button
            type="button"
            @click="addTP"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah TP
          </button>
        </div>

        <div
          v-for="(tp, tpIndex) in form.tp"
          :key="tpIndex"
          class="border border-gray-200 rounded-xl p-4 space-y-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1"
                >Elemen {{ tpIndex + 1 }}</label
              >

              <select
                v-model="tp.elemen"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="kesyuhadaan">Kesyuhadaan</option>
                <option value="nabp">NABP</option>
                <option value="jd">Jati Diri</option>
                <option value="ddlmstrs">DDLMSTRS</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1"
                >Tujuan Pembelajaran</label
              >

              <input
                v-model="tp.tujuan"
                type="text"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div class="space-y-2 mt-8">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium">KKTP</p>

              <button
                type="button"
                @click="addKKTP(tpIndex)"
                class="flex items-center gap-1 justify-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus class="w-4 h-4" /> Tambah KKTP
              </button>
            </div>

            <div
              v-for="(kktp, kktpIndex) in tp.kktp"
              :key="kktpIndex"
              class="flex gap-2"
            >
              <input
                v-model="kktp.deskripsi"
                type="text"
                placeholder="Deskripsi KKTP"
                class="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />

              <button
                type="button"
                @click="removeKKTP(tpIndex, kktpIndex)"
                class="px-2 rounded-lg bg-white border border-red-200 text-red-600 text-sm hover:bg-red-100"
              >
                <Minus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              type="button"
              @click="removeTP(tpIndex)"
              class="flex items-center gap-2 text-sm px-3 py-1.5 text-slate-600 border rounded-lg hover:bg-gray-100"
            >
              Hapus TP
            </button>
          </div>
        </div>
      </section>

      <section class="space-y-4 mb-10">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-gray-900">Kegiatan</h2>

          <button
            type="button"
            @click="addKegiatan"
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          >
            Tambah Kegiatan
          </button>
        </div>

        <div
          v-for="(item, index) in form.kegiatan"
          :key="index"
          class="flex gap-3 items-end"
        >
          <div class="grid flex-1 grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1"
                >Kegiatan {{ index + 1 }}</label
              >
              <input
                v-model="item.nama"
                type="text"
                placeholder="Nama kegiatan"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Media/Bahan</label>
              <input
                v-model="item.media"
                type="text"
                placeholder="Media / bahan"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            @click="removeKegiatan(index)"
            class="shrink-0 h-10 w-10 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center"
          >
            <Minus class="w-4 h-4" />
          </button>
        </div>
      </section>

      <section class="space-y-3 mb-10">
        <h2 class="font-semibold text-gray-900">Asesmen Awal</h2>

        <input
          v-model="form.asesmen_awal.teknik"
          type="text"
          placeholder="Teknik asesmen"
          class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />

        <textarea
          v-model="form.asesmen_awal.rancangan_kegiatan"
          placeholder="Rancangan kegiatan"
          class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />

        <textarea
          v-model="form.asesmen_awal.hasil"
          placeholder="Hasil asesmen awal"
          class="w-full min-h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </section>

      <div class="flex justify-end gap-3">
        <button
          v-if="isEditMode"
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
        >
          Batal Edit
        </button>

        <button
          v-else
          type="button"
          @click="resetForm"
          class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
        >
          Reset
        </button>

        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onActivated, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  createMonitoringMingguan,
  getMonitoringMingguan,
  getMonitoringMingguanById,
  updateMonitoringMingguan,
  publishMonitoringMingguan,
} from "@/lib/services/monitoringService";
import { getMyGuruKelas } from "@/lib/services/guruKelasService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";

import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { Minus, Plus } from "lucide-vue-next";

const formAnchor = ref(null);

const loading = ref(false);
const route = useRoute();
const router = useRouter();

const editId = ref(null);
const isEditMode = computed(() => !!editId.value);

const tahunAjaranAktif = ref(null);

const kelasGuru = ref([]);

const selectedKelas = ref(null);

const isMultiKelas = computed(() => {
  return kelasGuru.value.length > 1;
});

const monitoringList = ref([]);

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

const loadData = async () => {
  try {
    loading.value = true;

    const tahunRes = await getAllTahunAjaran();

    tahunAjaranAktif.value = tahunRes.data.find((item) => item.is_active);

    const guruKelasRes = await getMyGuruKelas();

    kelasGuru.value = guruKelasRes.data;

    if (kelasGuru.value.length > 0) {
      selectedKelas.value = kelasGuru.value[0];
    }

    console.log("tahun aktif", tahunAjaranAktif.value);
    console.log("selected kelas", selectedKelas.value);
    await loadMonitoring();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const loadMonitoring = async () => {
  if (!tahunAjaranAktif.value || !selectedKelas.value) return;

  const res = await getMonitoringMingguan({
    kelas_id: selectedKelas.value.kelas.id,
    tahun_ajaran_id: tahunAjaranAktif.value.id,
  });

  monitoringList.value = res.data;
};

const defaultForm = () => ({
  semester: 1,
  minggu: null,
  topik: "",
  sub_topik: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
  tp: [
    {
      elemen: "nabp",
      tujuan: "",
      kktp: [{ deskripsi: "" }],
    },
  ],
  kegiatan: [
    {
      nama: "",
      media: "",
    },
  ],
  asesmen_awal: {
    teknik: "Observasi",
    rancangan_kegiatan: "",
    hasil: "",
  },
});

const form = reactive(defaultForm());

const resetForm = () => {
  Object.assign(form, defaultForm());
};

const fillFormEdit = async (id) => {
  const res = await getMonitoringMingguanById(id);
  const data = res.data;

  editId.value = data.id;

  form.semester = data.semester;
  form.minggu = data.minggu;
  form.topik = data.topik;
  form.sub_topik = data.sub_topik;
  form.tanggal_mulai = data.tanggal_mulai;
  form.tanggal_selesai = data.tanggal_selesai;

  form.tp = (data.tp || []).map((tp) => ({
    elemen: tp.elemen,
    tujuan: tp.tujuan,
    kktp: (tp.kktp || []).map((kktp) => ({
      deskripsi: kktp.deskripsi,
    })),
  }));

  form.kegiatan = (data.kegiatan || []).map((item) => ({
    nama: item.nama,
    media: item.media,
  }));

  form.asesmen_awal = {
    teknik: data.asesmen_awal?.teknik || "Observasi",
    rancangan_kegiatan: data.asesmen_awal?.rancangan_kegiatan || "",
    hasil: data.asesmen_awal?.hasil || "",
  };

  setTimeout(() => {
    const y =
      formAnchor.value.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, 100);
};

const handleEditQuery = async () => {
  const editIdFromQuery = Number(route.query.edit_id);

  if (editIdFromQuery) {
    await fillFormEdit(editIdFromQuery);
    return;
  }

  editId.value = null;
  resetForm();
};

const addTP = () => {
  form.tp.push({
    elemen: "nabp",
    tujuan: "",
    kktp: [{ deskripsi: "" }],
  });
};

const removeTP = (index) => {
  form.tp.splice(index, 1);
};

const addKKTP = (tpIndex) => {
  form.tp[tpIndex].kktp.push({
    deskripsi: "",
  });
};

const removeKKTP = (tpIndex, kktpIndex) => {
  form.tp[tpIndex].kktp.splice(kktpIndex, 1);
};

const addKegiatan = () => {
  form.kegiatan.push({
    nama: "",
    media: "",
  });
};

const removeKegiatan = (index) => {
  form.kegiatan.splice(index, 1);
};

const cancelEdit = () => {
  editId.value = null;
  resetForm();

  router.replace({
    name: "AdminMonitoring",
  });
};

const handleSubmit = async () => {
  if (!tahunAjaranAktif.value) {
    showWarning("Tahun ajaran aktif wajib dipilih");
    return;
  }

  if (!selectedKelas.value) {
    showWarning("Belum ada kelas");
    return;
  }

  loading.value = true;

  try {
    const payload = {
      kelas_id: selectedKelas.value.kelas.id,
      tahun_ajaran_id: tahunAjaranAktif.value.id,
      semester: form.semester,
      minggu: form.minggu,
      topik: form.topik,
      sub_topik: form.sub_topik,
      tanggal_mulai: form.tanggal_mulai,
      tanggal_selesai: form.tanggal_selesai,
      tp: form.tp
        .filter((tp) => tp.tujuan && tp.kktp.length)
        .map((tp) => ({
          ...tp,
          kktp: tp.kktp.filter((kktp) => kktp.deskripsi),
        })),
      kegiatan: form.kegiatan.filter((item) => item.nama),
      asesmen_awal: form.asesmen_awal,
    };

    const res = isEditMode.value
      ? await updateMonitoringMingguan(editId.value, {
          ...payload,
          replace_detail: true,
        })
      : await createMonitoringMingguan(payload);

    showSuccess(res.message || "Monitoring berhasil dibuat");

    await loadMonitoring();
    resetForm();
  } catch (error) {
    showError(error.message || "Gagal membuat monitoring mingguan");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handlePublish = async (item) => {
  if ((item.total_selesai || 0) < (item.total_siswa || 0)) {
    showWarning(
      "Monitoring belum bisa dipublish karena masih ada siswa yang belum diisi",
    );
    return;
  }

  try {
    loading.value = true;

    const res = await publishMonitoringMingguan(item.id);

    showSuccess(res.message || "Monitoring berhasil dipublish");

    await loadMonitoring();
  } catch (error) {
    showError(error.message || "Gagal publish monitoring");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadData();
  await handleEditQuery();

  const editIdFromQuery = Number(route.query.edit_id);

  if (editIdFromQuery) {
    await fillFormEdit(editIdFromQuery);
  }
});

onActivated(async () => {
  await loadData();
  await handleEditQuery();
});

watch(
  () => route.query.edit_id,
  async () => {
    await handleEditQuery();
  },
);
</script>

<style scoped></style>
