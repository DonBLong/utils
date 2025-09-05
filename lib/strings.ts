export function matchChars(first: string, second: string): string[] {
  return [...first].filter((char) => second.includes(char));
}

export function matchCharsUnique(first: string, second: string): string[] {
  const characterSetOfFirst = new Set(first);
  const characterSetOfSecond = new Set(second);
  return [...characterSetOfFirst.intersection(characterSetOfSecond)];
}

export function matchSubstrings(first: string, second: string): string[] {
  const matchArray: string[] = [];
  [...first].reduce<string>((match, char, index) => {
    if (second.includes(char)) {
      if (first.includes(match.concat(char))) {
        if (second.includes(match.concat(char))) {
          match = match.concat(char);
        } else {
          if (match.length > 1) matchArray.push(match);
          if (second.includes(match.slice(1).concat(char))) {
            match = match.slice(1).concat(char);
          } else match = char;
        }
      }
      if (index === first.length - 1) matchArray.push(match);
    }
    return match;
  }, "");
  return matchArray;
}
