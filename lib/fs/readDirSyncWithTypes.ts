import { isValidDirEntry } from "./isValidDirEntry.ts";
import type { FileExtension } from "./FileExtension.ts";

/**
 * Uses `Deno.readDirSync` to synchronously read a directory
 * and optionally filters its entries using the given {@linkcode types}.
 * - Requires `allow-read` permission.
 *
 * @example Usage
 * ```ts
 * import { readDirSyncWithTypes } from "@donb/utils/fs/read-dir-sync-with-types";
 * import { extname } from "jsr:@std/path/extname";
 *
 * const dirEntries = readDirSyncWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = readDirSyncWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 *
 * @param path The relative or full path to the directory.
 *
 * @param types A list of file-types for filtering the returned entries.
 *
 * @returns An array of filtered `Deno.DirEntry` objects.
 */
export function readDirSyncWithTypes(
  path: string,
  types?: (FileExtension | "directory")[],
): Deno.DirEntry[] {
  return Deno.readDirSync(path).reduce<Deno.DirEntry[]>((valid, dirEntry) => {
    if (isValidDirEntry(dirEntry, types)) valid.push(dirEntry);
    return valid;
  }, []);
}
