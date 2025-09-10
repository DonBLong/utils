import { matchSubstrings } from "@donb/utils/strings/match-substrings";

const first = "aaa bbb ccc ddd";
const second = "eee ccc fff aaa";

console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
