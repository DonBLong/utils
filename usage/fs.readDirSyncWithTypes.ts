import { readDirSyncWithTypes } from "@donblong/utils/fs";
import { extname } from "jsr:@std/path/extname";

const dirEntries = readDirSyncWithTypes("/", [".ts", ".js"]);

console.log(
  dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name))),
); // true

const dirsOnly = readDirSyncWithTypes("/", ["directory"]);

console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
