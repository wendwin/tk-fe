<!-- src/components/admin/user/UserTable.vue -->
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
                @keyup.enter="loadUsers"
                type="text"
                placeholder="Search"
                class="h-9 w-[280px] rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </div>

            <select
              v-model="roleFilter"
              @change="loadUsers"
              class="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Semua role</option>
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
              <option value="orang_tua">Orang Tua</option>
              <option value="kepala_sekolah">Kepala Sekolah</option>
            </select>

            <button
              @click="loadUsers"
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
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3">Role</th>
          <th class="px-6 py-3">Verifikasi</th>
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

          <td class="px-6 py-4">
            {{ index + 1 }}
          </td>

          <td class="px-6 py-4 font-medium text-gray-700">
            {{ item.email }}
          </td>

          <td class="px-6 py-4">
            <span
              class="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              {{ formatRole(item.role?.name) }}
            </span>
          </td>

          <td class="px-6 py-4">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="
                item.is_verified
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-600'
              "
            >
              {{ item.is_verified ? "Terverifikasi" : "Belum" }}
            </span>
          </td>

          <td class="px-6 py-4">
            {{ formatDate(item.created_at) }}
          </td>

          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="openEdit(item)"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-green-600 text-xs"
              >
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                @click="handleDelete(item.id)"
                class="px-3 py-1.5 rounded-lg text-gray-600 hover:text-red-600 text-xs"
              >
                <Trash class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
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
            <label class="text-sm text-gray-600">Email</label>
            <input
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
            class="px-4 py-2 rounded-lg border text-sm"
          >
            Batal
          </button>

          <button
            @click="handleSubmit"
            :disabled="saving"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-50"
          >
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { Search, SquarePen, Trash } from "lucide-vue-next";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

import BaseTable from "@/components/admin/common/BaseTable.vue";
import TableToolbar from "@/components/admin/common/TableToolbar.vue";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/services/userService";

const list = ref([]);
const loading = ref(false);
const saving = ref(false);

const search = ref("");
const roleFilter = ref("");

const showModal = ref(false);
const isEdit = ref(false);
const selectedId = ref(null);

const form = reactive({
  email: "",
  password: "",
  role_id: null,
  is_verified: true,
});

const roleMap = {
  admin: "Admin",
  guru: "Guru",
  orang_tua: "Orang Tua",
  kepala_sekolah: "Kepala Sekolah",
};

const formatRole = (role) => {
  return roleMap[role] || role || "-";
};

const resetForm = () => {
  form.email = "";
  form.password = "";
  form.role_id = null;
  form.is_verified = true;
};

const loadUsers = async () => {
  try {
    loading.value = true;

    const params = new URLSearchParams();

    if (search.value) params.append("search", search.value);
    if (roleFilter.value) params.append("role", roleFilter.value);

    const query = params.toString() ? `?${params.toString()}` : "";

    const res = await getAllUsers(query);
    list.value = res.data || [];
  } catch (err) {
    showError(err.message || "Gagal mengambil data user");
  } finally {
    loading.value = false;
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

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    saving.value = true;

    const payload = {
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

const handleDelete = async (id) => {
  try {
    await deleteUser(id);
    showSuccess("User berhasil dihapus");
    await loadUsers();
  } catch (err) {
    showError(err.message || "Gagal menghapus user");
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
