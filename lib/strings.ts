/**
 * Returns all characters in the {@link first} `string`
 * that are present in the {@link second} `string`.
 * @param first The first `string` in the comparison.
 * @param second The second `string` in the comparison.
 * @returns An array of all matching characters.
 *
 * @example Usage
 * ```ts
 * import { matchChars } from "@donblong/utils/strings";
 *
 * const first = "aabbccddeeff";
 * const second = "ghbiej";
 *
 * console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
 * ```
 */
export function matchChars(first: string, second: string): string[] {
  return [...first].filter((char) => second.includes(char));
}

/**
 * Returns the intersection between the unique-character-set of the {@link first} `string`
 * and the unique-character-set of the {@link second} `string`.
 * @param first The first `string` in the comparison.
 * @param second The second `string` in the comparison.
 * @returns An array of all matching characters without duplicates.
 *
 * @example Usage
 * ```ts
 * import { matchCharsUnique } from "@donblong/utils/strings";
 *
 * const first = "aabbccddeeff";
 * const second = "gghhbbiieejj";
 *
 * console.log(matchCharsUnique(first, second)); // ["b", "e"]
 * ```
 */
export function matchCharsUnique(first: string, second: string): string[] {
  const characterSetOfFirst = new Set(first);
  const characterSetOfSecond = new Set(second);
  return [...characterSetOfFirst.intersection(characterSetOfSecond)];
}

/**
 * Returns substrings (with length greater than 1) of the {@link first} `string`
 * that are also substrings of the {@link second} `string`.
 * @param first The first `string` in the comparison.
 * @param second The second `string` in the comparison.
 * @returns An array of all matching substrings.
 *
 * @example Usage
 * ```ts
 * import { matchSubstrings } from "@donblong/utils/strings";
 *
 * const first = "aaa bbb ccc ddd";
 * const second = "eee ccc fff aaa";
 *
 * console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
 * ```
 */
export function matchSubstrings(first: string, second: string): string[] {
  const matchArray: string[] = [];
  [...first].reduce<string>((match, char, index) => {
    if (second.includes(char)) {
      if (first.includes(match.concat(char))) {
        if (second.includes(match.concat(char))) {
          match = match.concat(char);
        } else {
          if (match.length > 1) matchArray.push(match);
          if (second.includes(match.slice(1).concat(char))) {
            match = match.slice(1).concat(char);
          } else match = char;
        }
      }
      if (index === first.length - 1) matchArray.push(match);
    }
    return match;
  }, "");
  return matchArray;
}
