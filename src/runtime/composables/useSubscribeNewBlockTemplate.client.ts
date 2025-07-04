import { onUnmounted, useKaspaRpc } from '#imports'
import type { INewBlockTemplate } from '../kaspa/kaspa'

export const useSubscribeNewBlockTemplate = (
  callback: (event: INewBlockTemplate) => void,
) => {
  const rpc = useKaspaRpc()

  rpc.subscribeNewBlockTemplate().then(() => {
    rpc.addEventListener('new-block-template', callback)
  })

  onUnmounted(() => {
    rpc.removeEventListener('new-block-template', callback)
    rpc.unsubscribeNewBlockTemplate()
  })
}
