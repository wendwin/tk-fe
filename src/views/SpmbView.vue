<template>
  <div>
    <HeroSection />

    <ScheduleSection />

    <RegistrationFlowSection />

    <RequirementSection />

    <DownloadSection />

    <FaqSection id="faq" />

    <CTASection />

    <AppFooter />

    <WhatsappWidget />
  </div>
</template>

<script setup>
import HeroSection from "@/components/sections/spmb/HeroSection.vue";
import ScheduleSection from "@/components/sections/spmb/ScheduleSection.vue";
import RegistrationFlowSection from "@/components/sections/spmb/RegistrationFlowSection.vue";
import RequirementSection from "@/components/sections/spmb/RequirementSection.vue";
import DownloadSection from "@/components/sections/spmb/DownloadSection.vue";
import FaqSection from "@/components/sections/spmb/FaqSection.vue";
import CTASection from "@/components/sections/CTASection.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import WhatsappWidget from "@/components/common/WhatsappWidget.vue";
</script>
