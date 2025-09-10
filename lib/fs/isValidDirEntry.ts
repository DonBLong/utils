import { extname } from "jsr:@std/path@^1.1.2/extname";
import type { FileExtension } from "./FileExtension.ts";
/**
 * Checks if a `Deno.DirEntry` object belongs to a given {@linkcode types} list.
 *
 * @example Usage
 * ```ts
 * import { isValidDirEntry } from "@donb/utils/fs/is-valid-dir-entry";
 *
 * const dirEntry: Deno.DirEntry = {
 *  isDirectory: false,
 *  isFile: true,
 *  isSymlink: false,
 *  name: "file.ts",
 * };
 *
 * console.log(isValidDirEntry(dirEntry, [".js", ".ts"])); // true
 *
 * console.log(isValidDirEntry(dirEntry, ["directory", ".txt"])); // false
 * ```
 *
 * @param dirEntry The `Deno.DirEntry` object to check.
 * @param types A list of file-types to check the {@linkcode dirEntry} against.
 * @returns `true` if the type of the {@linkcode dirEntry} matches any of the {@linkcode types}, otherwise `false`.
 */
export function isValidDirEntry(
  dirEntry: Deno.DirEntry,
  types?: (FileExtension | "directory")[],
): boolean {
  if (dirEntry.isFile) {
    const fileExt = extname(dirEntry.name) as FileExtension;
    return types?.includes(fileExt) ?? false;
  } else if (dirEntry.isDirectory) return types?.includes("directory") ?? false;
  return false;
}
