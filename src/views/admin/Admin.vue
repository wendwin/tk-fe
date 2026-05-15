<template>
  <div>
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script setup>
import { KeepAlive } from "vue";
</script>
