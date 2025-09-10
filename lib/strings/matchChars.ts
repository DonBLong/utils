/**
 * Returns all characters in the {@linkcode first} `string`
 * that are present in the {@linkcode second} `string`.
 *
 * @example Usage
 * ```ts
 * import { matchChars } from "@donb/utils/strings/match-chars";
 *
 * const first = "aabbccddeeff";
 * const second = "ghbiej";
 *
 * console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
 * ```
 *
 * @param first The first `string` in the comparison.
 *
 * @param second The second `string` in the comparison.
 *
 * @returns An array of all matching characters.
 */
export function matchChars(first: string, second: string): string[] {
  return [...first].filter((char) => second.includes(char));
}
