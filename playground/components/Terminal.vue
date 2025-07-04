<script setup lang="ts">
// @ts-ignore
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const emit = defineEmits(['pause', 'resume'])

const model = defineModel({ type: Array, default: () => [] })

const scrollerRef = ref<DynamicScroller | null>(null)
const scrollToBottom = () => {
  if (scrollerRef.value) {
    scrollerRef.value.scrollToBottom()
  }
}

const render = (data: any) => {
  return JSON.stringify(data, (_, value) => {
    return typeof value === 'bigint' ? Number(value) : value
  })
}

const paused = ref(false)
const togglePause = () => {
  paused.value = !paused.value
  if (paused.value) {
    emit('pause')
  } else {
    emit('resume')
  }
}
</script>

<template>
  <UCard variant="subtle" :ui="{ body: '!p-0' }">
    <template #header>
      <div class="flex items-center justify-between">
        <UCard variant="subtle" :ui="{ body: '!p-1.5 !px-3' }">
          <div class="font-medium text-sm">Terminal</div>
        </UCard>
        <UButton
          variant="subtle"
          color="neutral"
          :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
          :label="paused ? 'Resume' : 'Pause'"
          size="sm"
          @click="togglePause"
        />
      </div>
    </template>
    <div class="bg-neutral-950 min-h-[435px] max-w-full text-xs p-4">
      <DynamicScroller
        ref="scrollerRef"
        :items="model"
        :min-item-size="24"
        class="scroller"
        @resize="scrollToBottom()"
      >
        <template #default="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          >
            <div class="whitespace-nowrap font-mono text-primary-600">
              {{ render(item) }}
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>
  </UCard>
</template>
