export function padStart(content: number | string, paddingLength = 0) {
  return content
    .toString()
    .replace(/\d+/g, (m) => m.padStart(paddingLength, "0"));
}
