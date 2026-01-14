/**
 * Pads a `number`, a `bigint` or digit-characters found in a `string` with a leading `"0"`.
 * Repeated until the number of digits of the padded number reaches the {@linkcode maxLength}.
 *
 * @example Usage
 * ```ts
 * import { toPadded } from "@donb/utils/numbers/to-padded";
 *
 * const num1 = 2;
 * console.log(toPadded(num1, 2)); // "02"
 *
 * const num2 = 100;
 * console.log(toPadded(num2, 3)); // "100" (no padding)
 *
 * const str = "index 2 - title";
 * console.log(toPadded(str, 3)); // "index 002 - title"
 * ```
 *
 * @param input The `number`, the `bigint` or the `string` containg numbers to be padded.
 *
 * @param maxLength The length of the number found once it has been padded. Defaults to `0`.
 * If this parameter's value is smaller than the number of digits in the number found, the number found will not be padded.
 *
 * @returns A new `string` with all numbers in it padded according to the {@linkcode maxLength}.
 */
export function toPadded(
  input: number | bigint | string,
  maxLength: number = 0,
): string {
  return input.toString().replace(
    /\d+/g,
    (digits) => digits.padStart(maxLength, "0"),
  );
}
