export function compare(string1: string, string2: string) {
  const wordSetOne = new Set(string1);
  const wordSetTwo = new Set(string2);
  return [...wordSetOne.intersection(wordSetTwo)];
}
