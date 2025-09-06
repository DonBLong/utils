import { matchSubstrings } from "@donblong/utils/strings";

const first = "aaa bbb ccc ddd";
const second = "eee ccc fff aaa";

console.log(matchSubstrings(first, second)); // ["aaa", "ccc"]
