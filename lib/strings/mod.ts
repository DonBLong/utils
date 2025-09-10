/**
 * Utilities for working with `string` values
 * and for converting other values to `string`.
 *
 * @example Character matching
 * ```ts
 * import { matchChars } from "@donb/utils/strings/match-chars";
 *
 * const first = "aabbccddeeff";
 * const second = "ghbiej";
 *
 * console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
 * ```
 *
 * @example Substring matching
 * ```ts
 * import { matchSubstrings } from "@donb/utils/strings/match-substrings";
 *
 * const first = "aaa bbb ccc ddd";
 * const second = "eee ccc fff aaa";
 *
 * console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
 * ```
 *
 * @example Stringifying values
 * ```ts
 * import { stringifyAll } from "@donb/utils/strings/stringify-all";
 *
 * const obj = {
 *  a: 100000000000000000000n,
 *  b: true,
 *  c: function func() {},
 *  d: null,
 *  e: 20.300,
 *  f: { id: 4 },
 *  g: "bar",
 *  h: Symbol("foobar"),
 *  i: undefined,
 * };
 *
 * console.log(stringifyAll(obj));
 * // {"a":"100000000000000000000","b":"true","c":"function func() {}","d":"null","e":"20.3","f":{"id":"4"},"g":"bar","h":"Symbol(foobar)","i":"undefined"}
 * ```
 *
 * @module strings
 */
export * from "./matchChars.ts";
export * from "./matchCharsUnique.ts";
export * from "./matchSubstrings.ts";
export * from "./stringifyAll.ts";
