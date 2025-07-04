import { onUnmounted, useKaspaRpc } from '#imports'
import type { IVirtualChainChanged } from '../kaspa/kaspa'

export const useSubscribeVirtualChainChanged = (options: {
  includeAcceptedTransactionIds: boolean
  callback: (event: IVirtualChainChanged) => void
}) => {
  const rpc = useKaspaRpc()

  rpc
    .subscribeVirtualChainChanged(options.includeAcceptedTransactionIds)
    .then(() => {
      rpc.addEventListener('virtual-chain-changed', options.callback)
    })

  onUnmounted(() => {
    rpc.removeEventListener('virtual-chain-changed', options.callback)
    rpc.unsubscribeVirtualChainChanged(options.includeAcceptedTransactionIds)
  })
}
