<template>
  <div>
    <DetailLayout
      title="Detail Observasi"
      back-route-name="AdminObservasi"
      breadcrumb-label="Observasi"
      :detail="detail"
      :form="form"
      :tabs="tabs"
      :can-edit="false"
      :is-edit-peserta="false"
      :loading="loading"
      :peserta-fields="pesertaFields"
      :alamat-fields="alamatFields"
      :kesehatan-fields="kesehatanFields"
      :informasi-fields="informasiFields"
      :orang-tua-ayah-fields="orangTuaAyahFields"
      :orang-tua-ibu-fields="orangTuaIbuFields"
    >
      <template #tab-content="{ activeTab }">
        <AsesmenView v-if="activeTab === 'Asesmen'" :data="hasilAsesmen" />

        <ObservasiForm
          v-else-if="activeTab === 'Observasi' && detail.meta.id"
          :pendaftaran-id="detail.meta.id"
          :detail="detail"
        />
      </template>
    </DetailLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import DetailLayout from "@/components/admin/pendaftaran/DetailLayout.vue";
import AsesmenView from "@/components/admin/AsesmenView.vue";
import ObservasiForm from "@/components/admin/observasi/ObservasiForm.vue";

import { usePendaftaranDetail } from "@/composables/usePendaftaranDetail";

import {
  pesertaFields,
  alamatFields,
  kesehatanFields,
  informasiFields,
  orangTuaAyahFields,
  orangTuaIbuFields,
} from "@/lib/constants/pendaftaranFields";

import {
  getPertanyaanAsesmen,
  getJawabanAsesmen,
} from "@/lib/services/asesmenService";
import { showSuccess, showError, showWarning } from "@/lib/utils/toast";

const route = useRoute();
const id = route.params.id;

const tabs = ["Peserta Didik", "Orang Tua", "Asesmen", "Observasi"];

const { detail, form, loading, fetchDetail } = usePendaftaranDetail(id);

const pertanyaan = ref([]);
const jawaban = ref([]);

const fetchAsesmen = async () => {
  try {
    const [resPertanyaan, resJawaban] = await Promise.all([
      getPertanyaanAsesmen(),
      getJawabanAsesmen(id),
    ]);

    pertanyaan.value = resPertanyaan.data;
    jawaban.value = resJawaban.data;
  } catch (err) {
    console.log(err);
    showError(err.message || "Gagal memuat data asesmen");
  }
};

const hasilAsesmen = computed(() => {
  return pertanyaan.value.map((q) => {
    const j = jawaban.value.find((a) => a.id_pertanyaan === q.id);

    return {
      id: q.id,
      urutan: q.urutan,
      pertanyaan: q.pertanyaan,
      jawaban: j?.jawaban || "-",
    };
  });
});

onMounted(async () => {
  await fetchDetail();
  await fetchAsesmen();
});
</script>
