import { toPadded } from "../numbers/toPadded.ts";
import { stringifyAll } from "../strings/stringifyAll.ts";
import { findMaxDigitSequence } from "./findMaxDigitSequence.ts";

/**
 * Sorts the elements of an iterable,
 * optionally by a {@linkcode sortBy} callback-function that will be called on each element.
 *
 * @example Usage
 * ```ts
 * import { sort } from "@donb/utils/arrays/sort";
 *
 * const iterable = [{ id: 3 }, 4, { id: 2 }, 1];
 *
 * console.log(sort(iterable)); // [ 1, 4, { id: 2 }, { id: 3 } ]
 * ```
 *
 * @example Using callback
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
 * @typeparam ElementType The type of the elements of the {@linkcode input} `Iterable`.
 *
 * @typeparam SorterType The return of the {@linkcode sortBy} callback `function`.
 *
 * @param input The iterable to be sorted.
 *
 * @param sortBy A callback that is called on each element
 * of the {@linkcode input} iterable to generate an output of the user's choice
 * to be used on behalf of the element during the sorting.
 *
 * @returns A new array containing the iterable's elements after sorting.
 */
export function sort<ElementType, SorterType>(
  input: Iterable<ElementType>,
  sortBy?: (element: ElementType) => SorterType,
): ElementType[] {
  const maxLength = findMaxDigitSequence(stringifyAll(input))?.length;
  return [...input].toSorted((p, c) => {
    const [previous, current] = [p, c].map((e) =>
      toPadded(stringifyAll(sortBy?.(e) ?? e), maxLength)
    );
    return previous > current ? 1 : -1;
  });
}
