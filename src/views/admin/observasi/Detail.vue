<template>
  <div>
    <PendaftaranDetailLayout
      title="Detail Observasi"
      back-route-name="AdminObservasi"
      :detail="detail"
      :form="form"
      :tabs="['Peserta Didik', 'Orang Tua', 'Observasi']"
      :can-edit="false"
      :is-edit-peserta="false"
      :loading="loading"
    >
      <template #tab-content="{ activeTab }">
        <ObservasiForm
          v-if="activeTab === 'Observasi'"
          :pendaftaran-id="detail.meta.id"
          :detail="detail"
        />
      </template>
    </PendaftaranDetailLayout>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import PendaftaranDetailLayout from "@/components/admin/pendaftaran/DetailLayout.vue";
// import ObservasiForm from "@/components/admin/observasi/ObservasiForm.vue";
import { usePendaftaranDetail } from "@/composables/usePendaftaranDetail";

const route = useRoute();
const id = route.params.id;

const { detail, form, loading, fetchDetail } = usePendaftaranDetail(id);

onMounted(() => {
  fetchDetail();
});
</script>

<style lang="scss" scoped></style>
