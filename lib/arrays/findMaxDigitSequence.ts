/**
 * Extracts any sequence of digit-charcters from each `string` in an iterable of strings,
 * and returns the sequence with the largest number of characters.
 *
 * @example Usage
 * ```ts
 * import { findMaxDigitSequence } from "@donb/utils/arrays/find-max-digit-sequence";
 *
 * const strings = ["foo100bar1", "bar1foo100", "foo1000bar10", "bar10foo1000"];
 *
 * console.log(findMaxDigitSequence(strings)); // "1000"
 * ```
 *
 * @param input The iterable of strings to be searched.
 *
 * @returns A `string` represinting the lengthiest digit-character-sequence in the {@linkcode input} strings.
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
