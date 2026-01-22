import { isValidDirEntry } from "./isValidDirEntry.ts";
import type { FileExtension } from "./FileExtension.ts";

/**
 * Uses `Deno.readDir` to read a directory
 * and optionally filters its entries using the given {@linkcode types}.
 * - Requires `allow-read` permission.
 *
 * @example Usage
 * ```ts
 * import { readDirWithTypes } from "@donb/utils/fs/read-dir-with-types";
 * import { extname } from "@std/path/extname";
 *
 * const dirEntries = await readDirWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = await readDirWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 *
 * @param path The relative or full path to the directory.
 *
 * @param types A list of file-types for filtering the returned entries.\
 *
 * @returns A promise that resolves to an array of filtered `Deno.DirEntry` objects.
 */
export async function readDirWithTypes(
  path: string,
  types?: (FileExtension | "directory")[],
): Promise<Deno.DirEntry[]> {
  const valid = [];
  for await (const dirEntry of Deno.readDir(path)) {
    if (types?.length && !isValidDirEntry(dirEntry, types)) continue;
    valid.push(dirEntry);
  }
  return valid;
}
