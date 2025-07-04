import { onUnmounted, useKaspaRpc } from '#imports'
import type { ISinkBlueScoreChanged } from '../kaspa/kaspa'

export const useSubscribeSinkBlueScoreChanged = (
  callback: (event: ISinkBlueScoreChanged) => void,
) => {
  const rpc = useKaspaRpc()

  rpc.subscribeSinkBlueScoreChanged().then(() => {
    rpc.addEventListener('sink-blue-score-changed', callback)
  })

  onUnmounted(() => {
    rpc.removeEventListener('sink-blue-score-changed', callback)
    rpc.subscribeSinkBlueScoreChanged()
  })
}
