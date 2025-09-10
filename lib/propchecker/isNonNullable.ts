import type { PropertyParams } from "./PropertyParams.ts";
import { PropertyRequiredTypeError } from "./PropertyRequiredTypeError.ts";

/**
 * Checks the non-nullability of a value, and optionally throws an error if the value is nullable.
 *
 * @example Usage
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
 * @typeparam ObjectType The type of the `object` that owns the property.
 *
 * @typeparam ValueType The type of the value to be checked.
 *
 * @param value The value being checked.
 *
 * @param throwError An `object` used to pass information about
 * the property, whose {@linkcode value} is being checked, to the {@linkcode PropertyRequiredTypeError} `constructor`.
 * - Assigning a value to this parameter makes this `function` throw an error
 *   if the non-nullability check results in `false` instead of returning `false`.
 *
 * @returns `false` if the {@linkcode value} is `null` or `undefined`, and `true` otherwise.
 * @throws { PropertyRequiredTypeError }
 */
export function isNonNullable<ObjectType, ValueType>(
  value: ValueType,
  throwError?: {
    objectType: PropertyParams<ObjectType>["objectType"];
    key: PropertyParams<ObjectType>["key"];
    caller?: PropertyParams<ObjectType>["caller"];
    callerClass?: PropertyParams<ObjectType>["callerClass"];
  },
): value is NonNullable<ValueType> {
  if (value === undefined || value === null) {
    if (throwError) {
      throw new PropertyRequiredTypeError({
        objectType: throwError.objectType,
        key: throwError.key,
        value: value,
        caller: throwError.caller,
        callerClass: throwError.callerClass,
      });
    }
    return false;
  }
  return true;
}
