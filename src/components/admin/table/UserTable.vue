<template>
  <div>
    <BaseTable :loading="loading" :is-empty="list.length === 0" :colspan="7">
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
                @keyup.enter="loadUsers(1)"
                type="text"
                placeholder="Search"
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </div>

            <select
              v-model="roleFilter"
              @change="loadUsers"
              class="border rounded-lg px-3 py-2 text-sm text-gray-600"
            >
              <option value="">Semua role</option>
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
              <option value="orang_tua">Orang Tua</option>
              <option value="kepsek">Kepala Sekolah</option>
            </select>

            <button
              @click="loadUsers(1)"
              class="text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Cari
            </button>
          </template>
        </TableToolbar>
      </template>

      <template #head>
        <tr>
          <th class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </th>
          <th class="px-6 py-3">No</th>
          <th class="px-6 py-3">Nama</th>
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3">Role</th>
          <th class="px-6 py-3">Verifikasi</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Dibuat</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </template>

      <template #body>
        <tr
          v-for="(item, index) in list"
          :key="item.id"
          class="bg-white border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="p-4">
            <input type="checkbox" class="w-4 h-4" />
          </td>

          <td class="px-6 py-0">
            {{ ((meta.page || 1) - 1) * (meta.per_page || 10) + index + 1 }}
          </td>

          <td class="px-6 py-0">
            {{ item.first_name + " " + item.last_name }}
          </td>

          <td class="px-6 py-0">
            {{ item.email }}
          </td>

          <td class="px-6 py-0">
            <span class="">
              {{ formatRole(item.role?.name) }}
            </span>
          </td>

          <td class="px-6 py-0">
            <span class="">
              {{ item.is_verified ? "Terverifikasi" : "Belum" }}
            </span>
          </td>

          <td class="px-6 py-0">
            <span
              :class="item.is_active ? 'text-emerald-600' : 'text-gray-600'"
            >
              {{ item.is_active ? "Aktif" : "Nonaktif" }}
            </span>
          </td>

          <td class="px-6 py-0">
            {{ formatDate(item.created_at) }}
          </td>

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
                v-if="item.is_active"
                title="Nonaktifkan"
                @click="openDeleteConfirm(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-red-600 text-xs hover:bg-gray-100"
              >
                <Trash class="w-4 h-4" />
              </button>

              <button
                v-else
                title="Aktifkan kembali"
                @click="handleRestore(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 border hover:text-emerald-600 text-xs hover:bg-gray-100"
              >
                Aktifkan
              </button>
            </div>
          </td>
        </tr>
      </template>
      <template #pagination>
        <TablePagination :meta="meta" @change="loadUsers" />
      </template>
    </BaseTable>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-lg p-5">
        <h2 class="text-base font-medium text-gray-700 mb-4">
          {{ isEdit ? "Edit User" : "Tambah User" }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-600">Nama Depan</label>
            <input
              v-model="form.first_name"
              type="text"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Nama Belakang</label>
            <input
              v-model="form.last_name"
              type="text"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <input
              :disabled="isEdit"
              v-model="form.email"
              type="email"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="user@email.com"
            />
          </div>

          <div v-if="!isEdit">
            <label class="text-sm text-gray-600">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600">Role</label>
            <select
              v-model.number="form.role_id"
              :disabled="selectedUser?.role === 'orang_tua'"
              class="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            >
              <option :value="null">Pilih role</option>
              <option :value="1">Admin</option>
              <option :value="2">Guru</option>
              <option :value="3">Orang Tua</option>
              <option :value="4">Kepala Sekolah</option>
            </select>
          </div>

          <label class="flex items-center gap-2 text-sm text-gray-600">
            <input v-model="form.is_verified" type="checkbox" class="w-4 h-4" />
            User sudah terverifikasi
          </label>
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
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
          >
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <AdminConfirmModal
    :show="showConfirm"
    title="Nonaktifkan User"
    message="Apakah Anda yakin ingin menonaktifkan user berikut?"
    :target-name="
      selectedDeleteUser
        ? `${selectedDeleteUser.first_name} ${selectedDeleteUser.last_name} (${selectedDeleteUser.email})`
        : ''
    "
    confirm-text="Nonaktifkan"
    variant="danger"
    @confirm="confirmDelete"
    @cancel="closeDeleteConfirm"
  />
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { Search, SquarePen, Trash } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import AdminConfirmModal from "@/components/admin/common/AdminConfirmModal.vue";
import BaseTable from "@/components/admin/common/BaseTable.vue";
import TablePagination from "@/components/admin/common/TablePagination.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
} from "@/lib/services/userService";

const list = ref([]);
const loading = ref(false);
const saving = ref(false);

const search = ref("");
let searchTimeout = null;
const roleFilter = ref("");

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const showConfirm = ref(false);
const selectedDeleteId = ref(null);
const selectedDeleteUser = ref(null);

const meta = ref({});
const isFirstLoad = ref(true);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role_id: null,
  is_verified: true,
});

const roleMap = {
  admin: "Admin",
  guru: "Guru",
  orang_tua: "User",
  kepala_sekolah: "Kepala Sekolah",
};

const formatRole = (role) => {
  return roleMap[role] || role || "-";
};

const resetForm = () => {
  form.first_name = "";
  form.last_name = "";
  form.email = "";
  form.password = "";
  form.role_id = null;
  form.is_verified = true;
};

const loadUsers = async (page = 1) => {
  try {
    loading.value = true;

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("per_page", 10);
    params.append("status", "all");

    if (search.value) params.append("search", search.value);
    if (roleFilter.value) params.append("role", roleFilter.value);

    const [res] = await Promise.all([
      getAllUsers(`?${params.toString()}`),
      isFirstLoad.value ? sleep(500) : Promise.resolve(),
    ]);

    list.value = res.data || [];
    meta.value = res.meta || {};
  } catch (err) {
    showError(err.message || "Gagal mengambil data user");
  } finally {
    loading.value = false;
    isFirstLoad.value = false;
  }
};

const openCreate = () => {
  resetForm();
  selectedId.value = null;
  isEdit.value = false;
  showModal.value = true;
};

const openEdit = (item) => {
  selectedId.value = item.id;
  isEdit.value = true;

  form.first_name = item.first_name;
  form.last_name = item.last_name;
  form.email = item.email;
  form.password = "";
  form.role_id = item.role_id;
  form.is_verified = item.is_verified;

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  if (!form.first_name) {
    showWarning("Nama depan wajib diisi");
    return false;
  }

  if (!form.email) {
    showWarning("Email wajib diisi");
    return false;
  }

  if (!isEdit.value && !form.password) {
    showWarning("Password wajib diisi");
    return false;
  }

  if (!isEdit.value && form.password.length < 6) {
    showWarning("Password minimal 6 karakter");
    return false;
  }

  if (!form.role_id) {
    showWarning("Role wajib dipilih");
    return false;
  }

  return true;
};

const openDeleteConfirm = (user) => {
  selectedDeleteUser.value = user;
  selectedDeleteId.value = user.id;
  showConfirm.value = true;
};

const closeDeleteConfirm = () => {
  selectedDeleteId.value = null;
  selectedDeleteUser.value = null;
  showConfirm.value = false;
};

const confirmDelete = async () => {
  try {
    await deleteUser(selectedDeleteId.value);
    showSuccess("User berhasil dinonaktifkan");
    closeDeleteConfirm();
    await loadUsers();
  } catch (err) {
    showError(err.message || "Gagal menonaktifkan user");
  }
};

const handleRestore = async (id) => {
  try {
    await restoreUser(id);
    showSuccess("User berhasil diaktifkan");
    await loadUsers();
  } catch (err) {
    showError(err.message || "Gagal mengaktifkan user");
  }
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      role_id: form.role_id,
      is_verified: form.is_verified,
    };

    if (!isEdit.value) {
      payload.password = form.password;
    }

    if (isEdit.value) {
      await updateUser(selectedId.value, payload);
      showSuccess("User berhasil diupdate");
    } else {
      await createUser(payload);
      showSuccess("User berhasil dibuat");
    }

    closeModal();
    await loadUsers();
  } catch (err) {
    showError(err.message || "Gagal menyimpan user");
  } finally {
    saving.value = false;
  }
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

onMounted(() => {
  loadUsers();
});
</script>
