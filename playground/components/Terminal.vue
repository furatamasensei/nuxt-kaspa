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
    <div class="h-[435px] max-w-full p-4">
      <DynamicScroller
        v-if="model.length"
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
            <div class="whitespace-nowrap font-mono text-primary-500 text-xs">
              {{ render(item) }}
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
      <div v-else class="h-full flex flex-col items-center justify-center">
        <UIcon
          name="i-lucide-triangle-alert"
          class="text-yellow-500 text-4xl"
        />
        <div class="text-neutral mt-2 max-w-lg mx-auto text-center text-sm">
          If you see this, it means that there are no events to display.
          <br />
          The blockchain might not have emitted any events yet.
          <br />
          This is not a bug.
        </div>
      </div>
    </div>
  </UCard>
</template>
