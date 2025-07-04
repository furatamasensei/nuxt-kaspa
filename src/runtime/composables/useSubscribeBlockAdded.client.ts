import { onUnmounted } from "vue";
import type { IBlockAdded } from "../kaspa/kaspa";
import { useKaspaRpc } from "./useKaspaRpc.client";

export const useSubscribeBlockAdded = (
  callback: (event: IBlockAdded) => void
) => {
  const rpc = useKaspaRpc();

  rpc.subscribeBlockAdded().then(() => {
    rpc.addEventListener("block-added", callback);
  });

  onUnmounted(() => {
    rpc.removeEventListener("block-added", callback);
    rpc.unsubscribeBlockAdded();
  });
};
