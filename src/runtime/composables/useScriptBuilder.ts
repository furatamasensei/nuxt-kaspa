import {
  createMultisigAddress,
  NetworkType,
  Opcodes,
  PublicKey,
  ScriptBuilder,
} from '../kaspa/kaspa'
import type { Krc20Data } from '../types'
import { KASPLEX } from '../utils'

export const useScriptBuilder = () => {
  /**
   * Generates a KRC-20 script.
   * @param publicKey - The public key as a string.
   * @param data - The KRC-20 data to be included in the script.
   * @returns The generated ScriptBuilder instance.
   */
  const createKrc20Script = (
    publicKey: string,
    data: Krc20Data,
  ): ScriptBuilder => {
    return new ScriptBuilder()
      .addData(publicKey)
      .addOp(Opcodes.OpCheckSig)
      .addOp(Opcodes.OpFalse)
      .addOp(Opcodes.OpIf)
      .addData(Buffer.from(KASPLEX))
      .addI64(0n)
      .addData(Buffer.from(JSON.stringify(data)))
      .addOp(Opcodes.OpEndIf)
  }

  /**
   * Generates a script with a lock time.
   * @param publicKey - The public key as a string.
   * @param data - The KRC-20 data to be included in the script.
   * @param lockTime - The lock time in seconds.
   * @returns The generated ScriptBuilder instance.
   * @throws If the lock time is in the past.
   */
  const createLockTimeScript = (
    publicKey: string,
    data: Krc20Data,
    lockTime: bigint,
  ): ScriptBuilder => {
    const currentTime = Math.floor(Date.now() / 1000)
    if (lockTime <= currentTime) {
      throw new Error(`Lock time is in the past: ${lockTime}`)
    }

    return new ScriptBuilder()
      .addData(publicKey)
      .addOp(Opcodes.OpCheckSig)
      .addLockTime(lockTime)
      .addOp(Opcodes.OpCheckLockTimeVerify)
      .addOp(Opcodes.OpFalse)
      .addOp(Opcodes.OpIf)
      .addData(Buffer.from(KASPLEX))
      .addI64(0n)
      .addData(Buffer.from(JSON.stringify(data, null, 0)))
      .addOp(Opcodes.OpEndIf)
  }

  /**
   * Generates a multi-signature transaction script.
   * @param publicKeys - An array of public keys.
   * @param require - The number of required signatures.
   * @param ecdsa - Whether to use ECDSA (optional).
   * @returns The generated ScriptBuilder instance.
   */
  const createMultisignTxScript = (
    publicKeys: string[],
    require: number,
    ecdsa?: boolean,
  ): ScriptBuilder => {
    const script = new ScriptBuilder().addOp(Opcodes.OpReserved + require)

    publicKeys.forEach((pk) => {
      script.addData(
        ecdsa ? pk : new PublicKey(pk).toXOnlyPublicKey().toString(),
      )
    })

    return script
      .addOp(Opcodes.OpReserved + publicKeys.length)
      .addOp(ecdsa ? Opcodes.OpCheckMultiSigECDSA : Opcodes.OpCheckMultiSig)
  }

  /**
   * Generates a multi-signature transaction script with KRC-20 data.
   * @param publicKeys - An array of public keys.
   * @param data - The KRC-20 data to be included in the script.
   * @param require - The number of required signatures.
   * @param ecdsa - Whether to use ECDSA (optional).
   * @returns The generated ScriptBuilder instance.
   */
  const createMultisigTxKrc20Script = (
    publicKeys: string[],
    data: Krc20Data,
    require: number,
    ecdsa?: boolean,
  ) => {
    const script = new ScriptBuilder().addOp(Opcodes.OpReserved + require)

    publicKeys.forEach((pk) => {
      script.addData(
        ecdsa ? pk : new PublicKey(pk).toXOnlyPublicKey().toString(),
      )
    })

    return script
      .addOp(Opcodes.OpReserved + publicKeys.length)
      .addOp(Opcodes.OpCheckMultiSig)
      .addOp(Opcodes.OpFalse)
      .addOp(Opcodes.OpIf)
      .addData(Buffer.from(KASPLEX))
      .addI64(0n)
      .addData(Buffer.from(JSON.stringify(data, null, 0)))
      .addOp(Opcodes.OpEndIf)
  }

  /**
   * Creates a multi-signature address.
   * @param publicKeys - An array of public keys.
   * @param require - The number of required signatures.
   * @param networkType - The network type.
   * @param ecdsa - Whether to use ECDSA (optional).
   * @returns The multi-signature address.
   */
  const createMultisignatureAddress = (
    require: number,
    publicKeys: string[],
    networkType: NetworkType,
    ecdsa?: boolean,
  ) => {
    return createMultisigAddress(
      require,
      publicKeys.map((pk) => new PublicKey(pk)),
      networkType,
      ecdsa,
    )
  }

  /**
   * Generates a redeem multi-signature address.
   * @param publicKeys - An array of public keys.
   * @param require - The number of required signatures.
   * @param networkType - The networkType type.
   * @param ecdsa - Whether to use ECDSA (optional).
   * @returns The generated address.
   */
  const createRedeemScript = (
    require: number,
    publicKeys: string[],
    ecdsa?: boolean,
  ) => {
    const script = new ScriptBuilder().addOp(Opcodes.OpReserved + require)

    publicKeys.forEach((pk) => {
      script.addData(
        ecdsa ? pk : new PublicKey(pk).toXOnlyPublicKey().toString(),
      )
    })

    script
      .addOp(Opcodes.OpReserved + publicKeys.length)
      .addOp(ecdsa ? Opcodes.OpCheckMultiSigECDSA : Opcodes.OpCheckMultiSig)

    return new ScriptBuilder().addData(script.toString())
  }

  /**
   * Redeems a multi-signature address by constructing the appropriate script.
   *
   * @param require - The number of required signatures to unlock the funds.
   * @param publicKeys - An array of public keys involved in the multi-signature address.
   * @param networkType - The network type (e.g., mainnet, testnet) for address generation.
   * @param ecdsa - Optional flag to indicate whether to use ECDSA signatures (default is Schnorr signatures).
   * @returns A `ScriptBuilder` instance containing the constructed multi-signature script.
   */
  const redeemMultiSignAddress = (
    require: number,
    publicKeys: string[],
    ecdsa?: boolean,
  ) => {
    const script = new ScriptBuilder().addOp(Opcodes.OpReserved + require)

    publicKeys.forEach((pk) => {
      script.addData(
        ecdsa ? pk : new PublicKey(pk).toXOnlyPublicKey().toString(),
      )
    })

    script
      .addOp(Opcodes.OpReserved + publicKeys.length)
      .addOp(ecdsa ? Opcodes.OpCheckMultiSigECDSA : Opcodes.OpCheckMultiSig)

    return new ScriptBuilder().addData(script.toString())
  }

  return {
    createKrc20Script,
    createLockTimeScript,
    createMultisignTxScript,
    createMultisigTxKrc20Script,
    createMultisignatureAddress,
    createRedeemScript,
    redeemMultiSignAddress,
  }
}
