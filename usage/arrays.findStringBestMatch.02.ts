import { findStringBestMatch } from "@donb/utils/arrays/find-string-best-match";

const input = "foobarfoobarfoo";
const candidates = [{ name: "foo" }, { name: "bar" }];

const bestMatch = findStringBestMatch(
  input,
  candidates,
  (candidate) => candidate.name,
);

console.log(bestMatch.match); // { name: "foo" }
