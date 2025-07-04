<script setup lang="ts">
const props = defineProps<{
  to: string
  title: string
  description: string
}>()

const className = computed(() => {
  return props.to === useRoute().path
    ? 'block w-full p-4 bg-primary/20 dark:bg-primary-900/20 text-primary'
    : 'block w-full p-4 cursor-pointer hover:bg-neutral-100/20 dark:hover:bg-neutral-800/20'
})

const descriptionClassName = computed(() => {
  return props.to === useRoute().path
    ? 'text-sm'
    : 'text-sm text-neutral-600 dark:text-neutral-400'
})
</script>

<template>
  <NuxtLink :to :class="className">
    <div class="font-semibold">{{ title }}</div>
    <div :class="descriptionClassName">
      {{ description }}
    </div>
  </NuxtLink>
</template>
