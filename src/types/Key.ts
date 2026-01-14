import type { Constructor } from "./Constructor.ts";
import type { Class } from "./Class.ts";

/**
 * Obtain the property keys of an `object` or a `class`.
 *
 * @typeparam O The type of `object` or `class` whose
 * property keys to be obtained.
 */
export type Key<O> = O extends Constructor ? keyof Class<O> : keyof O;
