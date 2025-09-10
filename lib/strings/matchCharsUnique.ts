/**
 * Returns the intersection between the unique-character-set of the {@linkcode first} `string`
 * and the unique-character-set of the {@linkcode second} `string`.
 *
 * @example Usage
 * ```ts
 * import { matchCharsUnique } from "@donb/utils/strings/match-chars-unique";
 *
 * const first = "aabbccddeeff";
 * const second = "gghhbbiieejj";
 *
 * console.log(matchCharsUnique(first, second)); // ["b", "e"]
 * ```
 *
 * @param first The first `string` in the comparison.
 *
 * @param second The second `string` in the comparison.
 *
 * @returns An array of all matching characters without duplicates.
 */
export function matchCharsUnique(first: string, second: string): string[] {
  const characterSetOfFirst = new Set(first);
  const characterSetOfSecond = new Set(second);
  return [...characterSetOfFirst.intersection(characterSetOfSecond)];
}
