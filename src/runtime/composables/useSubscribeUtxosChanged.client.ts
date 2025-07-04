import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { Address, IUtxosChanged } from '../kaspa/kaspa'

export const useSubscribeUtxosChanged = (options: {
  addresses: (Address | string)[]
  callback: (event: IUtxosChanged) => void
  immediate?: boolean
}) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeUtxosChanged(options.addresses).then(() => {
      rpc.addEventListener('utxos-changed', options.callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('utxos-changed', options.callback)
    rpc.unsubscribeUtxosChanged(options.addresses)
  }

  onMounted(() => {
    if (options.immediate !== false) {
      start()
    }
  })

  onUnmounted(() => stop())

  return {
    start,
    stop,
  }
}
