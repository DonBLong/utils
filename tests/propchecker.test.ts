import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.14";
import {
  isNonNullable,
  isOfType,
  PropertyRequiredTypeError,
  PropertyTypeError,
} from "@donb/utils/propchecker";

// isNonNullable
Deno.test("isNonNullable() - boolean", () => {
  const obj = { prop1: 0, prop2: null, prop3: undefined };
  assertEquals(isNonNullable(obj.prop1), true);
  assertEquals(isNonNullable(obj.prop2), false);
  assertEquals(isNonNullable(obj.prop3), false);
});

Deno.test("isNonNullable() - throws", () => {
  const obj = { prop1: 0, prop2: null, prop3: undefined };
  assertThrows(
    function func() {
      isNonNullable(obj.prop2, {
        objectType: obj,
        key: "prop2",
        caller: func,
      });
    },
    PropertyRequiredTypeError,
    `Property 'prop2' in type '{"prop1":0,"prop2":null}' is 'null' but is required in method 'func'`,
  );
});

// isOfType
Deno.test("isOfType() - boolean", () => {
  const obj = { prop1: "1", prop2: 2 };

  assertEquals(isOfType(obj.prop1, "string"), true);
  assertEquals(isOfType(obj.prop2, "string"), false);
  assertEquals(isOfType(obj.prop2, ["string", "number"]), true);
});

Deno.test("isOfType() - throws", () => {
  const obj = { prop1: "1", prop2: 2 };
  assertThrows(
    () =>
      isOfType(obj.prop1, ["number", "bigint"], {
        objectType: obj,
        key: "prop1",
      }),
    PropertyTypeError,
    `Property 'prop1' in type '{"prop1":"1","prop2":2}' must be of type 'number | bigint'`,
  );
});
