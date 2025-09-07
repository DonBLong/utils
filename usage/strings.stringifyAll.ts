import { stringifyAll } from "@donblong/utils/strings";

const obj = {
  a: 100000000000000000000n,
  b: true,
  c: function func() {
    return "foo";
  },
  d: 20.300,
  e: { id: 4 },
  f: "bar",
  g: Symbol("foobar"),
  h: undefined,
};

console.log(stringifyAll(obj));
// {"a":"1000000000000000000000","b":"true","c":"function func() {\n    return \"foo\";\n  }","d":"20.3","e":{"id":"4"},"f":"bar","g":"Symbol(foobar)","h":"undefined"}
