export function padDigits(input: number | string, maxLength = 0): string {
  return input.toString().replace(/\d+/g, (m) => m.padStart(maxLength, "0"));
}
