import { match } from "@donblong/utils/arrays";

const firstStrings = ["abbbc", "baaac", "acccb"];
const secondStrings = ["a", "b", "c", "cccb"];

console.log(match(firstStrings, secondStrings));
// Map(3) { "abbbc" => "b", "baaac" => "a", "acccb" => "cccb" }

// using matchBys
const firstObjects = [{ firstProp: "abbbc" }, { firstProp: "baaac" }];
const secondObjects = [{ secondProp: "a" }, { secondProp: "b" }];

console.log(
  match(
    firstObjects,
    secondObjects,
    (first) => first.firstProp,
    (second) => second.secondProp,
  ),
);
//  Map(2) {{ firstProp: "abbbc" } => { secondProp: "b" }, { firstProp: "baaac" } => { secondProp: "a" }}
