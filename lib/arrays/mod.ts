/**
 * Utilities for working with iterables of any type.
 * - Functions from this module always return new
 *   objects (`Array` or `Map` objects) and do not mutate the input iterables.
 *
 * @example Sorting
 * ```ts
 * import { sort } from "@donb/utils/arrays/sort";
 *
 * const iterable = [{ id: 3 }, 4, { id: 2 }, 1];
 *
 * console.log(sort(iterable)); // [ 1, 4, { id: 2 }, { id: 3 } ]
 * ```
 * @example Sorting with callback
 * ```ts
 * import { sort } from "@donb/utils/arrays/sort";
 *
 * const iterable = [{ id: 3 }, 4, { id: 2 }, 1];
 *
 * console.log(
 * sort(
 *   iterable,
 *   (element) => typeof element === "number" ? element : element.id));
 * // [ 1, { id: 2 }, { id: 3 }, 4 ]
 * ```
 *
 * @example Matching
 * ```ts
 * import { match } from "@donb/utils/arrays/match";
 *
 * const inputs = ["abbbc", "baaac", "acccb"];
 * const candidates = ["a", "b", "c", "cccb"];
 *
 * console.log(match(inputs, candidates));
 * // Map(3) { "abbbc" => "b", "baaac" => "a", "acccb" => "cccb" }
 * ```
 * @example Matching with callbacks
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
 * @module arrays
 */

export * from "./BestMatch.ts";
export * from "./findMaxDigitSequence.ts";
export * from "./findStringBestMatch.ts";
export * from "./match.ts";
export * from "./sort.ts";
