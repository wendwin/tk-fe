<template>
  <div class="space-y-10">
    <GpphForm :pendaftaran-id="pendaftaranId" />

    <KpspForm :pendaftaran-id="pendaftaranId" :umur="umur" />
  </div>
</template>

<script setup>
import GpphForm from "./GpphForm.vue";
import KpspForm from "./KpspForm.vue";

defineProps({
  pendaftaranId: {
    type: Number,
    required: true,
  },
  umur: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
