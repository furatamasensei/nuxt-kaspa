import { useRuntimeConfig } from "#app";
import type { Params } from "../types";

export const useKaspaApi = () => {
  const _network = useRuntimeConfig().public.kaspa.network;

  const _baseUrl =
    _network === "mainnet"
      ? "https://api.kaspa.org"
      : "https://api-tn10.kaspa.org";

  /**
   * Get balance for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   */
  const getBalance = (kaspaAddress: string) => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/balance`);
  };

  /**
   * Get balances for multiple addresses.
   * @param params List of addresses
   */
  const postBalance = (params: Params) => {
    return $fetch(`${_baseUrl}/addresses/balance`, {
      method: "POST",
      body: params,
    });
  };

  /**
   * Get UTXOs for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   */
  const getUtxos = (kaspaAddress: string) => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/utxos`);
  };

  /**
   * Get UTXOs for multiple addresses.
   * @param params List of addresses
   */
  const postUtxos = (params: Params) => {
    return $fetch(`${_baseUrl}/addresses/utxos`, {
      method: "POST",
      body: params,
    });
  };

  /**
   * Retrieves full transaction details for a specific Kaspa address.
   * @param address The Kaspa wallet address to query.
   * @param param Optional query parameters (e.g., limit, offset, fields, resolve_previous_outpoints).
   * @returns A Promise resolving to the full transaction details.
   */
  const getFullTransactions = (
    address: string,
    param: Record<string, string> = {}
  ) => {
    return $fetch(`${_baseUrl}/addresses/${address}/full-transactions`, param);
  };

  /**
   * Get transaction count for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   */
  const getTransactionsCount = (kaspaAddress: string) => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/transactions-count`);
  };

  const getInfoBlockdagInfo = () => {
    return $fetch(`${_baseUrl}/info/blockdag`);
  };

  const getInfoCoinsupply = () => {
    return $fetch(`${_baseUrl}/info/coinsupply`);
  };

  const getInfoCoinsupplyCirculating = () => {
    return $fetch(`${_baseUrl}/info/coinsupply/circulating`);
  };

  const getInfoCoinsupplyTotal = () => {
    return $fetch(`${_baseUrl}/info/coinsupply/total`);
  };

  const getInfoKaspad = () => {
    return $fetch(`${_baseUrl}/info/kaspad`);
  };

  const getInfoNetwork = () => {
    return $fetch(`${_baseUrl}/info/network`);
  };

  const getInfoFeeEstimate = () => {
    return $fetch(`${_baseUrl}/info/fee-estimate`);
  };

  const getInfoPrice = () => {
    return $fetch(`${_baseUrl}/info/price`);
  };

  const getInfoBlockReward = () => {
    return $fetch(`${_baseUrl}/info/blockreward`);
  };

  const getInfoHalving = () => {
    return $fetch(`${_baseUrl}/info/halving`);
  };

  const getInfoHashRate = () => {
    return $fetch(`${_baseUrl}/info/hashrate`);
  };

  const getInfoHashRateMax = () => {
    return $fetch(`${_baseUrl}/info/hashrate/max`);
  };

  const getInfoHealth = () => {
    return $fetch(`${_baseUrl}/info/health`);
  };

  const getInfoMarketcap = () => {
    return $fetch(`${_baseUrl}/info/marketcap`);
  };

  /**
   * Get block details by block ID.
   * @param blockId The block identifier
   */
  const getBlocksBlockId = (blockId: string) => {
    return $fetch(`${_baseUrl}/blocks/${blockId}`);
  };

  const getBlocks = () => {
    return $fetch(`${_baseUrl}/blocks`);
  };

  const getBlocksFromBluescore = () => {
    return $fetch(`${_baseUrl}/blocks-from-bluescore`);
  };

  /**
   * Get transaction details by transaction ID.
   * @param transactionId The transaction identifier
   */
  const getTransactionsId = (transactionId: string) => {
    return $fetch(`${_baseUrl}/transactions/${transactionId}`);
  };

  /**
   * Search transactions based on parameters.
   * @param params The search query parameters
   */
  const postTransactionsSearch = (params: Params) => {
    return $fetch(`${_baseUrl}/transactions/search`, {
      method: "POST",
      body: params,
    });
  };

  /**
   * Submit a new transaction.
   * @param params The transaction data
   */
  const postTransactions = (params: Params) => {
    return $fetch(`${_baseUrl}/transactions`, {
      method: "POST",
      body: params,
    });
  };

  /**
   * Submit multiple transactions in a batch.
   * @param params The batch transaction data
   */
  const postTransactionsMass = (params: Params) => {
    return $fetch(`${_baseUrl}/transactions/mass`, {
      method: "POST",
      body: params,
    });
  };

  return {
    getBalance,
    postBalance,
    getUtxos,
    postUtxos,
    getFullTransactions,
    getTransactionsCount,
    getInfoBlockdagInfo,
    getInfoCoinsupply,
    getInfoCoinsupplyCirculating,
    getInfoCoinsupplyTotal,
    getInfoKaspad,
    getInfoNetwork,
    getInfoFeeEstimate,
    getInfoPrice,
    getInfoBlockReward,
    getInfoHalving,
    getInfoHashRate,
    getInfoHashRateMax,
    getInfoHealth,
    getInfoMarketcap,
    getBlocksBlockId,
    getBlocks,
    getBlocksFromBluescore,
    getTransactionsId,
    postTransactionsSearch,
    postTransactions,
    postTransactionsMass,
  };
};
