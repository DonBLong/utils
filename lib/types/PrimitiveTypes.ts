/**
 * Represents a type-map mapping each name of the JavaScript's primitive types (including "null") as key
 * to a type compatible with what the type's name represent.
 */
export interface PrimitiveTypes {
  bigint: bigint;
  boolean: boolean;
  function: (...args: unknown[]) => unknown;
  number: number;
  object: object;
  string: string;
  symbol: symbol;
  undefined: undefined;
  null: null;
}
