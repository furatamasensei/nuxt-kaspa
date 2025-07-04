import { useRuntimeConfig } from '#app'
import type { StatusInfoResponse } from '../types'
import { BASE_URL_MAIN, BASE_URL_TEST } from '../utils'

export const useKasplexApi = () => {
  const _network = useRuntimeConfig().public.kaspa.network

  const _version = '/v1'

  const _baseUrl =
    _network === 'mainnet' ? BASE_URL_MAIN : BASE_URL_TEST + _version

  /**
   * Fetches general blockchain information.
   * @returns {Promise<StatusInfoResponse>} - A promise resolving to the blockchain info response.
   */
  const getInfo = (): Promise<StatusInfoResponse> => {
    return $fetch(`${_baseUrl}/info`)
  }

  /**
   * Retrieves the list of KRC20 tokens.
   * @param param - Optional query parameters.
   */
  const getTokenList = (param: Record<string, string> = {}): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/tokenlist`, { params: param })
  }

  /**
   * Retrieves details of a specific KRC20 token by its ticker symbol.
   * @param tick - The token ticker symbol.
   */
  const getToken = (tick: string): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/token/${tick}`)
  }

  /**
   * Retrieves a list of tokens associated with a specific address.
   * @param address - The wallet address.
   * @param param - Optional query parameters.
   */
  const getAddressTokenList = (
    address: string,
    param: Record<string, string> = {},
  ): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/address/${address}/tokenlist`, {
      params: param,
    })
  }

  /**
   * Retrieves the balance of a specific token for a given address.
   * @param address - The wallet address.
   * @param tick - The token ticker symbol.
   */
  const getBalance = (address: string, tick: string): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/address/${address}/token/${tick}`)
  }

  /**
   * Retrieves a list of KRC20 operations based on query parameters.
   * @param param - Optional query parameters.
   */
  const getOpList = (param: Record<string, string> = {}): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/oplist`, { params: param })
  }

  /**
   * Retrieves details of a specific KRC20 operation by its ID.
   * @param id - The operation ID.
   */
  const getOperationInfo = (id: string): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/op/${id}`)
  }

  /**
   * Retrieves VSPC archive details for a given DAAScore.
   * @param daascore - The DAAScore to look up.
   */
  const getVspcDetail = (daascore: string): Promise<any> => {
    return $fetch(`${_baseUrl}/archive/vspc/${daascore}`)
  }

  /**
   * Retrieves a list of archived operations within a specific range.
   * @param oprange - The operation range.
   */
  const getOpListByRange = (oprange: string): Promise<any> => {
    return $fetch(`${_baseUrl}/archive/oplist/${oprange}`)
  }

  /**
   * Retrieves market listing details for a specific KRC20 token.
   * @param tick - The token ticker symbol.
   * @param param - Optional query parameters.
   */
  const getMarketInfo = (
    tick: string,
    param: Record<string, string> = {},
  ): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/market/${tick}`, { params: param })
  }

  /**
   * Retrieves the blacklist for a specific contract address.
   * @param ca - The contract address.
   * @param param - Optional query parameters.
   */
  const getBlackList = (
    ca: string,
    param: Record<string, string> = {},
  ): Promise<any> => {
    return $fetch(`${_baseUrl}/krc20/blacklist/${ca}`, { params: param })
  }

  return {
    getInfo,
    getTokenList,
    getToken,
    getAddressTokenList,
    getBalance,
    getOpList,
    getOperationInfo,
    getVspcDetail,
    getOpListByRange,
    getMarketInfo,
    getBlackList,
  }
}
