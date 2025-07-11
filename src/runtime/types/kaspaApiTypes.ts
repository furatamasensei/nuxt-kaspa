export interface KaspaRestBalance {
  address: string
  balance: number
}

export interface KaspaRestUtxo {
  address: string
  outpoint: {
    transactionId: string
    index: number
  }
  utxoEntry: {
    amount: string
    scriptPublicKey: {
      scriptPublicKey: string
    }
    blockDaaScore: string
    isCoinbase: boolean
  }
}

export interface KaspaRestTransaction {
  subnetwork_id: string
  transaction_id: string
  hash: string
  mass: string
  payload: string
  block_hash: string[]
  block_time: number
  is_accepted: boolean
  accepting_block_hash: string
  accepting_block_blue_score: number
  accepting_block_time: number
  inputs: Array<{
    transaction_id: string
    index: number
    previous_outpoint_hash: string
    previous_outpoint_index: string
    previous_outpoint_address: string | null
    previous_outpoint_amount: string | null
    signature_script: string
    sig_op_count: string
  }>
  outputs: Array<{
    transaction_id: string
    index: number
    amount: number
    script_public_key: string
    script_public_key_address: string
    script_public_key_type: string
  }>
}

export interface KaspaRestTransactionCount {
  total: number
  limit_exceeded: boolean
}

export interface KaspaRestBlockdagInfo {
  networkName: string
  blockCount: string
  headerCount: string
  tipHashes: string[]
  difficulty: number
  pastMedianTime: string
  virtualParentHashes: string[]
  pruningPointHash: string
  virtualDaaScore: string
  sink: string
}

export interface KaspaRestKaspadInfo {
  mempoolSize: string
  serverVersion: string
  isUtxoIndexed: boolean
  isSynced: boolean
  p2pIdHashed: string
}

export interface KaspaRestNetworkInfo {
  networkName: string
  blockCount: string
  headerCount: string
  tipHashes: string[]
  difficulty: number
  pastMedianTime: string
  virtualParentHashes: string[]
  pruningPointHash: string
  virtualDaaScore: string
  sink: string
}

export interface KaspaRestFeeEstimate {
  priorityBucket: {
    feerate: number
    estimatedSeconds: number
  }
  normalBuckets: Array<{
    feerate: number
    estimatedSeconds: number
  }>
  lowBuckets: Array<{
    feerate: number
    estimatedSeconds: number
  }>
}

export interface KaspaRestBlockReward {
  blockreward: number
}

export interface KaspaRestHalvingInfo {
  nextHalvingTimestamp: number
  nextHalvingDate: string
  nextHalvingAmount: number
}

export interface KaspaRestHashRate {
  hashrate: number
}

export interface KaspaRestHashRateMax {
  hashrate: number
  blockheader: {
    hash: string
    timestamp: string
    difficulty: number
    daaScore: string
    blueScore: string
  }
}

export interface KaspaRestHealth {
  kaspadServers: Array<{
    kaspadHost: string
    serverVersion: string
    isUtxoIndexed: boolean
    isSynced: boolean
    p2pId: string
    blueScore: number
  }>

  database: {
    isSynced: boolean
    blueScore: number
    blueScoreDiff: number
    acceptedTxBlockTime: number
    acceptedTxBlockTimeDiff: number
  }
}

export interface KaspaRestMarketcap {
  marketcap: number
}

export interface KaspaRestBlocksBlockId {
  header: {
    version: number
    hashMerkleRoot: string
    acceptedIdMerkleRoot: string
    utxoCommitment: string
    timestamp: string
    bits: number
    nonce: string
    daaScore: string
    blueWork: string
    parents: Array<{
      parentHashes: string[]
    }>
    blueScore: string
    pruningPoint: string
  }
  transactions: Array<{
    inputs: any[]
    outputs: Array<{
      amount: number
      scriptPublicKey: {
        scriptPublicKey: string
        version: number
      }
      verboseData: {
        scriptPublicKeyType: string
        scriptPublicKeyAddress: string
      }
    }>
    subnetworkId: string
    payload: string
    verboseData: {
      transactionId: string
      hash: string
      computeMass: number
      blockHash: string
      blockTime: number
    }
    lockTime: number
    gas: number
    mass: number
    version: number
  }>
  verboseData: {
    hash: string
    difficulty: number
    selectedParentHash: string
    transactionIds: string[]
    blueScore: string
    childrenHashes: string[]
    mergeSetBluesHashes: string[]
    mergeSetRedsHashes: string[]
    isChainBlock: boolean
  }
  extra: {
    color: string | null
    minerAddress: string
    minerInfo: string
  }
}

export interface KaspaRestBlocks {
  blockHashes: string[]
  blocks: any[]
}

export interface KaspaRestTransactionId {
  subnetwork_id: string
  transaction_id: string
  hash: string
  mass: number | null
  payload: string
  block_hash: string[]
  block_time: number
  is_accepted: boolean
  inputs: null | any[]
  outputs: Array<{
    transaction_id: string
    index: number
    amount: number
    script_public_key: string
    script_public_key_address: string
    script_public_key_type: string
  }>
}

export interface KaspaRestTransactionSearchParams {
  transactionIds: string[]
  acceptingBlueScores: {
    gte: number
    lt: number
  }
}

export interface KaspaRestCalculateTransactionMassParams {
  version: number
  inputs: Array<{
    previousOutpoint: {
      transactionId: string
      index: number
    }
    signatureScript: string
    sequence: number
    sigOpCount: number
  }>
  outputs: Array<{
    amount: number
    scriptPublicKey: {
      version: number
      scriptPublicKey: string
    }
  }>
  lockTime: number
  subnetworkId: string
}

export interface KaspaRestTransactionMass {
  mass: number
  storage_mass: number
  compute_mass: number
}
