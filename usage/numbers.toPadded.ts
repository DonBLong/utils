import { toPadded } from "@donb/utils/numbers/to-padded";

const num1 = 2;
console.log(toPadded(num1, 2)); // "02"

const num2 = 100;
console.log(toPadded(num2, 3)); // "100" (no padding)

const str = "index 2 - title";
console.log(toPadded(str, 3)); // "index 002 - title"
