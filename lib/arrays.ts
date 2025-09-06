import { toPadded } from "./numbers.ts";

/**
 * Sorts the elements of an iterable, optionally using a custom key selector.
 *
 * If a `sortBy` function is provided, it is used to extract a value from each element for sorting.
 * If not provided, elements are stringified using `JSON.stringify` for comparison.
 * Numeric substrings within the keys are padded to ensure natural sort order.
 *
 * @example Usage
 * ```typescript
 * import { sort } from "@donblong/utils/arrays";
 *
 * // Sort numbers
 * sort([3, 1, 2]);
 * // => [1, 2, 3]
 *
 * // Sort objects by property
 * sort([{id: 2}, {id: 1}], x => x.id);
 * // => [{id: 1}, {id: 2}]
 *
 * // Sort strings with numeric parts naturally
 * sort(['file10', 'file2', 'file1']);
 * // => ['file1', 'file2', 'file10']
 * ```
 *
 * @typeParam T - The type of elements in the input iterable.
 * @param input - The iterable to sort.
 * @param sortBy - Optional function to extract a value from each element for sorting.
 * @returns A new sorted array of elements.
 */
export function sort<T>(
  input: Iterable<T>,
  sortBy?: (element: T) => string | number,
): T[] {
  const inputArray = [...input].map((e) => sortBy?.(e) ?? JSON.stringify(e));
  const digits = inputArray.join().match(/\d+/g);
  const longestDigit = digits?.reduce((ld, d) => ld.length < d.length ? d : ld);
  const digitsPaddingLength = longestDigit?.length;
  return [...input].toSorted((p, c) => {
    const [previous, current] = [p, c].map((e) => {
      const element = sortBy?.(e) ?? JSON.stringify(e);
      return toPadded(element, digitsPaddingLength);
    });
    return previous > current ? 1 : -1;
  });
}

export function match<First, Second>(
  first: Iterable<First>,
  second: Iterable<Second>,
  firstMatchBy?: (f: First) => string,
  secondMatchBy?: (s: Second) => string | RegExp,
): Map<First, Second> {
  const firstArray = [...first];
  const secondArray = [...second];
  return firstArray.reduce((map, f) => {
    const input = firstMatchBy?.(f) ??
      (typeof f === "string" ? f : JSON.stringify(f));
    map.set(f, findBestMatch(input, secondArray, secondMatchBy).match);
    return map;
  }, new Map());
}

export interface BestMatch<Candidate> {
  match?: Candidate;
  matchArray: string[];
}

export function findBestMatch<Candidate>(
  input: string,
  candidates: Iterable<Candidate>,
  matchBy?: (c: Candidate) => string | RegExp,
): BestMatch<Candidate> {
  const candidatesArray = [...candidates];
  return candidatesArray.reduce<BestMatch<Candidate>>(
    (bestMatch, candidate) => {
      const matcher = matchBy?.(candidate) ??
        (typeof candidate === "string" ? candidate : JSON.stringify(candidate));
      const [long, short] =
        typeof matcher === "string" && matcher.length > input.length
          ? [matcher, input]
          : [input, matcher];
      const matchArray = long.match(short)?.join() ?? [];
      if (matchArray.length > bestMatch.matchArray.length) {
        bestMatch.match = candidate;
        bestMatch.matchArray = [...matchArray];
      }
      return bestMatch;
    },
    { matchArray: [] },
  );
}
