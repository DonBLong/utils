import { findMaxDigitSequence } from "@donblong/utils/arrays";

const strings = ["foo100bar1", "bar1foo100", "foo1000bar10", "bar10foo1000"];

console.log(findMaxDigitSequence(strings)); // "1000"
