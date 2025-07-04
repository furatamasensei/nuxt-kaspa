import { useNuxtApp } from '#app'

export const useKaspaRpc = () => useNuxtApp().$kaspa.rpc.value!
