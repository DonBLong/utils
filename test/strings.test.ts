import { assertEquals } from "@std/assert";
import * as strings from "../lib/strings.ts";

Deno.test("strings.compare", () => {
  assertEquals(strings.compare("abcd", "bdfg"), ["b", "d"]);
});
