import { extname } from "jsr:@std/path@^1.1.2/extname";

/**
 * Represnets the extension of a file with a leading `"."`.
 */
export type FileExtension = `.${string}`;

/**
 * Uses `Deno.readDir` to read a directory
 * and optionally filters its entries using the given {@link types}.
 * @param path The relative or full path to the directory.
 * @param types A list of file-types for filtering the returned entries.
 * @returns A promise that resolves to an array of filtered `Deno.DirEntry` objects.
 *
 * @example Usage
 * ```ts
 * import { readDirWithTypes } from "@donblong/utils/fs";
 * import { extname } from "jsr:@std/path/extname";
 *
 * const dirEntries = await readDirWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = await readDirWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 */
export async function readDirWithTypes(
  path: string,
  types?: (FileExtension | "directory")[],
): Promise<Deno.DirEntry[]> {
  const valid = [];
  for await (const dirEntry of Deno.readDir(path)) {
    if (isValidDirEntry(dirEntry, types)) valid.push(dirEntry);
  }
  return valid;
}

/**
 * Uses `Deno.readDirSync` to synchronously read a directory
 * and optionally filters its entries using the given {@link types}.
 * @param path The relative or full path to the directory.
 * @param types A list of file-types for filtering the returned entries.
 * @returns An array of filtered `Deno.DirEntry` objects.
 *
 * @example Usage
 * ```ts
 * import { readDirSyncWithTypes } from "@donblong/utils/fs";
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

/**
 * Checks if a `Deno.DirEntry` object belongs to a given {@link types} list.
 * @param dirEntry The `Deno.DirEntry` object to check.
 * @param types A list of file-types to check the {@link dirEntry} against.
 * @returns `true` if the type of the {@link dirEntry} matches any of the {@link types}, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { isValidDirEntry } from "@donblong/utils/fs";
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
