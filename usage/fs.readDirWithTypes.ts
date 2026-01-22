import { readDirWithTypes } from "@donb/utils/fs/read-dir-with-types";
import { extname } from "@std/path/extname";

const dirEntries = await readDirWithTypes("/", [".ts", ".js"]);

console.log(
  dirEntries.every(entry => [".ts", ".js"].includes(extname(entry.name))),
); // true

const dirsOnly = await readDirWithTypes("/", ["directory"]);

console.log(dirsOnly.every(entry => entry.isDirectory)); // true
