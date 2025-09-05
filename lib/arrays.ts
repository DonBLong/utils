import { padDigits } from "./numbers.ts";

export function sort<T>(
  input: Iterable<T>,
  sortBy?: (element: T) => string | number
): T[] {
  const inputArray = [...input].map((e) => sortBy?.(e) ?? JSON.stringify(e));
  const digits = inputArray.join().match(/\d+/g);
  const longestDigit = digits?.reduce((ld, d) =>
    ld.length < d.length ? d : ld
  );
  const digitsPaddingLength = longestDigit?.length;
  return [...input].toSorted((p, c) => {
    const [previous, current] = [p, c].map((e) => {
      const element = sortBy?.(e) ?? JSON.stringify(e);
      return padDigits(element, digitsPaddingLength);
    });
    return previous > current ? 1 : -1;
  });
}

export function match<First, Second>(
  first: Iterable<First>,
  second: Iterable<Second>,
  firstMatchBy?: (f: First) => string,
  secondMatchBy?: (s: Second) => string | RegExp
): Map<First, Second> {
  const firstArray = [...first];
  const secondArray = [...second];
  return firstArray.reduce((map, f) => {
    const input =
      firstMatchBy?.(f) ?? (typeof f === "string" ? f : JSON.stringify(f));
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
  matchBy?: (c: Candidate) => string | RegExp
): BestMatch<Candidate> {
  const candidatesArray = [...candidates];
  return candidatesArray.reduce<BestMatch<Candidate>>(
    (bestMatch, candidate) => {
      const matcher =
        matchBy?.(candidate) ??
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
    { matchArray: [] }
  );
}
