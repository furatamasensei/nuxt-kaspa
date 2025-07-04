import { onUnmounted, useKaspaRpc } from '#imports'
import type { IFinalityConflict } from '../kaspa/kaspa'

export const useSubscribeFinalityConflict = (
  callback: (event: IFinalityConflict) => void,
) => {
  const rpc = useKaspaRpc()

  rpc.subscribeFinalityConflict().then(() => {
    rpc.addEventListener('finality-conflict', callback)
  })

  onUnmounted(() => {
    rpc.removeEventListener('finality-conflict', callback)
    rpc.unsubscribeFinalityConflict()
  })
}
