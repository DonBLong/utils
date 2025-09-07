import { assertEquals } from "jsr:@std/assert@1.0.14/equals";
import {
  matchChars,
  matchCharsUnique,
  matchSubstrings,
  stringifyAll,
} from "../lib/strings.ts";

// matchChars()
Deno.test("matchChars()", () => {
  assertEquals(matchChars("aabbccddee", "fbgdhbid"), ["b", "b", "d", "d"]);
});

// matchCharsUnique()
Deno.test("matchCharsUnique()", () => {
  assertEquals(matchCharsUnique("aabbccddee", "fbgdhbid"), ["b", "d"]);
});

// matchSubstrings()
Deno.test("matchSubstrings()", () => {
  assertEquals(matchSubstrings("aaabbbcccddd", "eeecccfffaaa"), [
    "aaa",
    "ccc",
  ]);
});

// stringifyAll()
Deno.test("stringifyAll() - bigint", () => {
  assertEquals(stringifyAll(100000000000000000000n), `"100000000000000000000"`);
});

Deno.test("stringifyAll() - boolean", () => {
  assertEquals(stringifyAll(true), `"true"`);
});

Deno.test("stringifyAll() - function", () => {
  assertEquals(stringifyAll(function func() {}), `"function func() {}"`);
});

Deno.test("stringifyAll() - null", () => {
  assertEquals(stringifyAll(null), `"null"`);
});

Deno.test("stringifyAll() - number", () => {
  assertEquals(stringifyAll(10), `"10"`);
});

Deno.test("stringifyAll() - string", () => {
  assertEquals(stringifyAll("foo"), `"foo"`);
});

Deno.test("stringifyAll() - symbol", () => {
  assertEquals(stringifyAll(Symbol("foo")), `"Symbol(foo)"`);
});

Deno.test("stringifyAll() - undefined", () => {
  assertEquals(stringifyAll(undefined), `"undefined"`);
});
