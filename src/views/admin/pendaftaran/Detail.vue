<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">
        Detail Pendaftaran
      </h1>

      <nav class="flex items-center text-sm text-slate-500 mr-5">
        <RouterLink
          :to="{ name: 'AdminPendaftaran' }"
          class="hover:text-slate-700 transition"
        >
          Home
        </RouterLink>

        <ChevronRight class="w-4 h-4 text-slate-400 mx-1" />

        <span class="text-slate-700 font-medium"> Detail </span>
      </nav>
    </div>

    <div
      class="bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800 mb-6"
    >
      <div class="w-full rounded-lg overflow-hidden shadow bg-white">
        <div class="h-16 bg-slate-200"></div>

        <div class="px-6 pb-6 -mt-10">
          <div class="flex items-end justify-between">
            <div
              class="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center text-purple-700 font-semibold text-xl shadow"
            >
              SA
            </div>

            <div class="">
              <p class="text-gray-400 text-sm">Daftar: 12 Apr 2025</p>
            </div>
          </div>

          <div class="mt-4">
            <h2 class="text-base font-semibold text-gray-800">Siti Aisya</h2>

            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div class="text-sm flex gap-3">
                <span class="text-gray-700">PSB-2025-TK-001</span>
                <span class="text-gray-700">Terverifikasi</span>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <button
                  class="flex items-center gap-2 border border-slate-600 text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  <SquarePen class="w-4 h-4" />
                  Edit
                </button>

                <button
                  class="border border-slate-600 text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition"
                >
                  Terima
                </button>

                <button
                  class="border border-slate-600 text-slate-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                >
                  Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { SquarePen, ChevronRight } from "lucide-vue-next";
</script>

<style lang="scss" scoped></style>
