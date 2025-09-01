import { assertEquals } from "@std/assert";
import * as numbers from "../lib/numbers.ts";

Deno.test("numbers.padStart", () => {
  assertEquals(numbers.padStart(1, 2), "01");
  assertEquals(numbers.padStart(10, 3), "010");
  assertEquals(numbers.padStart("010", 4), "0010");
});
