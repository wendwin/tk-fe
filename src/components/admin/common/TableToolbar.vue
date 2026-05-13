<template>
  <div class="p-3 flex items-center justify-between gap-2 flex-wrap">
    <div class="flex items-center gap-2">
      <slot name="left" />
    </div>

    <div class="flex items-center gap-2">
      <slot name="right" />
    </div>
  </div>
</template>
