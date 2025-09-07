import { findBestMatch } from "@donblong/utils/arrays";

const input = "foobarfoobarfoo";
const candidates1 = ["foo", "bar"];

const bestMatch1 = findBestMatch(input, candidates1);

console.log(bestMatch1.match); // "foo"
console.log(bestMatch1.matchingScore); // 9 ("foo" (3x3), "bar" (3x2))

// using matchBy
const candidates2 = [{ name: "foo" }, { name: "bar" }];

const bestMatch2 = findBestMatch(
  input,
  candidates2,
  (candidate) => candidate.name,
);

console.log(bestMatch2.match); // { name: "foo" }
