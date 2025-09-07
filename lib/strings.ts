/**
 * Uses a combination of `JSON.stringifiy` and the `StringConstructor` `Function`
 * to convert a JavaScript value of any type (including `bigint`, `symbol`, `function` and `undefined`)
 * into a JavaScript Object Notaion (JSON) `string`.
 * @param input The input to be converted.
 * @returns A JSON string of the {@link input}.
 *
 * @example Usage
 * ```ts
 * import { stringifyAll } from "@donblong/utils/strings";
 *
 * const obj = {
 * a: 100000000000000000000n,
 * b: true,
 * c: function func() {
 *    return "foo";
 * },
 * d: 20.300,
 * e: { id: 4 },
 * f: "bar",
 * g: Symbol("foobar"),
 * h: undefined,
 * };
 *
 * console.log(stringifyAll(obj));
 * // {"a":"1000000000000000000000","b":"true","c":"function func() {\n    return \"foo\";\n  }","d":"20.3","e":{"id":"4"},"f":"bar","g":"Symbol(foobar)","h":"undefined"}
 * ```
 */
export function stringifyAll<T>(input: T): string {
  return JSON.stringify(
    input,
    (_, value) => typeof value === "object" ? value : String(value),
  );
}

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
      const nextMatch = match.concat(char);
      if (first.includes(nextMatch)) {
        if (second.includes(nextMatch)) {
          match = match.concat(char);
        } else {
          if (match.length > 1) matchArray.push(match);
          const nextMatch = match.slice(1).concat(char);
          if (second.includes(nextMatch)) {
            match = nextMatch;
          } else match = char;
        }
      }
      if (index === first.length - 1) matchArray.push(match);
    }
    return match;
  }, "");
  return matchArray;
}
