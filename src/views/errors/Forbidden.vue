<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-10">
    <h1 class="text-6xl font-bold text-gray-800 dark:text-white">403: Forbidden</h1>
    <p class="text-xl text-gray-500 dark:text-gray-400">You do not have permission to access this page.</p>
    <button @click="$router.go(-1)" class="text-brand-500 hover:text-brand-600 dark:text-brand-400">Go back</button>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
