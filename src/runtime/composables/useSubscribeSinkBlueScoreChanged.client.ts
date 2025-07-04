import { onMounted, onUnmounted } from 'vue'
import type { ISinkBlueScoreChanged } from '../kaspa/kaspa'
import { useKaspaRpc } from './useKaspaRpc.client'

export const useSubscribeSinkBlueScoreChanged = (
  callback: (event: ISinkBlueScoreChanged) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeSinkBlueScoreChanged().then(() => {
      rpc.addEventListener('sink-blue-score-changed', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('sink-blue-score-changed', callback)
    rpc.unsubscribeSinkBlueScoreChanged()
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
