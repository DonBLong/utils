/**
 * Represents a `constructor` `Function`.
 */
// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any[]) => any;
