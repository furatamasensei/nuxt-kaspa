import type {
  Address,
  IPaymentOutput,
  IUtxoEntry,
  ScriptPublicKey,
} from '../kaspa/kaspa'
import type { AddressVersion } from '../types'
import { OP } from '../types/enum'
import { BASE_KAS_TO_P2SH_ADDRESS, U64_MAX_VALUE } from './constants'

export * from './constants'

export const networkToAddressPrefix = (
  network: 'mainnet' | 'testnet-10',
): string => {
  switch (network) {
    case 'mainnet':
      return 'kaspa'
    case 'testnet-10':
      return 'kaspatest'
    default:
      throw new Error(`Unknown network: ${network}`)
  }
}

export const stringToAddressPrefix = (prefix: string): string | undefined => {
  const validPrefixes = ['kaspa', 'kaspatest']
  return validPrefixes.includes(prefix) ? prefix : undefined
}

export const decodePayload = (prefix: string, address: string): boolean => {
  const addressU5 = Array.from(address).map((c) => {
    const index = c.charCodeAt(0)
    if (index >= RevCharset.length) {
      throw new Error(`Character code ${index} is out of bounds`)
    }
    return RevCharset[index]
  })
  if (address.length < 8) {
    throw new Error('Bad payload')
  }

  const payloadU5 = new Uint8Array(addressU5.slice(0, address.length - 8))
  const checksumU5 = new Uint8Array(addressU5.slice(address.length - 8))
  const fiveBitPrefix = Array.from(prefix).map((c) => c.charCodeAt(0) & 0x1f)
  const checksumBytes = new Uint8Array([
    0,
    0,
    0,
    ...conv5to8(new Uint8Array(checksumU5)),
  ])
  const checksum = new DataView(checksumBytes.buffer).getBigUint64(0, false)

  if (getChecksum(payloadU5, fiveBitPrefix) !== checksum) {
    throw new Error('Bad checksum')
  }

  const payloadU8 = conv5to8(payloadU5)
  let network = addressPrefixToNetwork(prefix)
  toAddress(network, payloadU8[0] as AddressVersion, payloadU8.slice(1))
  return true
}

export const conv5to8 = (payload: Uint8Array): Uint8Array => {
  const eightBit = []
  let buff = 0,
    bits = 0
  for (const c of payload) {
    buff = (buff << 5) | c
    bits += 5
    while (bits >= 8) {
      bits -= 8
      eightBit.push((buff >> bits) & 0xff)
      buff &= (1 << bits) - 1
    }
  }

  return new Uint8Array(eightBit)
}

const conv8to5 = (payload: Uint8Array): Uint8Array => {
  const fiveBit = []
  let buff = 0,
    bits = 0
  for (const c of payload) {
    buff = (buff << 8) | c
    bits += 8
    while (bits >= 5) {
      bits -= 5
      fiveBit.push((buff >> bits) & 0x1f)
      buff &= (1 << bits) - 1
    }
  }

  if (bits > 0) {
    fiveBit.push((buff << (5 - bits)) & 0x1f)
  }
  return new Uint8Array(fiveBit)
}

const getChecksum = (payload: Uint8Array, prefix: number[]): bigint => {
  return polymod(
    new Uint8Array([...prefix, 0, ...payload, ...new Uint8Array(8)]),
  )
}

const polymod = (values: Uint8Array): bigint => {
  let c = 1n
  for (const d of values) {
    const c0 = c >> 35n
    c = ((c & 0x07ffffffffn) << 5n) ^ BigInt(d)
    if ((c0 & 0x01n) !== 0n) c ^= 0x98f2bc8e61n
    if ((c0 & 0x02n) !== 0n) c ^= 0x79b76d99e2n
    if ((c0 & 0x04n) !== 0n) c ^= 0xf33e5fb3c4n
    if ((c0 & 0x08n) !== 0n) c ^= 0xae2eabe2a8n
    if ((c0 & 0x10n) !== 0n) c ^= 0x1e4f43e470n
  }

  return c ^ 1n
}

const addressPrefixToNetwork = (network: string): 'mainnet' | 'testnet-10' => {
  switch (network) {
    case 'kaspa':
      return 'mainnet'
    case 'kaspatest':
      return 'testnet-10'
    default:
      throw new Error(`Unknown network: ${network}`)
  }
}

const toAddress = (
  network: 'mainnet' | 'testnet-10',
  version: AddressVersion,
  payload: Uint8Array,
): string => {
  let prefix = networkToAddressPrefix(network)
  return `${prefix}:${encodePayload(prefix, version, payload)}`
}

const encodePayload = (
  prefix: string,
  version: AddressVersion,
  payload: Uint8Array,
): string => {
  const fiveBitPayload = conv8to5(new Uint8Array([version, ...payload]))
  const fiveBitPrefix = Array.from(prefix).map((c) => c.charCodeAt(0) & 0x1f)
  const checksum = getChecksum(fiveBitPayload, fiveBitPrefix)
  const checksumBytes = new Uint8Array(
    new BigUint64Array([checksum]).buffer,
  ).reverse()
  const combined = new Uint8Array([
    ...fiveBitPayload,
    ...conv8to5(new Uint8Array(checksumBytes.slice(3))),
  ])
  const bytes = Array.from(combined).map((c) => Charset[c])
  return String.fromCharCode(...bytes)
}

export const getFeeByOp = (op: OP): bigint => {
  switch (op) {
    case OP.Deploy:
      return 100000000000n
    case OP.Mint:
      return 100000000n
    case OP.Transfer:
      return 0n
    case OP.Send:
      return 0n
    case OP.List:
      return 0n
    default:
      return 0n
  }
}

export const createOutputs = (
  address: string,
  amount: bigint,
): IPaymentOutput[] => {
  return [{ address, amount }]
}

export const getRevealEntries = (
  address: Address,
  hash: string,
  scriptPublicKey: ScriptPublicKey,
  amount: bigint = BASE_KAS_TO_P2SH_ADDRESS,
  blockDaaScore: bigint = U64_MAX_VALUE,
): IUtxoEntry[] => {
  return [
    {
      address,
      amount,
      outpoint: {
        transactionId: hash,
        index: 0,
      },
      scriptPublicKey,
      blockDaaScore,
      isCoinbase: false,
    },
  ]
}

const Charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
  .split('')
  .map((c) => c.charCodeAt(0))

const RevCharset = [
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 15, 100, 10, 17, 21, 20, 26, 30, 7, 5, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 29, 100, 24, 13, 25, 9, 8, 23, 100, 18, 22, 31, 27, 19,
  100, 1, 0, 3, 16, 11, 28, 12, 14, 6, 4, 2,
]
