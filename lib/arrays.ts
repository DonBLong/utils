import { padStart } from "./numbers.ts";

export function sort<T>(iter: Iterable<T>, sortBy?: (e: T) => string | number) {
  const preparedIter = [...iter].map((e) => sortBy?.(e) ?? JSON.stringify(e));
  const digits = preparedIter.join().match(/\d+/g);
  const longestDigit = digits?.reduce((ld, d) =>
    ld.length < d.length ? d : ld
  );
  const digitsPaddingLength = longestDigit?.length;
  return [...iter].toSorted((prev, current) => {
    const [prevFixed, currentFixed] = [prev, current].map((e) => {
      const preparedE = sortBy?.(e) ?? JSON.stringify(e);
      return padStart(preparedE, digitsPaddingLength);
    });
    return prevFixed > currentFixed ? 1 : -1;
  });
}

export function match<T1, T2>(
  iter1: Iterable<T1>,
  iter2: Iterable<T2>,
  iter1MatchBy?: (e1: T1) => string,
  iter2MatchBy?: (e2: T2) => string | RegExp
) {
  const arr1 = [...iter1];
  const arr2 = [...iter2];
  return arr1.reduce((map, e1) => {
    const content =
      iter1MatchBy?.(e1) ?? (typeof e1 === "string" ? e1 : JSON.stringify(e1));
    map.set(e1, findBestMatch(content, arr2, iter2MatchBy).match);
    return map;
  }, new Map());
}

export interface BestMatch<Candidate> {
  match?: Candidate;
  matchArray: string[];
}

export function findBestMatch<Candidate>(
  content: string,
  candidates: Iterable<Candidate>,
  matchBy?: (c: Candidate) => string | RegExp
) {
  const cArr = [...candidates];
  return cArr.reduce<BestMatch<Candidate>>(
    (bestMatch, candidate) => {
      const matcher =
        matchBy?.(candidate) ??
        (typeof candidate === "string" ? candidate : JSON.stringify(candidate));
      const [long, short] =
        typeof matcher === "string" && matcher.length > content.length
          ? [matcher, content]
          : [content, matcher];
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
