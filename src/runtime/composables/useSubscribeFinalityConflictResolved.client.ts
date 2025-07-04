import { onUnmounted, useKaspaRpc } from "#imports";
import type { IFinalityConflictResolved } from "../kaspa/kaspa";

export const useSubscribeFinalityConflictResolved = (
  callback: (event: IFinalityConflictResolved) => void
) => {
  const rpc = useKaspaRpc();

  rpc.subscribeFinalityConflictResolved().then(() => {
    rpc.addEventListener("finality-conflict-resolved", callback);
  });

  onUnmounted(() => {
    rpc.removeEventListener("finality-conflict-resolved", callback);
    rpc.unsubscribeFinalityConflictResolved();
  });
};
