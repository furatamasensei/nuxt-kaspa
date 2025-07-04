import type { Krc20Data } from "../types";
import { OP } from "../types/enum";
import { decodePayload, stringToAddressPrefix } from "../utils";

export const useValidator = () => {
  /**
   * Validates the deployment operation data.
   * @returns The current instance for chaining.
   */
  const validateDeploy = (data: Krc20Data) => {
    return (
      validateTick(data) &&
      validateAddress(data.to) &&
      validateAmt(data) &&
      validateMax(data) &&
      validateLim(data) &&
      validateDec(data) &&
      validatePre(data)
    );
  };

  /**
   * Validates the mint operation data.
   * @returns The current instance for chaining.
   */
  const validateMint = (data: Krc20Data) => {
    return validateTick(data) && validateAddress(data.to);
  };

  /**
   * Validates the transfer operation data.
   * @returns The current instance for chaining.
   */
  const validateTransfer = (data: Krc20Data) => {
    return (
      validateTickOrCa(data) && validateAddress(data.to) && validateAmt(data)
    );
  };

  /**
   * Validates the list operation data.
   * @returns The current instance for chaining.
   */
  const validateList = (data: Krc20Data) => {
    return validateTick(data) && validateAddress(data.to) && validateAmt(data);
  };

  /**
   * Validates the send operation data.
   * @returns The current instance for chaining.
   */
  const validateSend = (data: Krc20Data) => {
    return validateTick(data) && validateAddress(data.to);
  };

  /**
   * Validates the issue operation data.
   * @returns The current instance for chaining.
   */
  const validateIssue = (data: Krc20Data) => {
    return validateAmt(data) && validateAddress(data.to);
  };

  /**
   * Validates the burn operation data.
   * @returns The current instance for chaining.
   */
  const validateBurn = (data: Krc20Data) => {
    return validateAmt(data);
  };

  /**
   * Validates the blacklist operation data.
   * @returns True if valid, otherwise throws an error.
   */
  const validateBlacklist = (data: Krc20Data) => {
    validateCa(data);
    validateMod(data);
    validateAddress(data.to);
    return true;
  };

  /**
   * Validates the chown operation data.
   * @returns True if valid, otherwise throws an error.
   */
  const validateChown = (data: Krc20Data) => {
    validateCa(data);
    validateAddress(data.to);
    return true;
  };

  /**
   * Validates the ticker field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the ticker is invalid.
   */
  const validateTick = (data: Krc20Data) => {
    const { tick, name, mod } = data;

    if (!mod && (!tick || tick.length < 4 || tick.length > 6)) {
      throw new Error(
        `Invalid input: ticker must be between 4 and 6 characters`
      );
    }

    if (mod && (!name || name.length < 4 || name.length > 6)) {
      throw new Error(`Invalid input: name must be between 4 and 6 characters`);
    }

    return true;
  };

  /**
   * Validates the ticker field in the data.
   * @param data The Krc20Data object to validate.
   * @returns The current instance for chaining.
   * @throws Error if the ticker is invalid.
   */
  const validateTickOrCa = (data: Krc20Data) => {
    const { tick, ca } = data;
    if (tick) {
      if (tick.length < 4 || tick.length > 6) {
        throw new Error(
          `Invalid input: ticker must be between 4 and 6 characters`
        );
      }
    } else if (ca) {
      if (ca.length < 60 || ca.length > 80) {
        throw new Error(`Invalid input: ca invalid`);
      }
    } else {
      throw new Error(`Invalid input: tick or ca not find`);
    }

    return true;
  };

  /**
   * Validates the address field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the address is invalid.
   */
  const validateAddress = (to: string | undefined) => {
    if (!to) {
      throw new Error("Invalid input: address is required");
    }

    try {
      const parts = to.split(":");
      if (parts.length !== 2) {
        throw new Error("Invalid address format");
      }

      let prefix = stringToAddressPrefix(parts[0]);
      if (prefix == undefined) {
        throw new Error("Invalid address format");
      }

      decodePayload(prefix, parts[1]);
      return true;
    } catch (e) {
      throw new Error("Invalid address format");
    }
  };

  /**
   * Validates the 'max' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'max' value is invalid.
   */
  const validateMax = (data: Krc20Data) => {
    const { max } = data;

    if (max && Number(max) <= 0) {
      throw new Error(`Invalid input: max must be greater than 0`);
    }

    return true;
  };

  /**
   * Validates the 'lim' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'lim' value is invalid.
   */
  const validateLim = (data: Krc20Data) => {
    const { lim } = data;

    if (lim && Number(lim) <= 0) {
      throw new Error(`Invalid input: lim must be greater than 0`);
    }

    return true;
  };

  /**
   * Validates the 'amt' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'amt' value is invalid.
   */
  const validateAmt = (data: Krc20Data) => {
    const { amt } = data;

    if (amt && Number(amt) <= 0) {
      throw new Error(`Invalid input: amt must be greater than 0`);
    }

    return true;
  };

  /**
   * Validates the 'dec' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'dec' value is invalid.
   */
  const validateDec = (data: Krc20Data) => {
    const { dec } = data;

    if (dec && (Number(dec) < 0 || Number(dec) > 18)) {
      throw new Error(`Invalid input: dec must be between 0 and 18`);
    }

    return true;
  };

  /**
   * Validates the 'pre' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'pre' value is invalid.
   */
  const validatePre = (data: Krc20Data) => {
    const { pre } = data;

    if (pre && Number(pre) <= 0) {
      throw new Error(`Invalid input: pre must be greater than 0`);
    }

    return true;
  };

  /**
   * Validates the 'ca' field in the data.
   * @returns The current instance for chaining.
   * @throws Error if the 'ca' value is invalid.
   */
  const validateCa = (data: Krc20Data) => {
    const { ca } = data;

    if (!ca) {
      throw new Error(`Invalid input: ca is required`);
    }

    return true;
  };

  /**
   * Validates the 'mod' field in the data.
   * @returns True if valid, otherwise throws an error.
   * @throws Error if the 'mod' value is invalid.
   */
  const validateMod = (data: Krc20Data) => {
    const { mod } = data;

    if (!mod || (mod !== "add" && mod !== "remove")) {
      throw new Error(`Invalid input: mod must be 'add' or 'remove'`);
    }

    return true;
  };

  /**
   * Validates the Krc20Data based on the operation type.
   * @param data The Krc20Data object to validate.
   * @throws Error if the operation type is invalid or data validation fails.
   */
  const validate = (data: Krc20Data) => {
    switch (data.op) {
      case OP.Deploy:
        validateDeploy(data);
        break;
      case OP.Mint:
        validateMint(data);
        break;
      case OP.Transfer:
        validateTransfer(data);
        break;
      case OP.List:
        validateList(data);
        break;
      case OP.Send:
        validateSend(data);
        break;
      case OP.Issue:
        validateIssue(data);
        break;
      case OP.Burn:
        validateBurn(data);
        break;
      case OP.Blacklist:
        validateBlacklist(data);
        break;
      case OP.Chown:
        validateChown(data);
        break;
      default:
        throw new Error(`Unsupported operation: ${data.op}`);
    }
  };
  return {
    validateDeploy,
    validateMint,
    validateTransfer,
    validateList,
    validateSend,
    validateIssue,
    validateBurn,
    validateBlacklist,
    validateChown,
    validateTick,
    validateTickOrCa,
    validateAddress,
    validateMax,
    validateLim,
    validateAmt,
    validateDec,
    validatePre,
    validateCa,
    validateMod,
    validate, // Expose the validate function
  };
};
