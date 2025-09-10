import type { PrimitiveTypes } from "../types/PrimitiveTypes.ts";

/**
 * Represents and `object` that stores some information
 * about the value that is being assigned to the {@linkcode Property}.
 */
export interface ValueFound {
  /**
   * The actual value that is being assigned to the {@linkcode Property}.
   */
  value: unknown;
  /**
   * The name of the type of the value that is being assigned to the {@linkcode Property}.
   */
  type: keyof PrimitiveTypes;
  /**
   * The name of the `constructor` `Function` of the value.
   */
  constructor: string | undefined;
}
