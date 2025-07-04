<script setup lang="ts">
// @ts-ignore
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

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
</script>

<template>
  <div class="bg-neutral-950 min-h-[435px] max-w-full text-xs p-4">
    <DynamicScroller
      ref="scrollerRef"
      :items="model"
      :min-item-size="24"
      class="scroller"
      @resize="scrollToBottom()"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <div
            class="whitespace-nowrap font-mono text-neutral-500 dark:text-neutral-400"
          >
            {{ render(item) }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
