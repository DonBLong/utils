import { stringifyAll } from "@donblong/utils/strings";

const obj = {
  a: 100000000000000000000n,
  b: true,
  c: function func() {},
  d: null,
  e: 20.300,
  f: { id: 4 },
  g: "bar",
  h: Symbol("foobar"),
  i: undefined,
};

console.log(stringifyAll(obj));
// {"a":"100000000000000000000","b":"true","c":"function func() {}","d":"null","e":"20.3","f":{"id":"4"},"g":"bar","h":"Symbol(foobar)","i":"undefined"}
