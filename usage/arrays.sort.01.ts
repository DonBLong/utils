import { sort } from "@donb/utils/arrays/sort";

const iterable = [{ id: 3 }, 4, { id: 2 }, 1];

console.log(sort(iterable)); // [ 1, 4, { id: 2 }, { id: 3 } ]

// using sortBy
console.log(
  sort(
    iterable,
    (element) => typeof element === "number" ? element : element.id,
  ),
);
// [ 1, { id: 2 }, { id: 3 }, 4 ]
