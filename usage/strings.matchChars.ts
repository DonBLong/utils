import { matchChars } from "@donb/utils/strings/match-chars";

const first = "aabbccddeeff";
const second = "ghbiej";

console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
