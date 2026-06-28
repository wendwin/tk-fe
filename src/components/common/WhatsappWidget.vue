<template>
  <div class="fixed bottom-6 right-6 z-[9999]">
    <!-- POPUP -->
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-20 right-0 w-[340px] rounded-2xl overflow-hidden shadow-2xl bg-white"
      >
        <!-- HEADER -->
        <div class="bg-[#075E54] text-white p-4">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-semibold">Admin PMB</h3>
              <p class="text-xs opacity-80">KB & TK Masjid Syuhada</p>
            </div>

            <button
              @click="isOpen = false"
              class="hover:bg-white/10 rounded-full p-1"
            >
              <span> <X class="w-5 h-5" /></span>
            </button>
          </div>
        </div>

        <!-- BODY -->
        <div class="bg-[#ECE5DD] p-4">
          <div
            class="bg-[#DCF8C6] inline-block px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] text-gray-800"
          >
            <p class="text-sm">Assalamu'alaikum</p>

            <p class="text-sm mt-1">
              Ada yang ingin ditanyakan terkait PPDB KB & TK Masjid Syuhada?
            </p>
          </div>
        </div>

        <!-- INPUT -->
        <div class="p-4 border-t">
          <div class="flex items-center gap-2">
            <input
              v-model="text"
              type="text"
              placeholder="Tulis pesan..."
              class="flex-1 rounded-full border px-4 py-2 outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
            />

            <a
              :href="whatsappLink"
              target="_blank"
              class="w-10 h-10 rounded-full bg-[#6FC264] text-white flex items-center justify-center hover:bg-[#1ebe5d] transition"
            >
              <span class=""><SendHorizontal class="w-5 h-5" /></span>
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- FLOATING BUTTON -->
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
    >
      <img
        :src="whatsappIcon"
        alt="WhatsApp"
        class="w-8 h-8 brightness-0 invert"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import whatsappIcon from "@/assets/images/logo/whatsapp.svg";
import { X, SendHorizontal } from "lucide-vue-next";

const isOpen = ref(false);

const phone = "628123456789";

const text = ref(
  "Assalamu'alaikum, saya ingin bertanya terkait PPDB KB & TK Masjid Syuhada",
);

const whatsappLink = computed(() => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text.value)}`;
});
</script>
