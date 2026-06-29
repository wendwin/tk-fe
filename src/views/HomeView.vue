<script setup>
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
</script>

<template>
  <!-- <AppNavbar /> -->

  <HeroSection />
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
