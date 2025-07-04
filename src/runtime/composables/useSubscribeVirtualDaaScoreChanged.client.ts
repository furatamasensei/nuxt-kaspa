import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { IVirtualDaaScoreChanged } from '../kaspa/kaspa'

export const useSubscribeVirtualDaaScoreChanged = (
  callback: (event: IVirtualDaaScoreChanged) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeVirtualDaaScoreChanged().then(() => {
      rpc.addEventListener('virtual-daa-score-changed', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('virtual-daa-score-changed', callback)
    rpc.unsubscribeVirtualDaaScoreChanged()
  }

  onMounted(() => {
    if (options.immediate) {
      start()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    start,
    stop,
  }
}
