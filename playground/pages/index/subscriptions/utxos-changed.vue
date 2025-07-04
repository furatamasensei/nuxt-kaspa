<script setup lang="ts">
const data = ref<any[]>([])
const id = ref(0)

const { start, stop } = useSubscribeUtxosChanged({
  addresses: [
    'kaspatest:qpjhm33f0n4g89zk0yl8dgtp20a4t4mp37kuq9gt3knytdz986w3s5zgufxl8',
  ],
  callback: (event) => {
    data.value.push({ ...event, id: ++id.value })

    // limit the number of events to avoid memory issues
    if (data.value.length > 25) {
      data.value.splice(0, data.value.length - 25)
    }
  },
})
</script>

<template>
  <Terminal v-model="data" @pause="stop" @resume="start" />
</template>
