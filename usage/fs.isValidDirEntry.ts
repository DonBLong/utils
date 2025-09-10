import { isValidDirEntry } from "@donb/utils/fs/is-valid-dir-entry";

const dirEntry: Deno.DirEntry = {
  isDirectory: false,
  isFile: true,
  isSymlink: false,
  name: "file.ts",
};

console.log(isValidDirEntry(dirEntry, [".js", ".ts"])); // true

console.log(isValidDirEntry(dirEntry, ["directory", ".txt"])); // false
