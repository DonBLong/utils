import { match } from "@donb/utils/arrays/match";

const inputs = ["abbbc", "baaac", "acccb"];
const candidates = ["a", "b", "c", "cccb"];

console.log(match(inputs, candidates));
// Map(3) { "abbbc" => "b", "baaac" => "a", "acccb" => "cccb" }
