<template>
  <div class="bg-blue-50 py-5">
    <div
      class="max-w-6xl mx-auto bg-white p-6 border border-white rounded-lg shadow-md"
    >
      <!-- banner -->
      <div
        class="mb-8 text-center w-full bg-[#1181B2] p-5 rounded-md"
        :style="{
          backgroundImage: `url(${pattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <h2 class="text-xl font-bold text-slate-50">
          Pendaftaran Peserta Didik Baru
        </h2>
        <h3 class="text-xl font-bold text-slate-50">
          KB & TK Masjid Syuhada Yogyakarta
        </h3>
        <h3 class="text-xl font-bold text-slate-50">Tahun Ajaran 2026/2027</h3>
        <h5 class="max-w-md mx-auto text-slate-50 text-sm mt-3">
          Lengkapi data untuk memulai perjalanan tumbuh kembang si kecil di
          lingkungan yang penuh kasih dan ceria
        </h5>
      </div>

      <!-- progress -->
      <div class="mb-5">
        <div class="flex justify-between text-sm text-gray-500 mb-1.5">
          <span>Kelengkapan Pendaftaran</span>
          <span>{{ Math.round(progressPct) }}%</span>
        </div>

        <div class="h-[6px] bg-gray-200 rounded overflow-hidden">
          <div
            class="h-full rounded transition-all duration-400 ease-in-out bg-gradient-to-r from-[#1181B2] to-[#0a73a0]"
            :style="{ width: progressPct + '%' }"
          ></div>
        </div>
      </div>

      <!-- tabs -->
      <div class="p-1.5 flex flex-wrap gap-3 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="goTab(tab)"
          :title="tab.locked ? tab.lockMsg : tab.label"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-1 py-2 px-2 rounded-lg relative transition-all border-none"
          :class="[
            activeTab === tab.id
              ? 'bg-[#005DA7] text-white'
              : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-100',
          ]"
        >
          <span class="text-base leading-none">
            <ion-icon :icon="tab.icon" class="text-lg"></ion-icon>
          </span>

          <span
            class="text-sm font-medium whitespace-nowrap"
            :class="activeTab === tab.id ? 'text-white' : 'text-gray-500'"
          >
            {{ tab.label }}
          </span>
        </button>
      </div>

      <div v-if="activeTab === 'formulir'" key="formulir">
        <Form />
      </div>
    </div>

    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { logout } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/auth";

import Form from "@/components/form/portal/Form.vue";

import pattern from "@/assets/images/hero-pattern.svg";

const router = useRouter();
const auth = useAuthStore();

const jenis = ref("tk");
const program = ref("reguler");
const activeTab = ref("formulir");
const samaDenganKK = ref(true);
const hasilPengumuman = ref("pending");
const kodePembayaran = ref("047");
const statusPembayaran = ref("");
const asesmenSubmitted = ref(false);
const formulirSaved = ref(false);
const berkasSaved = ref(false);

const tabs = computed(() => [
  {
    id: "formulir",
    label: "Formulir",
    locked: false,
    icon: "document-text-outline",
  },
  { id: "berkas", label: "Berkas", locked: false, icon: "folder-outline" },
  {
    id: "pembayaran",
    label: "Pembayaran",
    locked: false,
    icon: "card-outline",
  },
  // {
  //   id: "status",
  //   label: "Status",
  //   locked: false,
  //   icon: "information-circle-outline",
  // },
  {
    id: "asesmen",
    label: "Asesmen",
    locked: statusPembayaran.value !== "verified",
    icon: "clipboard-outline",
  },
  {
    id: "pengumuman",
    label: "Pengumuman",
    locked: hasilPengumuman.value === "pending",
    icon: "megaphone-outline",
  },
]);

const uploadedDocs = reactive({
  foto: false,
  kk: false,
  akta: false,
  kia: false,
  bukti_tf: false,
});

const berkasLengkap = computed(() =>
  ["foto", "kk", "akta", "kia"].every((k) => uploadedDocs[k]),
);

const progressPct = computed(() => {
  let pts = 0;
  if (formulirSaved.value) pts += 25;
  if (berkasLengkap.value) pts += 25;
  if (statusPembayaran.value === "verified") pts += 25;
  if (asesmenSubmitted.value) pts += 25;
  return pts;
});

const handleLogout = async () => {
  try {
    await logout();

    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");

    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<style lang="scss" scoped></style>
