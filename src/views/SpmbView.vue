<template>
  <div>
    <HeroSection :tahun-ajaran="tahunAjaran" />

    <ScheduleSection :registration-waves="registrationWaves" />

    <RegistrationFlowSection />

    <RequirementSection />

    <DownloadSection />

    <FaqSection id="faq" :tahun-ajaran="tahunAjaran" />

    <CTASection />

    <AppFooter />

    <WhatsappWidget />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getActiveTahunAjaran } from "@/lib/services/tahunAjaranService";
import { getActiveGelombang } from "@/lib/services/gelombangService";

import HeroSection from "@/components/sections/spmb/HeroSection.vue";
import ScheduleSection from "@/components/sections/spmb/ScheduleSection.vue";
import RegistrationFlowSection from "@/components/sections/spmb/RegistrationFlowSection.vue";
import RequirementSection from "@/components/sections/spmb/RequirementSection.vue";
import DownloadSection from "@/components/sections/spmb/DownloadSection.vue";
import FaqSection from "@/components/sections/spmb/FaqSection.vue";
import CTASection from "@/components/sections/CTASection.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import WhatsappWidget from "@/components/common/WhatsappWidget.vue";

const formatPeriod = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleString("id-ID", {
    month: "long",
  });

  const endMonth = endDate.toLocaleString("id-ID", {
    month: "long",
  });

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${startYear}`;
  }

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
};

const isRegistrationOpen = (start, end) => {
  const today = new Date();

  return today >= new Date(start) && today <= new Date(end);
};

const tahunAjaran = ref("");
const registrationWaves = ref([]);

const waveMeta = {
  "Gelombang 1": {
    discount: "Potongan Rp 1.000.000",
  },
  "Gelombang 2": {
    discount: "Potongan Rp 500.000",
  },
  "Gelombang 3": {
    discount: "Potongan Rp -",
  },
};

onMounted(async () => {
  try {
    const res = await getActiveTahunAjaran();
    tahunAjaran.value = res.data.label;

    const gelombangRes = await getActiveGelombang(res.data.id);

    registrationWaves.value = gelombangRes.data.map((item) => {
      const meta = waveMeta[item.nama] || {};

      const active = isRegistrationOpen(
        item.tanggal_mulai,
        item.tanggal_selesai,
      );

      return {
        id: item.id,
        title: item.nama,
        period: formatPeriod(item.tanggal_mulai, item.tanggal_selesai),
        discount: meta.discount ?? "Potongan Rp -",
        status: active ? "active" : "nonaktif",
        label: active ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup",
      };
    });
  } catch (err) {
    console.error(err);
  }
});
</script>
