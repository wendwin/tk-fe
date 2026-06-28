<script setup>
import AppNavbar from "@/components/layout/AppNavbar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import VisionMissionSection from "@/components/sections/VisionMissionSection.vue";
import LearningCenterSection from "@/components/sections/LearningCenterSection.vue";
import TestimonialsSection from "@/components/sections/TestimonialsSection.vue";
import PPDBSection from "@/components/sections/PPDBSection.vue";
import CTASection from "@/components/sections/CTASection.vue";
import ProgramSection from "@/components/sections/ProgramSection.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import WhatsappWidget from "@/components/common/WhatsappWidget.vue";
</script>

<template>
  <!-- <AppNavbar /> -->

  <HeroSection />
  <AboutSection />
  <VisionMissionSection />
  <ProgramSection />
  <LearningCenterSection />
  <TestimonialsSection />
  <!-- <PPDBSection /> -->
  <CTASection />
  <AppFooter />
  <WhatsappWidget />
</template>
