import { Mnemonic } from '../kaspa/kaspa'

export const useMnemonic = () => {
  /**
   * Generates a random mnemonic phrase of the specified length.
   * @param {number} length - The length of the mnemonic phrase (must be 12 or 24).
   * @returns {string} - The generated mnemonic phrase.
   * @throws {Error} - Throws an error if the length is not 12 or 24.
   */
  const random = (length: number): string => {
    if (length !== 12 && length !== 24) {
      throw new Error('Length must be 12 or 24')
    }
    return Mnemonic.random(length).phrase
  }

  /**
   * Validates whether the given mnemonic phrase is valid.
   * @param {string} mnemonic - The mnemonic phrase to validate.
   * @returns {boolean} - Returns true if the mnemonic is valid, otherwise false.
   */
  const validate = (mnemonic: string): boolean => {
    return Mnemonic.validate(mnemonic)
  }

  /**
   * Converts a mnemonic phrase into a seed.
   * @param {string} mnemonic - The mnemonic phrase.
   * @param {string} [password=""] - An optional password used for seed generation.
   * @returns {string} - The generated seed from the mnemonic.
   */
  const toSeed = (mnemonic: string, password: string = ''): string => {
    return new Mnemonic(mnemonic).toSeed(password)
  }

  return {
    random,
    validate,
    toSeed,
  }
}
