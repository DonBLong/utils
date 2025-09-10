import { assertEquals } from "jsr:@std/assert@1.0.14/equals";
import { toPadded } from "@donb/utils/numbers";

Deno.test("toPadded() - input: number, maxLength > input length", () => {
  assertEquals(toPadded(1, 2), "01");
});

Deno.test("toPadded() - input: number, maxLength <= input length (no padding)", () => {
  assertEquals(toPadded(10, 2), "10");
});

Deno.test("toPadded() - input: string with digit-characters", () => {
  assertEquals(toPadded("index1", 2), "index01");
});
