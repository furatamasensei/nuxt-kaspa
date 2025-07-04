<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const { copy } = useClipboard()
const toast = useToast()

const copyCode = async () => {
  copy(props.code)
  toast.add({
    title: 'Code copied to clipboard',
    color: 'success',
    duration: 2000,
    icon: 'i-lucide-copy-check',
  })
}
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="flex items-center justify-between">
        <UCard variant="subtle" :ui="{ body: '!p-1.5 !px-3' }">
          <div class="font-medium text-sm">Code</div>
        </UCard>
        <UButton
          variant="subtle"
          color="neutral"
          icon="i-lucide-copy"
          size="sm"
          @click="copyCode"
        />
      </div>
    </template>
    <Shiki :code class="text-sm" />
  </UCard>
</template>
