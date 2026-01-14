/**
 * Obtain the type of a `class`, where {@linkcode C} must extend a {@linkcode Constructor}.
 *
 * @typeparam C The type of the `constructor` of the `class` whose
 * type to be otained.
 */
// deno-lint-ignore no-explicit-any
export type Class<C> = C extends abstract new (...args: any[]) => infer T ? T
  : never;
