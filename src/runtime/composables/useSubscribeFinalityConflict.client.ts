import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { IFinalityConflict } from '../kaspa/kaspa'

export const useSubscribeFinalityConflict = (
  callback: (event: IFinalityConflict) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeFinalityConflict().then(() => {
      rpc.addEventListener('finality-conflict', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('finality-conflict', callback)
    rpc.unsubscribeFinalityConflict()
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
