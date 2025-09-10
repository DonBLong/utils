import { findStringBestMatch } from "@donb/utils/arrays/find-string-best-match";

const input = "foobarfoobarfoo";
const candidates = ["foo", "bar"];

const bestMatch = findStringBestMatch(input, candidates);

console.log(bestMatch.match); // "foo"
console.log(bestMatch.matchingScore); // 9 ("foo" (3x3), "bar" (3x2))
