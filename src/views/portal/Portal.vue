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

        <div class="h-1.5 bg-gray-200 rounded overflow-hidden">
          <div
            class="h-full rounded transition-all duration-400 ease-in-out bg-linear-to-r from-[#1181B2] to-[#0a73a0]"
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
              : tab.locked
                ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer',
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
        <Form :initial-data="pendaftaranData" @saved="handleFormSaved" />
      </div>
      <div v-else-if="activeTab === 'berkas'" key="berkas">
        <UploadBerkas @saved="handleBerkasSaved" />
      </div>
      <div v-else-if="activeTab === 'pembayaran'" key="pembayaran">
        <UploadPayment
          :status-pembayaran="statusPembayaran"
          :pendaftaran-id="pendaftaranId"
          @update-status="statusPembayaran = $event"
          @saved="handlePaymentSaved"
        />
      </div>
      <!-- <div v-else-if="activeTab === 'status'" key="status">
        <div class="text-center text-gray-500 py-20">Tab Status</div>
      </div> -->
      <div v-else-if="activeTab === 'asesmen'" key="asesmen">
        <div class="text-center text-gray-500 py-20">Tab Asesmen</div>
      </div>
      <div v-else-if="activeTab === 'pengumuman'" key="pengumuman">
        <div class="text-center text-gray-500 py-20">Tab Pengumuman</div>
      </div>
    </div>

    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/stores/auth";
import { logout } from "@/lib/services/authService";
import { getMyPendaftaran } from "@/lib/services/pendaftaranService";
import { getPendaftaranId } from "@/lib/utils/storage";
import { clearPendaftaranId } from "@/lib/utils/storage";

import Form from "@/components/portal/Form.vue";
import UploadBerkas from "@/components/portal/UploadBerkas.vue";
import UploadPayment from "@/components/portal/UploadPayment.vue";

import pattern from "@/assets/images/hero-pattern.svg";

const router = useRouter();
const auth = useAuthStore();

const jenis = ref("tk");
const program = ref("reguler");
const activeTab = ref("formulir");
const samaDenganKK = ref(true);
const hasilPengumuman = ref("pending");
const kodePembayaran = ref("047");
const statusPembayaran = ref("unpaid");
const asesmenSubmitted = ref(false);
const formulirSaved = computed(() => !!pendaftaranId.value);
const berkasSaved = ref(false);
const pembayaranDone = ref(false);

const pendaftaranId = ref(Number(getPendaftaranId()));
const pendaftaranData = ref(null);

const loadPendaftaran = async () => {
  try {
    const res = await getMyPendaftaran();
    const data = res.data;

    if (!data) return;

    pendaftaranId.value = data.id;
    statusPembayaran.value = data.status_pembayaran;
    hasilPengumuman.value = data.status;

    berkasSaved.value =
      data.dokumen?.filter((d) => d.jenis_dokumen !== "bukti_pembayaran")
        .length >= 4;

    pendaftaranData.value = data;
  } catch (err) {
    console.log(err);

    if (err.message) {
      showError(err.message);
    }
  }
};

const tabs = computed(() => [
  {
    id: "formulir",
    label: "Formulir",
    locked: false,
    icon: "document-text-outline",
  },
  {
    id: "berkas",
    label: "Berkas",
    locked: false,
    icon: "folder-outline",
  },
  {
    id: "pembayaran",
    label: "Pembayaran",
    locked: false,
    icon: "card-outline",
  },
  {
    id: "asesmen",
    label: "Asesmen",
    locked: statusPembayaran.value !== "paid",
    icon: "clipboard-outline",
  },
  {
    id: "pengumuman",
    label: "Pengumuman",
    locked: hasilPengumuman.value !== "approved",
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
  if (berkasSaved.value) pts += 25;

  switch (statusPembayaran.value) {
    case "pending":
      pts += 10;
      break;
    case "paid":
      pts += 25;
      break;
  }

  if (asesmenSubmitted.value) pts += 25;

  return pts;
});

const handleLogout = async () => {
  try {
    await logout();

    auth.clearAuth();
    sessionStorage.removeItem("csrf_token");
    clearPendaftaranId();

    router.push("/login");
  } catch (err) {
    console.log(err.message);
  }
};

const goTab = (tab) => {
  if (tab.locked) return;
  activeTab.value = tab.id;
};

const handleFormSaved = async () => {
  pendaftaranId.value = Number(getPendaftaranId());
  await loadPendaftaran();

  activeTab.value = "berkas";
};

const handleBerkasSaved = () => {
  berkasSaved.value = true;
  activeTab.value = "pembayaran";
};

const handlePaymentSaved = async () => {
  await loadPendaftaran();
  activeTab.value = "pembayaran";
};

onMounted(async () => {
  await loadPendaftaran();

  if (!pendaftaranId.value) {
    activeTab.value = "formulir";
    return;
  }

  if (!berkasSaved.value) {
    activeTab.value = "berkas";
    return;
  }

  if (["unpaid", "pending"].includes(statusPembayaran.value)) {
    activeTab.value = "pembayaran";
    return;
  }

  if (statusPembayaran.value === "paid") {
    activeTab.value = "asesmen";
  }
});
</script>

<style lang="scss" scoped></style>
