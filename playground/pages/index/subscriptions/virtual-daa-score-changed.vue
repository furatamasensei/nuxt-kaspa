<script setup lang="ts">
import type { IVirtualDaaScoreChanged } from '../../../../src/runtime/types'

const data = ref<IVirtualDaaScoreChanged[]>([])
const id = ref(0)

const { start, stop } = useSubscribeVirtualDaaScoreChanged((event) => {
  data.value.push({ ...event, id: ++id.value })

  // limit the number of events to avoid memory issues
  if (data.value.length > 25) {
    data.value.splice(0, data.value.length - 25)
  }
})

const code = `<script setup lang="ts">
  import type { IVirtualDaaScoreChanged } from '@nuxtjs/kaspa'

  const data = ref<IVirtualDaaScoreChanged[]>([])
  const id = ref(0)

  const { start, stop } = useSubscribeVirtualDaaScoreChanged((event) => {
    data.value.push({ ...event, id: ++id.value })

    // limit the number of events to avoid memory issues
    if (data.value.length > 25) {
      data.value.splice(0, data.value.length - 25)
    }
  })
<\/script>

<template>
  <Terminal v-model="data" @pause="stop" @resume="start" />
<\/template>`
</script>

<template>
  <Terminal v-model="data" @pause="stop" @resume="start" />
  <CodeSample :code class="mt-3" />
</template>
