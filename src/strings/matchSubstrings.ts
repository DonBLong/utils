/**
 * Returns substrings (with length greater than 1) of the {@linkcode first} `string`
 * that are also substrings of the {@linkcode second} `string`.
 *
 * @example Usage
 * ```ts
 * import { matchSubstrings } from "@donb/utils/strings/match-substrings";
 *
 * const first = "aaa bbb ccc ddd";
 * const second = "eee ccc fff aaa";
 *
 * console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
 * ```
 *
 * @param first The first `string` in the comparison.
 *
 * @param second The second `string` in the comparison.
 *
 * @returns An array of all matching substrings.
 */
export function matchSubstrings(first: string, second: string): string[] {
  const matchArray: string[] = [];
  [...first].reduce<string>((match, char, index) => {
    if (second.includes(char)) {
      let nextMatch = match.concat(char);
      if (first.includes(nextMatch)) {
        if (second.includes(nextMatch)) {
          match = nextMatch;
        } else {
          if (match.length > 1) matchArray.push(match);
          nextMatch = match.slice(1).concat(char);
          if (second.includes(nextMatch)) {
            match = nextMatch;
          } else match = char;
        }
      }
    }
    if (index === first.length - 1) matchArray.push(match);
    return match;
  }, "");
  return matchArray;
}
