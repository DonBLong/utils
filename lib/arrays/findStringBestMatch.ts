import type { BestMatch } from "./BestMatch.ts";
import type { IterableAndCallbackTuple } from "../types/IterablesWithCallbacks.ts";

/**
 * Finds the closest `string` match for the {@linkcode input} in the given iterable of {@linkcode candidates}.
 *
 * @example Usage
 * ```ts
 * import { findStringBestMatch } from "@donb/utils/arrays/find-string-best-match";
 *
 * const input = "foobarfoobarfoo";
 * const candidates = ["foo", "bar"];
 *
 * const bestMatch = findStringBestMatch(input, candidates);
 *
 * console.log(bestMatch.match); // "foo"
 * console.log(bestMatch.matchingScore); // 9 ("foo" (3x3), "bar" (3x2))
 * ```
 *
 * @example Using the callback
 * ```ts
 * import { findStringBestMatch } from "@donb/utils/arrays/find-string-best-match";
 *
 * const input = "foobarfoobarfoo";
 * const candidates = [{ name: "foo" }, { name: "bar" }];
 *
 * const bestMatch = findStringBestMatch(
 * input,
 * candidates,
 * (candidate) => candidate.name,
 * );
 *
 * console.log(bestMatch.match); // { name: "foo" }
 * ```
 *
 * @typeparam Candidate The type of an element of the {@linkcode candidates} iterable.
 * - If a {@linkcode Candidate} is neither a `string` nor a `RegExp` and the {@linkcode matchBy}
 *   parameter was omitted, the {@linkcode Candidate} will be converted to `string` using the `StringConstructor`.
 *
 * @param input The `string` for which the best match will be found.
 *
 * @param candidates The iterable from which a best match will be selected.
 *
 * @param matchBy A callback that is called on each iteration and takes the current {@linkcode Candidate} as an argument
 * to generate a `string` or a `RegExp` of the user's choice to be used on behalf of the {@linkcode Candidate} during the matching.
 *
 * @returns A {@linkcode BestMatch} `object` with the matched {@linkcode Candidate} as {@linkcode BestMatch.match}
 * alongside its matching-score as {@linkcode BestMatch.matchingScore}.
 */
export function findStringBestMatch<Candidate>(
  input: string,
  ...[candidates, matchBy]: IterableAndCallbackTuple<Candidate, string | RegExp>
): BestMatch<Candidate> {
  return [...candidates].reduce<BestMatch<Candidate>>(
    (bestMatch, candidate) => {
      const matcher = matchBy?.(candidate) ??
        (candidate instanceof RegExp ? candidate : String(candidate));
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
