import { matchChars } from "@donblong/utils/strings";

const first = "aabbccddeeff";
const second = "ghbiej";

console.log(matchChars(first, second)); // ["b", "b", "e", "e"]
