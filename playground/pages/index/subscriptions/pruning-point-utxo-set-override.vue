<script setup lang="ts">
const data = ref<any[]>([])
const id = ref(0)

const { start, stop } = useSubscribePruningPointUtxoSetOverride((event) => {
  data.value.push({ ...event, id: ++id.value })

  // limit the number of events to avoid memory issues
  if (data.value.length > 25) {
    data.value.splice(0, data.value.length - 25)
  }
})
</script>

<template>
  <Terminal v-model="data" @pause="stop" @resume="start" />
</template>
