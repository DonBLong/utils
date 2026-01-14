/**
 * Uses a combination of `JSON.stringifiy` and the `StringConstructor` `Function`
 * to convert a JavaScript value of any type
 * (including `bigint`, `function`, `null`, `symbol`, and `undefined`)
 * into a `string` representation of the value.
 *
 * @example Usage
 * ```ts
 * import { stringifyAll } from "@donb/utils/strings/stringify-all";
 *
 * const obj = {
 *  a: 100000000000000000000n,
 *  b: true,
 *  c: function func() {},
 *  d: null,
 *  e: 20.300,
 *  f: { id: 4 },
 *  g: "bar",
 *  h: Symbol("foobar"),
 *  i: undefined,
 * };
 *
 * console.log(stringifyAll(obj));
 * // {"a":"100000000000000000000","b":"true","c":"function func() {}","d":"null","e":"20.3","f":{"id":"4"},"g":"bar","h":"Symbol(foobar)","i":"undefined"}
 * ```
 *
 * @typeparam Input The type of the {@linkcode input} to be stringified.
 *
 * @param input The input to be stringified.
 *
 * @returns A JSON string of the {@linkcode input}.
 */
export function stringifyAll<Input>(input: Input): string {
  return JSON.stringify(
    input,
    (_, value) =>
      typeof value === "object" && value !== null ? value : String(value),
  );
}
