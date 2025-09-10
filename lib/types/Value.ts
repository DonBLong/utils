import type { PrimitiveTypes } from "./PrimitiveTypes.ts";
import type { Constructor } from "./Constructor.ts";
import type { Class } from "./Class.ts";

/**
 * Obtain the type of a value as a type-selector. See {@linkcode Type}.
 *
 * @typeparam T The type of the value whose type to be obtained
 * as a type-selector.
 */
export type Value<T> = T extends keyof PrimitiveTypes ? PrimitiveTypes[T]
  : T extends Constructor ? Class<T>
  : T extends object ? T
  : never;
