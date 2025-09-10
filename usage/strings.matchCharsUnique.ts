import { matchCharsUnique } from "@donb/utils/strings/match-chars-unique";

const first = "aabbccddeeff";
const second = "gghhbbiieejj";

console.log(matchCharsUnique(first, second)); // ["b", "e"]
