import { onMounted, onUnmounted, useKaspaRpc } from '#imports'
import type { INewBlockTemplate } from '../kaspa/kaspa'

export const useSubscribeNewBlockTemplate = (
  callback: (event: INewBlockTemplate) => void,
  options: { immediate?: boolean } = { immediate: true },
) => {
  const rpc = useKaspaRpc()

  const start = () => {
    rpc.subscribeNewBlockTemplate().then(() => {
      rpc.addEventListener('new-block-template', callback)
    })
  }

  const stop = () => {
    rpc.removeEventListener('new-block-template', callback)
    rpc.unsubscribeNewBlockTemplate()
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
