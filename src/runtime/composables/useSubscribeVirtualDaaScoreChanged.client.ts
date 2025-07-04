import { onUnmounted, useKaspaRpc } from '#imports'
import type { IVirtualDaaScoreChanged } from '../kaspa/kaspa'

export const useSubscribeVirtualDaaScoreChanged = (
  callback: (event: IVirtualDaaScoreChanged) => void,
) => {
  const rpc = useKaspaRpc()

  rpc.subscribeVirtualDaaScoreChanged().then(() => {
    rpc.addEventListener('virtual-daa-score-changed', callback)
  })

  onUnmounted(() => {
    rpc.removeEventListener('virtual-daa-score-changed', callback)
    rpc.unsubscribeVirtualDaaScoreChanged()
  })
}
