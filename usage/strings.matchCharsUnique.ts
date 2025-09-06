import { matchCharsUnique } from "@donblong/utils/strings";

const first = "aabbccddeeff";
const second = "gghhbbiieejj";

console.log(matchCharsUnique(first, second)); // ["b", "e"]
