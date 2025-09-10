import type { Key } from "../types/Key.ts";
import type { Type } from "../types/Type.ts";

/**
 * Represents the `object` parameter of the `constructor`
 * of the {@linkcode Property} `class`.
 */
export interface PropertyParams<O> {
  /**
   * The type of the `object` that owns the {@linkcode Property}.
   * - Despite the name, this property will accept the `object`
   *   itself as its own type.
   */
  objectType: O;
  /**
   * The identifier of the {@linkcode Property}.
   */
  key: Key<O>;
  /**
   * The type (or the list of types) that the {@linkcode Property} accepts.
   */
  type: Type | Type[];
  /**
   * The actual value that is being assigned to the {@linkcode Property}.
   */
  value: unknown;
  /**
   * The `function` that is trying to access the {@linkcode Property}.
   */
  caller: (...args: unknown[]) => unknown;
  /**
   * The `class` to which the {@linkcode caller} belongs.
   */
  callerClass: (...args: unknown[]) => unknown;
}
