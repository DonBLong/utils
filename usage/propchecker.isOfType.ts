import { isOfType } from "@donb/utils/propchecker/is-of-type";

const obj = { prop1: "1", prop2: 2 };

console.log(isOfType(obj.prop1, "string")); // true
console.log(isOfType(obj.prop2, "string")); // false
console.log(isOfType(obj.prop2, ["string", "number"])); // true

// with throwError
isOfType(obj.prop1, ["number", "bigint"], { objectType: obj, key: "prop1" });
// Throws PropertyTypeError
