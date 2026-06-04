<template>
  <div>
    <h1 class="text-lg text-gray-700 font-medium mb-4">Detail Tahun Ajaran</h1>

    <div class="bg-white border rounded-xl p-5 mb-5">
      <p class="text-sm text-gray-500">Tahun Ajaran</p>
      <h2 class="text-lg font-semibold text-gray-700">
        {{ tahunAjaran.label }}
      </h2>

      <p class="text-sm text-gray-600 mt-2">
        Periode:
        <span class="font-medium">
          {{
            formatPeriodeID(
              tahunAjaran.tanggal_mulai,
              tahunAjaran.tanggal_selesai,
            )
          }}
        </span>
      </p>
    </div>

    <GelombangTable :tahun-ajaran-id="id" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import GelombangTable from "@/components/admin/GelombangTable.vue";
import { getTahunAjaranById } from "@/lib/services/tahunAjaranService";
import formatDateTimeID, {
  formatPeriodeID,
} from "@/lib/utils/formatDateTimeID";

const route = useRoute();
const id = Number(route.params.id);

const tahunAjaran = ref({});

const fetchDetail = async () => {
  const res = await getTahunAjaranById(id);
  tahunAjaran.value = res.data;
};

onMounted(fetchDetail);
</script>
