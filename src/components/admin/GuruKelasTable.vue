<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="8">
      <template #toolbar>
        <TableToolbar>
          <template #right>
            <button
              @click="openCreate"
              class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 text-sm"
            >
              Tambah
            </button>

            <div class="relative">
              <button class="absolute -translate-y-1/2 left-4 top-1/2">
                <Search class="w-4 h-4 text-gray-400" />
              </button>

              <input
                v-model="search"
                type="text"
                placeholder="Search"
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </div>

            <select
              v-model="tahunFilter"
              class="border rounded-lg px-3 py-2 text-sm text-gray-600"
            >
              <option value="">Tahun ajaran</option>
              <option
                v-for="tahun in tahunAjaranList"
                :key="tahun.id"
                :value="tahun.id"
              >
                {{ tahun.label }}
              </option>
            </select>
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Guru</th>
          <th class="px-6 py-3">Kelas</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Tahun Ajaran</th>
          <th class="px-6 py-3">Peran</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="(item, index) in paginatedList"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </td>

          <td class="px-6 py-0">
            {{ startNumber + index }}
          </td>

          <td class="px-6 py-0">
            {{ item.guru?.full_name || "-" }}
          </td>

          <td class="px-6 py-0">
            {{ formatKelas(item.kelas) }}
          </td>

          <td class="px-6 py-0">
            {{ item.kelas.nama }}
          </td>

          <td class="px-6 py-0">
            {{ item.tahun_ajaran?.label || "-" }}
          </td>

          <td class="px-6 py-0 capitalize">
            {{ formatPeran(item.peran) }}
          </td>

          <!-- <td class="px-6 py-0">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="
                item.is_active
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600'
              "
            >
              {{ item.is_active ? "Aktif" : "Nonaktif" }}
            </span>
          </td> -->

          <td class="px-6 py-0">
            <div class="flex items-center gap-2">
              <button
                title="Edit"
                @click="openEdit(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-blue-600 text-xs hover:bg-gray-100"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                title="Hapus"
                @click="handleDelete(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-red-600 text-xs hover:bg-gray-100"
              >
                <Trash class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </template>

      <template #pagination>
        <TablePagination :meta="meta" @change="changePage" />
      </template>
    </BaseTable>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-lg p-5">
        <h2 class="text-base font-medium text-gray-700 mb-4">
          {{ isEdit ? "Edit Guru Kelas" : "Tambah Guru Kelas" }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-600">Guru</label>
            <select
              v-model.number="form.guru_id"
              :class="[
                'w-full mt-1 border rounded-lg px-3 py-2 text-sm',
                errors.guru_id
                  ? 'border-red-500 error-field'
                  : 'border-gray-300',
              ]"
            >
              <option :value="null">Pilih guru</option>
              <option v-for="guru in guruList" :key="guru.id" :value="guru.id">
                {{ guru.full_name }}
              </option>
            </select>
            <p v-if="errors.guru_id" class="text-xs text-red-500 mt-1">
              {{ errors.guru_id }}
            </p>
          </div>

          <div>
            <label class="text-sm text-gray-600">Tahun Ajaran</label>
            <select
              v-model.number="form.tahun_ajaran_id"
              :class="[
                'w-full mt-1 border rounded-lg px-3 py-2 text-sm',
                errors.tahun_ajaran_id
                  ? 'border-red-500 error-field'
                  : 'border-gray-300',
              ]"
            >
              <option :value="null">Pilih tahun ajaran</option>
              <option
                v-for="tahun in tahunAjaranAktifList"
                :key="tahun.id"
                :value="tahun.id"
              >
                {{ tahun.label }}
              </option>
            </select>
            <p v-if="errors.tahun_ajaran_id" class="text-xs text-red-500 mt-1">
              {{ errors.tahun_ajaran_id }}
            </p>
          </div>

          <div>
            <label class="text-sm text-gray-600">Kelas</label>
            <select
              v-model.number="form.kelas_id"
              :class="[
                'w-full mt-1 border rounded-lg px-3 py-2 text-sm',
                errors.kelas_id
                  ? 'border-red-500 error-field'
                  : 'border-gray-300',
              ]"
            >
              <option :value="null">Pilih kelas</option>
              <option
                v-for="kelas in filteredKelasOptions"
                :key="kelas.id"
                :value="kelas.id"
              >
                {{ formatKelas(kelas) }}
              </option>
            </select>

            <p v-if="errors.kelas_id" class="text-xs text-red-500 mt-1">
              {{ errors.kelas_id }}
            </p>
          </div>

          <div>
            <label class="text-sm text-gray-600">Role Guru</label>
            <select
              v-model="form.peran"
              :class="[
                'w-full mt-1 border rounded-lg px-3 py-2 text-sm',
                errors.peran ? 'border-red-500 error-field' : 'border-gray-300',
              ]"
            >
              <option value="">Pilih role</option>
              <option value="wali kelas">Wali Kelas</option>
              <option value="pendamping">Pendamping</option>
            </select>

            <p v-if="errors.peran" class="text-xs text-red-500 mt-1">
              {{ errors.peran }}
            </p>
          </div>

          <!-- <label class="flex items-center gap-2 text-sm text-gray-600">
            <input v-model="form.is_active" type="checkbox" class="w-4 h-4" />
            Aktif
          </label> -->
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
          >
            Batal
          </button>

          <button
            @click="handleSubmit"
            :disabled="saving"
            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:opacity-50"
          >
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Search, SquarePen, Trash } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";

import {
  getAllGuruKelas,
  createGuruKelas,
  updateGuruKelas,
  deleteGuruKelas,
} from "@/lib/services/guruKelasService";

import { getAllKelas } from "@/lib/services/kelasService";
import { getAllTahunAjaran } from "@/lib/services/tahunAjaranService";
import { getGuruUsers } from "@/lib/services/userService";

const errors = reactive({});
const list = ref([]);
const kelasList = ref([]);
const guruList = ref([]);
const tahunAjaranList = ref([]);
const tahunAjaranAktifList = ref([]);

const loading = ref(false);
const saving = ref(false);

const search = ref("");
const tahunFilter = ref("");

const currentPage = ref(1);
const perPage = ref(10);

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const isSettingEditForm = ref(false);

const form = reactive({
  guru_id: null,
  kelas_id: null,
  tahun_ajaran_id: null,
  peran: "",
  //   is_active: true,
});

const filteredKelasOptions = computed(() => {
  if (!form.tahun_ajaran_id) return kelasList.value;

  return kelasList.value.filter(
    (kelas) => kelas.tahun_ajaran_id === Number(form.tahun_ajaran_id),
  );
});

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const keyword = search.value.toLowerCase();

    const namaGuru =
      item.guru?.full_name || item.guru?.first_name || item.guru?.email || "";
    const namaKelas = item.kelas?.nama || "";
    const tahun = item.tahun_ajaran?.label || "";

    const matchSearch =
      namaGuru.toLowerCase().includes(keyword) ||
      namaKelas.toLowerCase().includes(keyword) ||
      tahun.toLowerCase().includes(keyword) ||
      item.peran?.toLowerCase().includes(keyword);

    const matchTahun =
      !tahunFilter.value || item.tahun_ajaran_id === Number(tahunFilter.value);

    return matchSearch && matchTahun;
  });
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredList.value.slice(start, start + perPage.value);
});

const meta = computed(() => {
  const total = filteredList.value.length;

  return {
    current_page: currentPage.value,
    last_page: Math.ceil(total / perPage.value) || 1,
    per_page: perPage.value,
    total,
  };
});

const startNumber = computed(() => {
  return (currentPage.value - 1) * perPage.value + 1;
});

const changePage = (page) => {
  currentPage.value = page;
};

const resetForm = () => {
  form.guru_id = null;
  form.kelas_id = null;
  form.tahun_ajaran_id = null;
  form.peran = "";

  Object.keys(errors).forEach((key) => delete errors[key]);
};

const formatKelas = (kelas) => {
  if (!kelas) return "-";

  const jenjang = kelas.jenjang ? kelas.jenjang.toUpperCase() : "";
  const kelompok = kelas.kelompok ? kelas.kelompok.toUpperCase() : "";
  const nama = kelas.nama || "";

  if (jenjang == "kb") {
    return `${jenjang}`;
  }

  if (kelompok && nama) {
    return `${jenjang}-${kelompok}`;
  }

  return jenjang || "-";
};

const formatPeran = (peran) => {
  if (!peran) return "-";

  const map = {
    wali_kelas: "Wali Kelas",
    pendamping: "Pendamping",
  };

  return map[peran] || peran;
};

const loadGuruKelas = async () => {
  try {
    loading.value = true;

    const res = await getAllGuruKelas();
    list.value = res.data || [];

    console.log(JSON.parse(JSON.stringify(list.value)));
  } catch (err) {
    showError(err.message || "Gagal mengambil data guru kelas");
  } finally {
    loading.value = false;
  }
};

const loadOptions = async () => {
  try {
    const [resKelas, resTahun, resGuru] = await Promise.all([
      getAllKelas(),
      getAllTahunAjaran(),
      getGuruUsers(),
    ]);

    kelasList.value = resKelas.data || [];

    tahunAjaranList.value = resTahun.data || [];

    tahunAjaranAktifList.value = (resTahun.data || []).filter(
      (item) => item.is_active,
    );

    guruList.value = resGuru.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data pilihan");
  }
};

const openCreate = () => {
  resetForm();

  const tahunAktif = tahunAjaranAktifList.value[0];

  if (tahunAktif) {
    form.tahun_ajaran_id = tahunAktif.id;
  }

  selectedId.value = null;
  isEdit.value = false;
  showModal.value = true;
};

const openEdit = (item) => {
  isSettingEditForm.value = true;

  selectedId.value = item.id;
  isEdit.value = true;

  form.guru_id = item.guru_id;
  form.tahun_ajaran_id = item.tahun_ajaran_id;
  form.kelas_id = item.kelas_id;
  form.peran = item.peran || "";

  showModal.value = true;

  setTimeout(() => {
    isSettingEditForm.value = false;
  }, 0);
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);

  let isValid = true;

  if (!form.guru_id) {
    errors.guru_id = "Guru wajib dipilih";
    isValid = false;
  }

  if (!form.tahun_ajaran_id) {
    errors.tahun_ajaran_id = "Tahun ajaran wajib dipilih";
    isValid = false;
  }

  if (!form.kelas_id) {
    errors.kelas_id = "Kelas wajib dipilih";
    isValid = false;
  }

  if (!form.peran) {
    errors.peran = "Peran guru wajib dipilih";
    isValid = false;
  }

  if (!isValid) {
    showWarning("Lengkapi data yang wajib diisi");

    document
      .querySelector(".error-field")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const payload = {
      guru_id: form.guru_id,
      kelas_id: form.kelas_id,
      tahun_ajaran_id: form.tahun_ajaran_id,
      peran: form.peran,
      //   is_active: form.is_active,
    };

    if (isEdit.value) {
      await updateGuruKelas(selectedId.value, payload);
      showSuccess("Guru kelas berhasil diupdate");
    } else {
      await createGuruKelas(payload);
      showSuccess("Guru berhasil ditambahkan ke kelas");
    }

    closeModal();
    await loadGuruKelas();
  } catch (err) {
    showError(err.message || "Gagal menyimpan guru kelas");
  } finally {
    saving.value = false;
  }
};

const handleDelete = async (id) => {
  try {
    await deleteGuruKelas(id);
    showSuccess("Guru berhasil dihapus dari kelas");
    await loadGuruKelas();
  } catch (err) {
    showError(err.message || "Gagal menghapus guru kelas");
  }
};

watch([search, tahunFilter], () => {
  currentPage.value = 1;
});

watch(
  () => form.tahun_ajaran_id,
  () => {
    if (!isSettingEditForm.value) {
      form.kelas_id = null;
    }
  },
);

watch(
  () => form.guru_id,
  (val) => {
    if (val) delete errors.guru_id;
  },
);

watch(
  () => form.tahun_ajaran_id,
  (val) => {
    if (val) delete errors.tahun_ajaran_id;
  },
);

watch(
  () => form.kelas_id,
  (val) => {
    if (val) delete errors.kelas_id;
  },
);

watch(
  () => form.peran,
  (val) => {
    if (val) delete errors.peran;
  },
);

onMounted(async () => {
  await Promise.all([loadGuruKelas(), loadOptions()]);
});
</script>
