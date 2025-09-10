import { assertEquals } from "jsr:@std/assert@1.0.14/equals";
import {
  findMaxDigitSequence,
  findStringBestMatch,
  match,
  sort,
} from "@donb/utils/arrays";

// findStringBestMatch()
Deno.test("findStringBestMatch() - string candidates (no matchBy)", () => {
  assertEquals(findStringBestMatch("foobarfoobarfoo", ["foo", "bar"]), {
    match: "foo",
    matchingScore: 9,
  });
});

Deno.test("findStringBestMatch() - object candidates (with matchBy)", () => {
  assertEquals(
    findStringBestMatch(
      "foobarfoobarfoo",
      [{ name: "foo" }, { name: "bar" }],
      (candidate) => candidate.name,
    ),
    {
      match: { name: "foo" },
      matchingScore: 9,
    },
  );
});

// findMaxDigitSequence()
Deno.test("findMaxDigitSequence()", () => {
  assertEquals(
    findMaxDigitSequence([
      "foo100bar1",
      "bar1foo100",
      "foo1000bar10",
      "bar10foo1000",
    ]),
    "1000",
  );
});

// match()
Deno.test("match() - string iterables (no matchBys)", () => {
  assertEquals(
    match(["abbbc", "baaac", "acccb"], ["a", "b", "c", "cccb"]),
    new Map([["abbbc", "b"], ["baaac", "a"], ["acccb", "cccb"]]),
  );
});

Deno.test("match() - object iterables (with matchBys)", () => {
  assertEquals(
    match(
      [{ firstProp: "abbbc" }, { firstProp: "baaac" }],
      [{ secondProp: "a" }, { secondProp: "b" }],
      (first) => first.firstProp,
      (second) => second.secondProp,
    ),
    new Map([
      [{ firstProp: "abbbc" }, { secondProp: "b" }],
      [{ firstProp: "baaac" }, { secondProp: "a" }],
    ]),
  );
});

// sort()
Deno.test("sort() - mix iterable (no sortBy)", () => {
  assertEquals(
    sort([{ id: 3 }, 4, { id: 2 }, 1]),
    [1, 4, { id: 2 }, { id: 3 }],
  );
});

Deno.test("sort() - mix iterable (with sortBy)", () => {
  assertEquals(
    sort(
      [{ id: 3 }, 4, { id: 2 }, 1],
      (element) => typeof element === "number" ? element : element.id,
    ),
    [1, { id: 2 }, { id: 3 }, 4],
  );
});
