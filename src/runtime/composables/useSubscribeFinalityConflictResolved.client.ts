import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { IFinalityConflictResolved } from '../kaspa/kaspa'

export const useSubscribeFinalityConflictResolved = (
  callback: (event: IFinalityConflictResolved) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeFinalityConflictResolved().then(() => {
      rpc.addEventListener('finality-conflict-resolved', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('finality-conflict-resolved', callback)
    rpc.unsubscribeFinalityConflictResolved()
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
