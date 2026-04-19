<template>
  <div>
    <nav
      class="bg-white border-b border-gray-200 px-8 h-[60px] flex items-center justify-between sticky top-0 z-[100] shadow-sm"
    >
      <div class="flex items-center gap-2.5">
        <div class="flex items-center">
          <img class="h-10" :src="logo" />
          <div class="text-sm ml-2 text-slate-700 font-semibold">
            Portal PPDB 2025/2026
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <span
          class="text-slate-700 text-[12px] font-semibold px-3 py-[3px] rounded-full"
        >
          Halo, User
        </span>
        <div
          class="w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-[13px] text-slate-700 cursor-pointer bg-slate-200 hover:bg-slate-300"
          title="Akun Saya"
        >
          SA
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo/logo.svg";
</script>

<style lang="scss" scoped></style>
