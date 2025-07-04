<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 items-start">
    <div>
      <div class="font-medium">{{ title }}</div>
      <div class="text-sm text-neutral-600 dark:text-neutral-400">
        {{ description }}
      </div>
      <slot name="descriptor" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
