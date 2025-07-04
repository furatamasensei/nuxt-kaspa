import { onMounted, onUnmounted } from 'vue'
import type { IBlockAdded } from '../kaspa/kaspa'
import { useKaspaRpc } from './useKaspaRpc.client'

export const useSubscribeBlockAdded = (
  callback: (event: IBlockAdded) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeBlockAdded().then(() => {
      rpc.addEventListener('block-added', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('block-added', callback)
    rpc.unsubscribeBlockAdded()
  }

  onMounted(() => {
    if (options.immediate) {
      start()
    }
  })

  onUnmounted(() => stop())

  return {
    start,
    stop,
  }
}
