import { onUnmounted, useKaspaRpc } from "#imports";
import type { IPruningPointUtxoSetOverride } from "../kaspa/kaspa";

export const useSubscribePruningPointUtxoSetOverride = (
  callback: (event: IPruningPointUtxoSetOverride) => void
) => {
  const rpc = useKaspaRpc();

  rpc.subscribePruningPointUtxoSetOverride().then(() => {
    rpc.addEventListener("pruning-point-utxo-set-override", callback);
  });

  onUnmounted(() => {
    rpc.removeEventListener("pruning-point-utxo-set-override", callback);
    rpc.subscribePruningPointUtxoSetOverride();
  });
};
