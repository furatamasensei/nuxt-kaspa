import { onUnmounted, useKaspaRpc } from "#imports";
import type { Address, IUtxosChanged } from "../kaspa/kaspa";

export const useSubscribeUtxosChanged = (options: {
  addresses: (Address | string)[];
  callback: (event: IUtxosChanged) => void;
}) => {
  const rpc = useKaspaRpc();

  rpc.subscribeUtxosChanged(options.addresses).then(() => {
    rpc.addEventListener("utxos-changed", options.callback);
  });

  onUnmounted(() => {
    rpc.removeEventListener("utxos-changed", options.callback);
    rpc.unsubscribeUtxosChanged(options.addresses);
  });
};
