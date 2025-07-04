import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { IPruningPointUtxoSetOverride } from '../kaspa/kaspa'

export const useSubscribePruningPointUtxoSetOverride = (
  callback: (event: IPruningPointUtxoSetOverride) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribePruningPointUtxoSetOverride().then(() => {
      rpc.addEventListener('pruning-point-utxo-set-override', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('pruning-point-utxo-set-override', callback)
    rpc.unsubscribePruningPointUtxoSetOverride()
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
