import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { IVirtualChainChanged } from '../kaspa/kaspa'

export const useSubscribeVirtualChainChanged = (options: {
  includeAcceptedTransactionIds: boolean
  callback: (event: IVirtualChainChanged) => void
  immediate?: boolean
}) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc
      .subscribeVirtualChainChanged(options.includeAcceptedTransactionIds)
      .then(() => {
        rpc.addEventListener('virtual-chain-changed', options.callback)
      })
  }

  const stop = () => {
    rpc.removeEventListener('virtual-chain-changed', options.callback)
    rpc.unsubscribeVirtualChainChanged(options.includeAcceptedTransactionIds)
  }

  onMounted(() => {
    if (options.immediate !== false) {
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
