<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium">Detail Tahun Ajaran</h1>

      <nav class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink
          :to="{ name: 'AdminTahunAjaran' }"
          class="hover:text-slate-700"
        >
          Tahun Ajaran
        </RouterLink>

        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />

        <span class="text-slate-700 font-medium">Detail</span>
      </nav>
    </div>

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
import { formatPeriodeID } from "@/lib/utils/formatDateTimeID";
import { ChevronRight } from "lucide-vue-next";

const route = useRoute();
const id = Number(route.params.id);

const tahunAjaran = ref({});

const fetchDetail = async () => {
  const res = await getTahunAjaranById(id);
  tahunAjaran.value = res.data;
};

onMounted(fetchDetail);
</script>
