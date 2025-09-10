import type { Type } from "../types/Type.ts";
import type { PropertyParams } from "./PropertyParams.ts";
import type { Value } from "../types/Value.ts";
import { PropertyTypeError } from "./PropertyTypeError.ts";

/**
 * Checks the type-compatibility of a {@linkcode value} against a list of given {@linkcode types}.
 *
 * @example Usage
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
 * @typeparam ObjectType The type of the `object` that owns the property.
 *
 * @typeparam AcceptedType The accepted type for the {@linkcode value}.
 *
 * @param value The value being checked.
 *
 * @param types The single or multiple types, that are considered valid for the {@linkcode value}.
 *
 * @param throwError An `object` used to pass information about
 * the property, whose {@linkcode value} is being checked, to the {@linkcode PropertyTypeError} `constructor`.
 * - Assigning a value to this parameter makes this `function` throw an error
 *   if the {@linkcode value} is not of a valid type instead of returning `false`.
 *
 * @returns `false` if the {@linkcode types} list does not include the {@linkcode value}'s type, and `true` otherwise.
 *
 * @throws { PropertyTypeError }.
 */
export function isOfType<ObjectType, AcceptedType extends Type>(
  value: unknown,
  types: AcceptedType | AcceptedType[],
  throwError?: {
    objectType: PropertyParams<ObjectType>["objectType"];
    key: PropertyParams<ObjectType>["key"];
  },
): value is Value<AcceptedType> {
  function isValid(type: AcceptedType) {
    return typeof type === "string"
      // deno-lint-ignore valid-typeof
      ? typeof value === type
      : typeof type === "function"
      ? value?.constructor.name === type.name
      : typeof type === "object"
      ? JSON.stringify(value) === JSON.stringify(type)
      : value === null || value === undefined;
  }
  const typesArray = types instanceof Array ? types : [types];
  if (!typesArray.some(isValid)) {
    if (throwError) {
      throw new PropertyTypeError({
        objectType: throwError.objectType,
        key: throwError.key,
        type: types,
        value: value,
      });
    }
    return false;
  }
  return true;
}
