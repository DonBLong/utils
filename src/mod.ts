/**
 * A collection of useful utility functions and types that help
 * carrying out some basic (but specific) JavaScript operations
 * and getting around some limitations in native ECMAScript methods,
 * TypeScript generic types, or in other libraries such as file-system APIs.
 *
 * ## arrays
 *
 * Sorting
 * ```ts
 * import { sort } from "@donb/utils/arrays/sort";
 *
 * const iterable = [{ id: 3 }, 4, { id: 2 }, 1];
 *
 * console.log(sort(iterable)); // [ 1, 4, { id: 2 }, { id: 3 } ]
 * ```
 * Sorting with callback
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
 * Matching
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
 * Matching with callbacks
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
 * ## numbers
 *
 * Padding
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
 * ## strings
 *
 * Character matching
 * ```ts
 * import { matchChars } from "@donb/utils/strings/match-chars";
 *
 * const first = "aabbccddeeff";
 * const second = "ghbiej";
 *
 * console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
 * ```
 *
 * Substring matching
 * ```ts
 * import { matchSubstrings } from "@donb/utils/strings/match-substrings";
 *
 * const first = "aaa bbb ccc ddd";
 * const second = "eee ccc fff aaa";
 *
 * console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
 * ```
 *
 * Stringifying values
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
 * ## fs
 *
 * Reading from a directory with type-filter
 * ```ts
 * // Asynchronous
 * import { readDirWithTypes } from "@donb/utils/fs/read-dir-with-types";
 * import { extname } from "@std/path/extname";
 *
 * const dirEntries = await readDirWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = await readDirWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 * ```ts
 * // Synchronous
 * import { readDirSyncWithTypes } from "@donb/utils/fs/read-dir-sync-with-types";
 * import { extname } from "@std/path/extname";
 *
 * const dirEntries = readDirSyncWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = readDirSyncWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 *
 * ## propchecker
 *
 * Non-nullability checking
 * ```ts
 * import { isNonNullable } from "@donb/utils/propchecker/is-non-nullable";
 *
 * const obj = { prop1: 0, prop2: null, prop3: undefined };
 *
 * console.log(isNonNullable(obj.prop1)); // true
 * console.log(isNonNullable(obj.prop2)); // false
 * console.log(isNonNullable(obj.prop3)); // false
 *
 * // with throwError
 * function func() {
 *   isNonNullable(obj.prop2, {objectType: obj, key: "prop2", caller: func});
 * }
 * func(); // Throws PropertyRequiredTypeError
 * ```
 *
 * Type checking
 * ```ts
 * import { isOfType } from "@donb/utils/propchecker/is-of-type";
 *
 * const obj = { prop1: "1", prop2: 2 };
 *
 * console.log(isOfType(obj.prop1, "string")); // true
 * console.log(isOfType(obj.prop2, "string")); // false
 * console.log(isOfType(obj.prop2, ["string", "number"])); // true
 *
 * // with throwError
 * isOfType(obj.prop1, ["number", "bigint"], { objectType: obj, key: "prop1" });
 * // Throws PropertyTypeError
 * ```
 *
 * @module utils
 */

export * from "./arrays/mod.ts";
export * from "./fs/mod.ts";
export * from "./numbers/mod.ts";
export * from "./propchecker/mod.ts";
export * from "./strings/mod.ts";
export * from "./types/mod.ts";
