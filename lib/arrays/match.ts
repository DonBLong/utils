import { findStringBestMatch } from "./findStringBestMatch.ts";
import type { IterableAndCallback } from "../types/IterablesWithCallbacks.ts";

/**
 * Maps each element of the {@linkcode inputs} iterable
 * to its closest `string` match in the {@linkcode candidates} iterable using {@linkcode findStringBestMatch}.
 *
 * @example Usage
 * ```ts
 * import { match } from "@donb/utils/arrays/match";
 *
 * const inputs = ["abbbc", "baaac", "acccb"];
 * const candidates = ["a", "b", "c", "cccb"];
 *
 * console.log(match(inputs, candidates));
 * // Map(3) { "abbbc" => "b", "baaac" => "a", "acccb" => "cccb" }
 * ```
 *
 * @example Using callbacks
 * ```ts
 * import { match } from "@donb/utils/arrays/match";
 *
 * const inputs = [{ inputProp: "abbbc" }, { inputProp: "baaac" }];
 * const candidates = [{ candidateProp: "a" }, { candidateProp: "b" }];
 *
 * console.log(
 * match({
 * iterable: inputs,
 * callback: (input) => input.inputProp,
 * }, {
 * iterable: candidates,
 * callback: (candidate) => candidate.candidateProp,
 * }),
 * );
 * //   Map(2) {
 * //     { inputProp: "abbbc" } => { candidateProp: "b" },
 * //     { inputProp: "baaac" } => { candidateProp: "a" }
 * //   }
 * ```
 *
 * @typeparam Input The type of an element of the {@linkcode inputs} iterable.
 *
 * @typeparam Candidate The type of an element of the {@linkcode candidates} iterable.
 *
 * @param inputs The iterable whose elements are passed as `input`
 * to the {@linkcode findStringBestMatch} function, and are the keys of the returned `Map`.
 * If this parameter is not an `Iterable<string>`, the value passed must be in the form of
 * an `object` that takes 2 properties:
 * - iterable - The value of the `Iterable`.
 * - callback - A callback that is called on each iteration and takes the current {@linkcode Input} as an argument
 * to generate a `string` of the user's choice to be used on behalf of the {@linkcode Input} during the matching.
 *
 * @param candidates The iterable whose elements are passed as `candidates` to the {@linkcode findStringBestMatch} function,
 * and are the values of the returned `Map`.
 * If this parameter is not an `Iterable<string | RegExp>`, the value passed must be in the form of
 * an `object` that takes 2 properties:
 * - iterable - The value of the `Iterable`.
 * - callback - A callback that is called on each iteration and takes the current {@linkcode Candidate} as an argument
 * to generate a `string` or `RegExp` of the user's choice to be used on behalf of the {@linkcode Candidate} during the matching.
 *
 * @returns A `Map` that maps each {@linkcode Input} as key to its closest match {@linkcode Candidate} as value.
 * - If an {@linkcode Input} has no-match in the {@linkcode candidates} iterable, its value will be `undefined`.
 */
export function match<Input, Candidate>(
  inputs: IterableAndCallback<Input, string>,
  candidates: IterableAndCallback<Candidate, string>,
): Map<Input, Candidate> {
  const inputsIterable = "iterable" in inputs
    ? inputs.iterable
    : Array.from(inputs);
  const inputCallback = "callback" in inputs && inputs.callback
    ? inputs.callback
    : String;
  const candidatesIterable = "iterable" in candidates
    ? candidates.iterable
    : Array.from(candidates);
  const candidateCallback = "callback" in candidates && candidates.callback
    ? candidates.callback
    : String;
  return [...inputsIterable].reduce((map, i) => {
    const input = typeof i === "string" ? i : inputCallback(i);
    map.set(
      i,
      findStringBestMatch(
        input,
        candidatesIterable as Iterable<unknown>,
        candidateCallback as (c: unknown) => string,
      ).match,
    );
    return map;
  }, new Map());
}
