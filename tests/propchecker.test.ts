import {
  assertEquals,
  assertInstanceOf,
  assertThrows,
} from "jsr:@std/assert@1.0.14";
import {
  isNonNullable,
  isOfType,
  Property,
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
  assertEquals(isOfType(obj.prop1, Date), false);
  assertEquals(isOfType(obj, { prop1: "1", prop2: 2 }), true);
  assertEquals(isOfType(null, "null"), true);
  assertEquals(isOfType(undefined, "undefined"), true);
  //@ts-expect-error Testing invalid input
  assertEquals(isOfType(true, true), false);
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

// Property
Deno.test("class Property", () => {
  const obj = { prop1: "1", prop2: 2 };
  class ClassOfFunc {
    func() {
      return obj.prop1;
    }
  }
  const prop = new Property({
    objectType: obj,
    key: "prop1",
    value: obj.prop1,
    type: ["number", "bigint"],
    caller: new ClassOfFunc().func,
    callerClass: ClassOfFunc,
  });

  assertEquals(
    prop.objectType,
    `{"prop1":"1","prop2":2}`,
  );
  assertEquals(
    prop.key,
    "prop1",
  );
  assertEquals(
    prop.type,
    "number | bigint",
  );
  assertEquals(
    prop.caller,
    "ClassOfFunc.func",
  );
  assertEquals(
    prop.valueFound,
    { value: obj.prop1, type: "string", constructor: "String" },
  );
  prop.caller = { caller: "newFunc", callerClass: "NewClassOfFunc" };
  assertEquals(prop.caller, "NewClassOfFunc.newFunc");
  prop.type = Number;
  assertEquals(prop.type, "Number");
  prop.type = obj;
  assertEquals(prop.type, `{"prop1":"1","prop2":2}`);
  prop.type = new ClassOfFunc();
  assertEquals(prop.type, "ClassOfFunc");
  //@ts-expect-error Testing invalid input
  prop.type = true;
  assertEquals(prop.type, "true");
});

// PropertyRequiredTypeError
Deno.test("class PropertyRequiredTypeError", () => {
  const err = new PropertyRequiredTypeError();
  err.property = new Property();
  assertInstanceOf(err.property, Property);
  err.property = {};
  assertInstanceOf(err.property, Property);
});

// PropertyTypeError
Deno.test("class PropertyTypeError", () => {
  const err = new PropertyTypeError();
  err.property = new Property();
  assertInstanceOf(err.property, Property);
  err.property = {};
  assertInstanceOf(err.property, Property);
});
