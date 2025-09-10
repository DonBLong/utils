/**
 * Utilities for verifying the compatibility of object properties
 * specifically and/or variable values generally.
 *
 * @example Non-nullability checking
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
 * @example Type checking
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
 * @module propchecker
 */
export * from "./Property.ts";
export * from "./PropertyParams.ts";
export * from "./PropertyRequiredTypeError.ts";
export * from "./PropertyTypeError.ts";
export * from "./ValueFound.ts";
export * from "./isNonNullable.ts";
export * from "./isOfType.ts";
