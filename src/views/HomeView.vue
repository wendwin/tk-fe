<template>
  <!-- <AppNavbar /> -->

  <HeroSection :tahun-ajaran="tahunAjaran" />
  <AboutSection />
  <VisionMissionSection />
  <ProgramSection />
  <ProgramStudySection />
  <LearningCenterSection />
  <TestimonialsSection />
  <!-- <PPDBSection /> -->
  <CTASection />
  <AppFooter />
  <WhatsappWidget />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getActiveTahunAjaran } from "@/lib/services/tahunAjaranService";

import AppNavbar from "@/components/layout/AppNavbar.vue";
import HeroSection from "@/components/sections/landingpage/HeroSection.vue";
import AboutSection from "@/components/sections/landingpage/AboutSection.vue";
import VisionMissionSection from "@/components/sections/landingpage/VisionMissionSection.vue";
import LearningCenterSection from "@/components/sections/landingpage/LearningCenterSection.vue";
import ProgramStudySection from "@/components/sections/landingpage/ProgramStudySection.vue";
import TestimonialsSection from "@/components/sections/landingpage/TestimonialsSection.vue";
import PPDBSection from "@/components/sections/landingpage/PPDBSection.vue";
import CTASection from "@/components/sections/CTASection.vue";
import ProgramSection from "@/components/sections/landingpage/ProgramSection.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import WhatsappWidget from "@/components/common/WhatsappWidget.vue";

const tahunAjaran = ref("");

onMounted(async () => {
  try {
    const res = await getActiveTahunAjaran();
    tahunAjaran.value = res.data.label;
  } catch (err) {
    console.error(err);
  }
});
</script>
