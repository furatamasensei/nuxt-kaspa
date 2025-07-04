import { useRuntimeConfig } from "#app";
import { useKaspaRpc } from "#imports";
import {
  Address,
  addressFromScriptPublicKey,
  PrivateKey,
  ScriptBuilder,
  SighashType,
  type HexString,
} from "../kaspa/kaspa";
import type { Krc20Data } from "../types";
import { OP } from "../types/enum";
import {
  BASE_P2SH_TO_KASPA_ADDRESS,
  createOutputs,
  DEFAULT_FEE,
  getFeeByOp,
  getRevealEntries,
} from "../utils";
import { useScriptBuilder } from "./useScriptBuilder";
import { useTransaction } from "./useTransaction.client";
import { useValidator } from "./useValidator.client";

export const useKrc20Transaction = () => {
  const { validate } = useValidator();

  const executeCommit = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n
  ) => {
    validate(data);

    const fromAddress = new PrivateKey(privateKey)
      .toPublicKey()
      .toAddress(useRuntimeConfig().public.kaspa.network)
      .toString();

    const script = createScript(privateKey, data);
    const p2shAddress = createP2SHAddress(script);
    let { p2shFee, priorityFee } = getFeeInfo(data.op);
    const outputs = createOutputs(p2shAddress.toString(), p2shFee);

    const { entries } = await useKaspaRpc().getUtxosByAddresses([fromAddress]);

    const { createSignAndSubmitTransactions } = useTransaction();
    return await createSignAndSubmitTransactions(
      {
        changeAddress: fromAddress,
        outputs,
        priorityFee: fee,
        entries,
      },
      privateKey
    );
  };

  const executeReveal = async (
    privateKey: string,
    data: Krc20Data,
    commitTxid: string
  ) => {
    validate(data);

    const script = createScript(privateKey, data);
    const p2shAddress = createP2SHAddress(script);
    const fromAddress = new PrivateKey(privateKey)
      .toPublicKey()
      .toAddress(useRuntimeConfig().public.kaspa.network)
      .toString();

    const rpc = useKaspaRpc();
    let { priorityFee } = getFeeInfo(data.op);
    const { entries } = await rpc.getUtxosByAddresses([p2shAddress]);
    const entry = entries.find((entry) => {
      return entry.entry.outpoint.transactionId === commitTxid;
    });
    if (entry == undefined) throw Error("commit txid not find");
    priorityFee = priorityFee === 0n ? 100000n : priorityFee;

    return await useTransaction()
      .createTransactions({
        changeAddress: fromAddress,
        outputs: [],
        priorityFee,
        entries: [entry],
      })
      .then((r) => {
        r.transactions.forEach((transaction) => {
          transaction.transaction.inputs.forEach((_, index) => {
            const signature = transaction.createInputSignature(
              index,
              new PrivateKey(privateKey)
            );
            transaction.fillInput(
              index,
              script.encodePayToScriptHashSignatureScript(signature)
            );
          });
          transaction.submit(rpc);
        });
      });
  };

  /**
   * Executes a KRC20 operation.
   * .param privateKey - The private key.
   * .param data - The KRC20 data.
   * .param fee - The transaction fee.
   * .param payload - The transaction payload.
   * .returns The submitted transaction ID.
   */
  const executeOperation = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    validate(data);

    const script = createScript(privateKey, data);
    const p2shAddress = createP2SHAddress(script);
    const fromAddress = new PrivateKey(privateKey)
      .toPublicKey()
      .toAddress(useRuntimeConfig().public.kaspa.network)
      .toString();

    let { p2shFee, priorityFee } = getFeeInfo(data.op);
    const outputs = createOutputs(p2shAddress.toString(), p2shFee);

    const { entries } = await useKaspaRpc().getUtxosByAddresses([fromAddress]);
    const { createSignAndSubmitTransactions, createTransactions } =
      useTransaction();

    // Commit phase
    const commitTxid = await createSignAndSubmitTransactions(
      {
        changeAddress: fromAddress,
        outputs,
        priorityFee: fee,
        entries,
      },
      privateKey
    );

    // Reveal phase
    const revealEntries = entries.filter(
      (entry) => entry.entry.outpoint.transactionId === commitTxid
    );
    priorityFee = priorityFee === 0n ? 100000n : priorityFee;

    return await createTransactions({
      changeAddress: fromAddress,
      outputs: [],
      priorityFee,
      entries: revealEntries,
      payload,
    }).then((r) => {
      r.transactions.forEach((transaction) => {
        transaction.transaction.inputs.forEach((_, index) => {
          const signature = transaction.createInputSignature(
            index,
            new PrivateKey(privateKey)
          );
          transaction.fillInput(
            index,
            script.encodePayToScriptHashSignatureScript(signature)
          );
        });
        transaction.submit(useKaspaRpc());
      });
    });
  };

  /**
   * Mints new KRC20 tokens.
   * @param privateKey - The private key for signing the transaction.
   * @param data - The KRC20 data containing mint details.
   * @param fee - The transaction fee.
   * @param payload - (Optional) payload in the transaction.
   * @returns The submitted reveal transaction.
   */
  const mint = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Mint)
      throw new Error("Invalid input: 'op' must be 'mint'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  /**
   * Deploys a new KRC20 token contract.
   * @param privateKey - The private key for signing the transaction.
   * @param data - The KRC20 data containing deployment details.
   * @param fee - The transaction fee.
   * @param payload - (Optional) payload in the transaction.
   * @returns The submitted reveal transaction.
   */
  const deploy = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Deploy)
      throw new Error("Invalid input: 'op' must be 'deploy'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  /**
   * Transfers KRC20 tokens to another address.
   * @param privateKey - The private key for signing the transaction.
   * @param data - The KRC20 data containing transfer details.
   * @param fee - The transaction fee.
   * @param payload - (Optional) payload in the transaction.
   * @returns The submitted reveal transaction.
   */
  const transfer = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (!data.to || !data.amt)
      throw new Error("Invalid input: 'to' and 'amt' must be provided");
    return await executeOperation(privateKey, data, fee, payload);
  };

  /**
   * Lists KRC20 token details.
   * @param privateKey - The private key for signing the transaction.
   * @param data - The KRC20 data containing listing details.
   * @param fee - The transaction fee.
   * @returns The submitted reveal transaction.
   */
  const list = async (
    privateKey: any, // Replace 'any' with the correct type if available
    data: Krc20Data,
    fee: bigint = 0n
  ) => {
    if (data.op !== OP.List)
      throw new Error("Invalid input: 'op' must be 'list'");
    validate(data);

    const script = createScript(privateKey, data);
    const p2shAddress = createP2SHAddress(script);
    const fromAddress = new PrivateKey(privateKey)
      .toPublicKey()
      .toAddress(useRuntimeConfig().public.kaspa.network)
      .toString();

    let { p2shFee, priorityFee } = getFeeInfo(data.op);
    const outputs = createOutputs(p2shAddress.toString(), p2shFee);

    const { entries } = await useKaspaRpc().getUtxosByAddresses([fromAddress]);
    const { createSignAndSubmitTransactions, createTransactions } =
      useTransaction();

    // Commit phase
    const commitTxid = await createSignAndSubmitTransactions(
      {
        changeAddress: fromAddress,
        outputs,
        priorityFee: fee,
        entries,
      },
      privateKey
    );

    // Reveal phase
    const revealEntries = entries.filter(
      (entry) => entry.entry.outpoint.transactionId === commitTxid
    );
    priorityFee = priorityFee === 0n ? 100000n : priorityFee;

    return await createTransactions({
      changeAddress: fromAddress,
      outputs: [],
      priorityFee,
      entries: revealEntries,
    }).then((r) => {
      r.transactions.forEach((transaction) => {
        transaction.transaction.inputs.forEach((_, index) => {
          const signature = transaction.createInputSignature(
            index,
            new PrivateKey(privateKey)
          );
          transaction.fillInput(
            index,
            script.encodePayToScriptHashSignatureScript(signature)
          );
        });
        transaction.submit(useKaspaRpc());
      });
    });
  };

  /**
   * Signs and sends a KRC20 'send' transaction.
   * @param privateKey - The private key.
   * @param data - The KRC20 data.
   * @param hash - The transaction hash.
   * @param amount - The amount.
   * @param payload - The payload.
   * @returns The serialized transaction.
   */
  const sendTransaction = async (
    privateKey: string,
    data: Krc20Data,
    hash: string,
    amount: bigint,
    payload: string = ""
  ) => {
    if (data.op !== OP.Send) {
      throw new Error("Invalid input: 'op' must be 'send'");
    }

    const script = createScript(privateKey, data);
    const scriptPublicKey = script.createPayToScriptHashScript();
    const p2shAddress = addressFromScriptPublicKey(
      scriptPublicKey,
      useRuntimeConfig().public.kaspa.network
    )!;

    const fromAddress = new PrivateKey(privateKey)
      .toPublicKey()
      .toAddress(useRuntimeConfig().public.kaspa.network)
      .toString();

    const { entries } = await useKaspaRpc().getUtxosByAddresses([
      p2shAddress!.toString(),
    ]);

    const entry = entries.find(
      (entry) => entry.entry.outpoint.transactionId === hash
    );
    if (entry == undefined) throw Error("commit txid not find");

    const output = createOutputs(fromAddress, amount);
    const revealEntries = getRevealEntries(
      p2shAddress,
      hash,
      scriptPublicKey,
      entry.amount
    );
    const txWithEntries = useTransaction().createTransactionWithEntries(
      revealEntries,
      output,
      0n,
      payload,
      1
    );

    return useTransaction()
      .sign(
        txWithEntries,
        new PrivateKey(privateKey),
        script,
        SighashType.SingleAnyOneCanPay
      )!
      .toJSON();
  };

  const getFeeInfo = (op: OP) => {
    const priorityFee = getFeeByOp(op);
    const p2shFee =
      (priorityFee === 0n ? DEFAULT_FEE : priorityFee) +
      BASE_P2SH_TO_KASPA_ADDRESS;
    return { p2shFee, priorityFee };
  };

  /**
   * Creates a KRC20 script.
   * .param privateKey - The private key.
   * .param data - The KRC20 data.
   * .returns The generated script.
   */
  const createScript = (privateKey: string, data: Krc20Data): ScriptBuilder => {
    return useScriptBuilder().createKrc20Script(
      new PrivateKey(privateKey).toPublicKey().toString(),
      data
    );
  };

  const createP2SHAddress = (script: ScriptBuilder): Address => {
    return addressFromScriptPublicKey(
      script.createPayToScriptHashScript(),
      useRuntimeConfig().public.kaspa.network
    )!;
  };

  const issue = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Issue)
      throw new Error("Invalid input: 'op' must be 'issue'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  const burn = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Burn)
      throw new Error("Invalid input: 'op' must be 'burn'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  const blacklist = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Blacklist)
      throw new Error("Invalid input: 'op' must be 'blacklist'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  const chown = async (
    privateKey: string,
    data: Krc20Data,
    fee: bigint = 0n,
    payload?: HexString | Uint8Array
  ) => {
    if (data.op !== OP.Chown)
      throw new Error("Invalid input: 'op' must be 'chown'");
    return await executeOperation(privateKey, data, fee, payload);
  };

  return {
    executeCommit,
    executeReveal,
    executeOperation,
    mint,
    deploy,
    transfer,
    list,
    sendTransaction,
  };
};
