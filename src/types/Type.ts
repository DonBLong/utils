import type { PrimitiveTypes } from "./PrimitiveTypes.ts";
import type { Constructor } from "./Constructor.ts";

/**
 * Represents the value a type selector.
 */
export type Type = keyof PrimitiveTypes | Constructor | object;
