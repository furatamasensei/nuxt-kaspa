import { useKaspaRpc, useRuntimeConfig } from "#imports";
import {
  createInputSignature,
  createTransactions as createKaspaTransactions,
  createTransaction,
  Generator,
  PendingTransaction,
  PrivateKey,
  ScriptBuilder,
  SighashType,
  signTransaction,
  Transaction,
  type HexString,
  type IGeneratorSettingsObject,
  type IPaymentOutput,
  type IUtxoEntry,
} from "../kaspa/kaspa";

export const useTransaction = () => {
  const config = useRuntimeConfig();

  const generateTransaction = (options: IGeneratorSettingsObject) => {
    return new Generator({
      ...options,
      networkId: config.public.kaspa.network,
    });
  };

  const generateSignAndSubmitTransaction = async (
    options: IGeneratorSettingsObject,
    privateKey: PrivateKey | HexString | Uint8Array | string,
    checkFullySigned: boolean = true
  ) => {
    const generator = generateTransaction(options);

    const pendingTx: PendingTransaction | null = await generator.next();

    if (!pendingTx) {
      throw new Error("Failed to generate transaction");
    }

    const privateKeys = pendingTx.addresses().map(() => {
      return privateKey;
    });

    return await signAndSubmitPendingTransaction(
      pendingTx,
      privateKeys,
      checkFullySigned
    );
  };

  const createTransactions = (options: IGeneratorSettingsObject) => {
    return createKaspaTransactions({
      ...options,
      networkId: config.public.kaspa.network,
    });
  };

  const createSignAndSubmitTransactions = async (
    options: IGeneratorSettingsObject,
    privateKey: PrivateKey | HexString | Uint8Array | string
  ) => {
    const { transactions, summary } = await createKaspaTransactions(options);

    if (transactions.length > 0) {
      await signAndSubmitPendingTransaction(transactions[0], [privateKey]);
    }

    // Handle the remaining transactions, waiting for the `time-to-submit` event
    for (let i = 1; i < transactions.length; i++) {
      await signAndSubmitPendingTransaction(transactions[i], [privateKey]);
    }

    return summary.finalTransactionId;
  };

  const signAndSubmitPendingTransaction = async (
    transaction: PendingTransaction,
    privateKeys: (PrivateKey | HexString | Uint8Array | string)[],
    checkFullySigned?: boolean
  ) => {
    const rpc = useKaspaRpc();

    transaction.sign(privateKeys, checkFullySigned);

    return await transaction.submit(rpc);
  };

  const createTransactionWithEntries = (
    entries: IUtxoEntry[],
    outputs: IPaymentOutput[],
    priorityFee: bigint,
    payload?: HexString | Uint8Array,
    sigOpCount?: number
  ) => {
    return createTransaction(
      entries,
      outputs,
      priorityFee,
      payload,
      sigOpCount
    );
  };

  const sign = (
    transaction: Transaction,
    privateKey: PrivateKey,
    script?: ScriptBuilder,
    sigHashType?: SighashType
  ) => {
    if (script) {
      const length = transaction.inputs.length;
      for (let i = 0; i < length; i++) {
        const signature = createInputSignature(
          transaction,
          i,
          privateKey,
          sigHashType
        );
        transaction.inputs[i].signatureScript =
          script.encodePayToScriptHashSignatureScript(signature);
      }
    } else {
      return signTransaction(transaction, [privateKey], false);
    }
  };

  return {
    generateTransaction,
    generateSignAndSubmitTransaction,
    createTransactions,
    createSignAndSubmitTransactions,
    signAndSubmitPendingTransaction,
    createTransactionWithEntries,
    sign,
  };
};
