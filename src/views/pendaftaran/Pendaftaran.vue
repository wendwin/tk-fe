<template>
  <div class="bg-blue-50 py-5 mt-14">
    <div
      class="max-w-6xl mx-auto bg-white p-6 border border-white rounded-lg shadow-md"
    >
      <nav
        class="flex items-center justify-end gap-2 text-[13px] font-medium text-gray-400 mb-4 px-2"
      >
        <router-link
          :to="{ name: 'HomePortal' }"
          class="hover:text-[#1181B2] transition flex items-center gap-1"
        >
          <span><House class="w-4 h-4" /></span> Portal
        </router-link>
        <span>/</span>
        <router-link
          :to="{ name: 'Pendaftaran' }"
          class="text-gray-600 font-semibold"
        >
          Pendaftaran
        </router-link>
      </nav>
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
          :title="tab.label"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-1 py-2 px-2 rounded-lg transition-all"
          :class="[
            activeTab === tab.id
              ? 'bg-[#005DA7] text-white'
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
      <div v-else-if="activeTab === 'berkas' && pendaftaranId" key="berkas">
        <UploadBerkas
          :pendaftaran-id="pendaftaranId"
          :status-berkas="pendaftaranData?.status_berkas || 'belum_upload'"
          @saved="handleBerkasSaved"
        />
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
        <Asesmen
          :pendaftaran-id="pendaftaranId"
          :initial-jawaban="asesmenJawaban"
          :pertanyaan="asesmenPertanyaan"
          @submitted="handleAsesmenSubmitted"
        />
      </div>
      <div v-else-if="activeTab === 'pengumuman'" key="pengumuman">
        <Informasi :data="pendaftaranData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";
import { House } from "lucide-vue-next";
import { useAuthStore } from "@/lib/stores/auth";
import {
  getMyPendaftaran,
  getPendaftaranById,
} from "@/lib/services/pendaftaranService";
import { getPendaftaranId } from "@/lib/utils/storage";
import { clearPendaftaranId } from "@/lib/utils/storage";
import {
  getPertanyaanAsesmenAktif,
  getJawabanAsesmen,
} from "@/lib/services/asesmenService";

import Form from "@/components/portal/Form.vue";
import UploadBerkas from "@/components/portal/UploadBerkas.vue";
import UploadPayment from "@/components/portal/UploadPayment.vue";
import Asesmen from "@/components/portal/Asesmen.vue";
import pattern from "@/assets/images/hero-pattern.svg";
import Informasi from "@/components/portal/Informasi.vue";

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();

const jenis = ref("tk");
const program = ref("reguler");
const activeTab = ref("formulir");
const samaDenganKK = ref(true);
const hasilPengumuman = ref("pending");
const kodePembayaran = ref("047");
const statusPendaftaran = ref("pending");
const statusPembayaran = ref("unpaid");
const asesmenSubmitted = ref(false);
const formulirSaved = computed(() => !!pendaftaranId.value);
const berkasSaved = ref(false);
const pembayaranDone = ref(false);
const asesmenDone = computed(() => asesmenJawaban.value.length > 0);

const pendaftaranId = ref(null);
const pendaftaranData = ref(null);
const asesmenPertanyaan = ref([]);
const asesmenJawaban = ref([]);

const loadAsesmen = async (id) => {
  try {
    const pertanyaanRes = await getPertanyaanAsesmenAktif();
    asesmenPertanyaan.value = pertanyaanRes.data || [];

    if (!id) {
      asesmenJawaban.value = [];
      return;
    }

    try {
      const jawabanRes = await getJawabanAsesmen(id);
      asesmenJawaban.value = jawabanRes.data || [];
    } catch {
      asesmenJawaban.value = [];
    }
  } catch (err) {
    console.log(err);
  }
};

const loadPendaftaran = async () => {
  try {
    const idFromQuery = route.query.id;

    if (!idFromQuery) {
      pendaftaranId.value = null;
      pendaftaranData.value = null;
      await loadAsesmen(null);
      return;
    }

    const res = await getPendaftaranById(idFromQuery);
    const data = res.data;

    if (!data) return;

    pendaftaranId.value = data.id;
    pendaftaranData.value = data;

    statusPendaftaran.value = data.status;
    statusPembayaran.value = data.status_pembayaran;
    hasilPengumuman.value = data.status;

    berkasSaved.value =
      data.dokumen?.filter((d) => d.jenis_dokumen !== "bukti_pembayaran")
        .length >= 4;

    await loadAsesmen(data.id);
  } catch (err) {
    console.log(err);
    showError(err.message || "Gagal mengambil data pendaftaran");
  }
};

const tabs = computed(() => [
  { id: "formulir", label: "Formulir", icon: "document-text-outline" },
  { id: "berkas", label: "Berkas", icon: "folder-outline" },
  { id: "pembayaran", label: "Pembayaran", icon: "card-outline" },
  { id: "asesmen", label: "Asesmen", icon: "clipboard-outline" },
  { id: "pengumuman", label: "Pengumuman", icon: "megaphone-outline" },
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

  if (statusPembayaran.value === "pending") pts += 10;
  if (statusPembayaran.value === "paid") pts += 15;

  if (statusPendaftaran.value === "verified") pts += 10;

  if (asesmenDone.value) pts += 15;

  if (["accepted", "rejected"].includes(hasilPengumuman.value)) {
    pts = 100;
  }

  return pts;
});

const goTab = (tab) => {
  activeTab.value = tab.id;
};

const handleFormSaved = async (id) => {
  pendaftaranId.value = Number(id);

  await router.replace({
    name: "Pendaftaran",
    query: { id: pendaftaranId.value },
  });

  await loadPendaftaran();

  activeTab.value = "berkas";
};
const handleBerkasSaved = async () => {
  await loadPendaftaran();

  berkasSaved.value = true;
  activeTab.value = "pembayaran";
};

const handlePaymentSaved = async () => {
  await loadPendaftaran();

  setTimeout(() => {
    activeTab.value = "asesmen";
  }, 1500);
};

const handleAsesmenSubmitted = async () => {
  await loadPendaftaran();

  if (statusPembayaran.value === "unpaid") {
    showSuccess("Asesmen berhasil disimpan, selesaikan pembayaran");
    activeTab.value = "pembayaran";
    return;
  }

  showSuccess("Asesmen berhasil disimpan");
  activeTab.value = "pengumuman";
};

onMounted(async () => {
  await loadPendaftaran();
  await loadAsesmen(pendaftaranId.value);

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

  if (asesmenDone.value) {
    activeTab.value = "pengumuman";
    return;
  }
});
</script>

<style lang="scss" scoped></style>
