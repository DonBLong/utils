import { toPadded } from "./numbers.ts";
import { stringifyAll } from "./strings.ts";

/**
 * Sorts the elements of an iterable,
 * optionally by a {@link sortBy} callback-function that will be called on each element.
 * - Each element (or the ouput of each {@link sortBy} call) is converted to `string`
 *   using {@link stringifyAll}.
 * - Digits found in the resulting strings of all {@link stringifyAll} calls
 *   are also treated using {@link toPadded}, with `maxLength` derived from the lengthiest
 *   digit-character-sequence found in all strings combined using {@link findMaxDigitSequence}.
 * @param input The iterable to be sorted.
 * @param sortBy A callback that is called on each element
 * of the {@link input} iterable to generate an output of the user's choice
 * to be used on behalf of the element during the sorting.
 * @returns A new array containing the iterable's elements after sorting.
 *
 * @example Usage
 * ```ts
 * import { sort } from "@donblong/utils/arrays";
 *
 * const iterable = [{ id: 3 }, 4, { id: 2 }, 1];
 *
 * console.log(sort(iterable)); // [ 1, 4, { id: 2 }, { id: 3 } ]
 *
 * // using sortBy
 * console.log(sort(iterable, (element) => typeof element === "number" ? element : element.id));
 * // [ 1, { id: 2 }, { id: 3 }, 4 ]
 * ```
 */
export function sort<T, S>(
  input: Iterable<T>,
  sortBy?: (element: T) => S,
): T[] {
  const maxLength = findMaxDigitSequence(stringifyAll(input))?.length;
  return [...input].toSorted((p, c) => {
    const [previous, current] = [p, c].map((e) =>
      toPadded(stringifyAll(sortBy?.(e) ?? e), maxLength)
    );
    return previous > current ? 1 : -1;
  });
}

/**
 * Extracts any sequence of digit-charcters from each `string` in an iterable of strings,
 * and returns the sequence with the largest number of characters.
 * @param input The iterable of strings to be searched.
 * @returns A `string` represinting the lengthiest digit-character-sequence in the {@link input} strings.
 *
 * @example Usage
 * ```ts
 * import { findMaxDigitSequence } from "@donblong/utils/arrays";
 *
 * const strings = ["foo100bar1", "bar1foo100", "foo1000bar10", "bar10foo1000"];
 *
 * console.log(findMaxDigitSequence(strings)); // "1000"
 * ```
 */
export function findMaxDigitSequence(
  input: Iterable<string>,
): string | undefined {
  const digitSequences = [...input].join(" ").match(/\d+/g);
  const lengthiestSequence = digitSequences?.reduce((previous, current) =>
    previous.length < current.length ? current : previous
  );
  return lengthiestSequence;
}

/**
 * Maps each element of the {@link first} iterable
 * to its closest `string` match in the {@link second} iterable using {@link findBestMatch}.
 * @param first The first iterable whose elements will be the inputs of the {@link findBestMatch} function.
 * If an element is not a `string` and {@link firstMatchBy} was not provided,
 * the element will be converted to `string` using the `StringConstructor` `Function`.
 * @param second The second iterable whose elements will be the candidates of the {@link findBestMatch} function.
 * If an element is neither a `string` nor `RegExp` object and {@link secondMatchBy} was not provided,
 * the element will be converted to `string` using the `StringConstructor` `Function`.
 * @param firstMatchBy A callback that is called on each element of the {@link first} iterable
 * to generate a `string` of the user's choice to be used on behalf of the {@link first}-iterable's element during the matching.
 * @param secondMatchBy A callback that is called on each element of the {@link second} iterable
 * to generate a `string` or `RegExp` object of the user's choice to be used on behalf of the {@link second}-iterable's element during the matching.
 * @returns A `Map` object that maps each element of the {@link first} iterable as key to its closest match in the {@link second} iterable as value.
 * If an element of the {@link first} iterable has no-match in the {@link second} iterable, its value will be `undefined`.
 *
 * @example Usage
 * ```ts
 * import { match } from "@donblong/utils/arrays";
 *
 * const first = ["abbbc", "baaac", "acccb"];
 * const second = ["a", "b", "c", "cccb"];
 *
 * console.log(match(first, second));
 * // Map(3) { "abbbc" => "b", "baaac" => "a", "acccb" => "cccb" }
 *
 * // using matchBys
 * const firstObjects = [{ firstProp: "abbbc" }, { firstProp: "baaac" }];
 * const secondObjects = [{ secondProp: "a" }, { secondProp: "b" }];
 *
 * console.log(
 * match(
 *   firstObjects,
 *   secondObjects,
 *   (first) => first.firstProp,
 *   (second) => second.secondProp,
 * ));
 * //  Map(2) {{ firstProp: "abbbc" } => { secondProp: "b" }, { firstProp: "baaac" } => { secondProp: "a" }}
 * ```
 */
export function match<First, Second>(
  first: Iterable<First>,
  second: Iterable<Second>,
  firstMatchBy?: (f: First) => string,
  secondMatchBy?: (s: Second) => string | RegExp,
): Map<First, Second> {
  return [...first].reduce((map, f) => {
    const input = stringifyAll(firstMatchBy?.(f) ?? f);
    map.set(f, findBestMatch(input, second, secondMatchBy).match);
    return map;
  }, new Map());
}

/**
 * Represents the object that is the `ReturnType` of the {@link findBestMatch} function.
 */
export interface BestMatch<Candidate> {
  /**
   * The {@link Candidate} that was elected by the {@link findBestMatch} function.
   */
  match?: Candidate;
  /**
   * The matching-score of the candidate elected by the {@link findBestMatch} function.
   */
  matchingScore: number;
}

/**
 * Finds the {@link input}'s closest `string` match in the given iterable of {@link candidates}.
 * - The matching is done using the `String.match` method.
 *   And thus, to ensure the matching is performed on either side, if the {@link input}'s length is shorter than the {@link Candidate} matcher's length
 *   the `this` argument of the `String.match` method will be the {@link Candidate}'s matcher instead of the {@link input}.
 * - The argument of the `String.match` method is always converted to a `RegExp` object with the global flag,
 *   this helps generating a matching-score calculated by multiplying (the number of occurences of the shorter `string`
 *   inside the longer `string`) by the number of characters in the shorter `string`.
 *   The {@link Candidate} with the highest matching-socre is then selected as the best match.
 * @param input The `string` for which the best match will be found.
 * @param candidates The iterable from which a best match will be selected.
 * - If a {@link Candidate} is neither a `string` nor a `RegExp` object,
 * it will be converted to `string` using the `StringConstructor` `Function`.
 * @param matchBy A callback that is called on each element of the {@link candidates} iterable
 * to generate a `string` or a `RegExp` object of the user's choice to be used on behalf
 * of the {@link candidates}-iterable's element during the matching.
 * @returns A {@link BestMatch} object with the matched {@link Candidate} as value of the property `match`
 * and its match-score `number` as value of the property `matchScore`.
 *
 * @example Usage
 * ```ts
 * import { findBestMatch } from "@donblong/utils/arrays";
 *
 * const input = "foobarfoobarfoo";
 * const candidates1 = ["foo", "bar"];
 *
 * const bestMatch1 = findBestMatch(input, candidates1);
 *
 * console.log(bestMatch1.match); // "foo"
 * console.log(bestMatch1.matchingScore); // 9 ("foo" (3x3), "bar" (3x2))
 *
 * // using matchBy
 * const candidates2 = [{ name: "foo" }, { name: "bar" }];
 *
 * const bestMatch2 = findBestMatch(
 *  input, candidates2, (candidate) => candidate.name);
 *
 * console.log(bestMatch2.match); // { name: "foo" }
 * ```
 */
export function findBestMatch<Candidate>(
  input: string,
  candidates: Iterable<Candidate>,
  matchBy?: (c: Candidate) => string | RegExp,
): BestMatch<Candidate> {
  return [...candidates].reduce<BestMatch<Candidate>>(
    (bestMatch, candidate) => {
      const matcher = matchBy?.(candidate) ?? String(candidate);
      const [long, short] =
        typeof matcher === "string" && matcher.length > input.length
          ? [matcher, input]
          : [input, matcher];
      const matchingScore =
        long.match(new RegExp(short, "g"))?.join("").length ??
          0;
      if (matchingScore > bestMatch.matchingScore) {
        bestMatch.match = candidate;
        bestMatch.matchingScore = matchingScore;
      }
      return bestMatch;
    },
    { matchingScore: 0 },
  );
}
