<template>
  <div>
    <div>
      <div
        class="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]"
      >
        <img :src="grid" alt="grid" draggable="false" />
      </div>
      <div
        class="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]"
      >
        <img :src="grid" alt="grid" draggable="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import grid from "@/assets/images/grid-01.svg";
</script>

<style lang="scss" scoped></style>
