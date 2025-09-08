import { isNonNullable } from "@donblong/utils/propchecker";

const obj = { prop1: 0, prop2: null, prop3: undefined };

console.log(isNonNullable(obj.prop1)); // true
console.log(isNonNullable(obj.prop2)); // false
console.log(isNonNullable(obj.prop3)); // false

// with throwError
function func() {
  isNonNullable(obj.prop2, {
    objectType: obj,
    key: "prop2",
    caller: func,
  });
}
func(); // Throws PropertyRequiredTypeError
