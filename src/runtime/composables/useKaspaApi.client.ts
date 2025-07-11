import { useRuntimeConfig } from '#app'
import type {
  KaspaRestBalance,
  KaspaRestBlockdagInfo,
  KaspaRestBlockReward,
  KaspaRestBlocks,
  KaspaRestBlocksBlockId,
  KaspaRestCalculateTransactionMassParams,
  KaspaRestFeeEstimate,
  KaspaRestHalvingInfo,
  KaspaRestHashRate,
  KaspaRestHashRateMax,
  KaspaRestHealth,
  KaspaRestKaspadInfo,
  KaspaRestMarketcap,
  KaspaRestNetworkInfo,
  KaspaRestTransaction,
  KaspaRestTransactionCount,
  KaspaRestTransactionId,
  KaspaRestTransactionMass,
  KaspaRestTransactionSearchParams,
  KaspaRestUtxo,
  Params,
} from '../types'

export const useKaspaApi = () => {
  const _network = useRuntimeConfig().public.kaspa.network

  const _baseUrl =
    _network === 'mainnet'
      ? 'https://api.kaspa.org'
      : 'https://api-tn10.kaspa.org'

  /**
   * Get balance for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   * @return A Promise resolving to the balance of the address.
   */
  const getBalance = (kaspaAddress: string): Promise<KaspaRestBalance> => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/balance`)
  }

  /**
   * Get balances for multiple addresses.
   * @param params List of addresses
   * @return A Promise resolving to an array of balances.
   */
  const postBalance = (params: Params): Promise<KaspaRestBalance[]> => {
    return $fetch(`${_baseUrl}/addresses/balances`, {
      method: 'POST',
      body: params,
    })
  }

  /**
   * Get UTXOs for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   * @returns A Promise resolving to an array of UTXOs.
   */
  const getUtxos = (kaspaAddress: string): Promise<KaspaRestUtxo[]> => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/utxos`)
  }

  /**
   * Get UTXOs for multiple addresses.
   * @param params List of addresses
   * @returns A Promise resolving to an array of UTXOs.
   */
  const postUtxos = (params: Params): Promise<KaspaRestUtxo[]> => {
    return $fetch(`${_baseUrl}/addresses/utxos`, {
      method: 'POST',
      body: params,
    })
  }

  /**
   * Retrieves full transaction details for a specific Kaspa address.
   * @param address The Kaspa wallet address to query.
   * @param param Optional query parameters (e.g., limit, offset, fields, resolve_previous_outpoints).
   * @returns A Promise resolving to the full transaction details.
   */
  const getFullTransactions = (
    address: string,
    param: Record<string, string> = {},
  ): Promise<KaspaRestTransaction[]> => {
    return $fetch(`${_baseUrl}/addresses/${address}/full-transactions`, param)
  }

  /**
   * Get transaction count for a specific Kaspa address.
   * @param kaspaAddress The Kaspa wallet address
   * @returns A Promise resolving to the transaction count.
   */
  const getTransactionsCount = (
    kaspaAddress: string,
  ): Promise<KaspaRestTransactionCount> => {
    return $fetch(`${_baseUrl}/addresses/${kaspaAddress}/transactions-count`)
  }

  /**
   * Get BlockDAG information.
   * @returns A Promise resolving to the BlockDAG information.
   */
  const getInfoBlockdagInfo = (): Promise<KaspaRestBlockdagInfo> => {
    return $fetch(`${_baseUrl}/info/blockdag`)
  }

  const getInfoCoinsupply = (): Promise<string> => {
    return $fetch(`${_baseUrl}/info/coinsupply`)
  }

  const getInfoCoinsupplyCirculating = (): Promise<string> => {
    return $fetch(`${_baseUrl}/info/coinsupply/circulating`)
  }

  const getInfoCoinsupplyTotal = (): Promise<string> => {
    return $fetch(`${_baseUrl}/info/coinsupply/total`)
  }

  const getInfoKaspad = (): Promise<KaspaRestKaspadInfo> => {
    return $fetch(`${_baseUrl}/info/kaspad`)
  }

  const getInfoNetwork = (): Promise<KaspaRestNetworkInfo> => {
    return $fetch(`${_baseUrl}/info/network`)
  }

  const getInfoFeeEstimate = (): Promise<KaspaRestFeeEstimate> => {
    return $fetch(`${_baseUrl}/info/fee-estimate`)
  }

  const getInfoBlockReward = (): Promise<KaspaRestBlockReward> => {
    return $fetch(`${_baseUrl}/info/blockreward`)
  }

  const getInfoHalving = (): Promise<KaspaRestHalvingInfo> => {
    return $fetch(`${_baseUrl}/info/halving`)
  }

  const getInfoHashRate = (): Promise<KaspaRestHashRate> => {
    return $fetch(`${_baseUrl}/info/hashrate`)
  }

  const getInfoHashRateMax = (): Promise<KaspaRestHashRateMax> => {
    return $fetch(`${_baseUrl}/info/hashrate/max`)
  }

  const getInfoHealth = (): Promise<KaspaRestHealth> => {
    return $fetch(`${_baseUrl}/info/health`)
  }

  const getInfoMarketcap = (): Promise<KaspaRestMarketcap> => {
    return $fetch(`${_baseUrl}/info/marketcap`)
  }

  /**
   * Get block details by block ID.
   * @param blockId The block identifier
   */
  const getBlocksBlockId = (
    blockId: string,
    includeColor: boolean = true,
  ): Promise<KaspaRestBlocksBlockId> => {
    return $fetch(`${_baseUrl}/blocks/${blockId}`, {
      query: { includeColor },
    })
  }

  const getBlocks = (lowHash: string): Promise<KaspaRestBlocks> => {
    return $fetch(`${_baseUrl}/blocks`, {
      query: { lowHash },
    })
  }

  const getBlocksFromBluescore = (
    blueScore: number,
  ): Promise<KaspaRestBlocksBlockId[]> => {
    return $fetch(`${_baseUrl}/blocks-from-bluescore`, {
      query: { blueScore },
    })
  }

  /**
   * Get transaction details by transaction ID.
   * @param transactionId The transaction identifier
   */
  const getTransactionsId = (
    transactionId: string,
  ): Promise<KaspaRestTransactionId> => {
    return $fetch(`${_baseUrl}/transactions/${transactionId}`)
  }

  /**
   * Search transactions based on parameters.
   * @param params The search query parameters
   */
  const postTransactionsSearch = (params: KaspaRestTransactionSearchParams) => {
    return $fetch(`${_baseUrl}/transactions/search`, {
      method: 'POST',
      body: params,
    })
  }

  /**
   * Submit a new transaction.
   * @param params The transaction data
   */
  const postTransactions = (
    params: KaspaRestCalculateTransactionMassParams,
  ) => {
    return $fetch(`${_baseUrl}/transactions`, {
      method: 'POST',
      body: params,
    })
  }

  /**
   * Submit multiple transactions in a batch.
   * @param params The batch transaction data
   */
  const postTransactionsMass = (
    params: KaspaRestCalculateTransactionMassParams,
  ): Promise<KaspaRestTransactionMass> => {
    return $fetch(`${_baseUrl}/transactions/mass`, {
      method: 'POST',
      body: params,
    })
  }

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
  }
}
