import { assertEquals } from "@std/assert";
import * as arrays from "../lib/arrays.ts";

Deno.test("arrays.sort numbers", () => {
  assertEquals(arrays.sort([3, 10, 1, 100, 4, 2]), [1, 2, 3, 4, 10, 100]);
});

Deno.test("arrays.sort strings", () => {
  assertEquals(arrays.sort(["def", "jkl", "abc", "ghi"]), [
    "abc",
    "def",
    "ghi",
    "jkl",
  ]);
});

Deno.test("arrays.sort strings with digits", () => {
  assertEquals(
    arrays.sort([
      "string 3 string",
      "string 10 string",
      "string 1 string",
      "string 100 string",
      "string 4 string",
      "string 2 string",
    ]),
    [
      "string 1 string",
      "string 2 string",
      "string 3 string",
      "string 4 string",
      "string 10 string",
      "string 100 string",
    ]
  );
});

Deno.test("arrays.sort objects using JSON.stringify", () => {
  assertEquals(
    arrays.sort([
      { property: "xyz" },
      { property: "abc" },
      { property: "def" },
    ]),
    [{ property: "abc" }, { property: "def" }, { property: "xyz" }]
  );
});

Deno.test("arrays.sort objects with a sortBy function", () => {
  assertEquals(
    arrays.sort(
      [
        { property: "string10" },
        { property: "string100" },
        { property: "string1" },
      ],
      (element) => element.property
    ),
    [
      { property: "string1" },
      { property: "string10" },
      { property: "string100" },
    ]
  );
});

Deno.test("arrays.match strings in string-arrays", () => {
  assertEquals(
    arrays.match(
      [
        "prefix_mno_suffix",
        "prefix_abc_suffix",
        "prefix_pqr_suffix",
        "prefix_ghi_suffix",
        "kl",
        "mno",
      ],
      ["abc", "def", "ghi", "jkl", "prefix_abc"]
    ),
    new Map([
      ["prefix_mno_suffix", undefined],
      ["prefix_abc_suffix", "prefix_abc"],
      ["prefix_pqr_suffix", undefined],
      ["prefix_ghi_suffix", "ghi"],
      ["kl", "jkl"],
      ["mno", undefined],
    ])
  );
});

Deno.test("arrays.match strings in object-arrays using JSON.stringify", () => {
  assertEquals(
    arrays.match(
      [
        { property: "abc" },
        { property: "def" },
        { property: "ghi" },
        { property: "xyz" },
      ],
      [{ property: "xyz" }, { property: "def" }, { property: "abc" }]
    ),
    new Map([
      [{ property: "abc" }, { property: "abc" }],
      [{ property: "def" }, { property: "def" }],
      [{ property: "ghi" }, undefined],
      [{ property: "xyz" }, { property: "xyz" }],
    ])
  );
});

Deno.test(
  "arrays.match strings in object-arrays with matchBy functions",
  () => {
    assertEquals(
      arrays.match(
        [
          { property: "abc" },
          { property: "def" },
          { property: "ghi" },
          { property: "xyz" },
        ],
        [{ prop: "xyz" }, { prop: "def" }, { prop: "abc" }],
        (e1) => e1.property,
        (e2) => e2.prop
      ),
      new Map([
        [{ property: "abc" }, { prop: "abc" }],
        [{ property: "def" }, { prop: "def" }],
        [{ property: "ghi" }, undefined],
        [{ property: "xyz" }, { prop: "xyz" }],
      ])
    );
  }
);

Deno.test(
  "arrays.match strings in object-arrays with a RegEx matchBy function",
  () => {
    assertEquals(
      arrays.match(
        ["a01", "a02", "b01", "b02"],
        [
          { letter: "b", number: 1 },
          { letter: "a", number: 2 },
        ],
        undefined,
        (e2) => new RegExp(`${e2.letter}\\d*${e2.number}`)
      ),
      new Map([
        ["a01", undefined],
        ["a02", { letter: "a", number: 2 }],
        ["b01", { letter: "b", number: 1 }],
        ["b02", undefined],
      ])
    );
  }
);
