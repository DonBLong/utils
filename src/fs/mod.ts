/**
 * Utilities for working with file-system APIs.
 *
 * @example Reading from a directory with type-filter
 * ```ts
 * // Asynchronous
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
 * ```ts
 * // Synchronous
 * import { readDirSyncWithTypes } from "@donb/utils/fs/read-dir-sync-with-types";
 * import { extname } from "@std/path/extname";
 *
 * const dirEntries = readDirSyncWithTypes("/", [".ts", ".js"]);
 *
 * console.log(dirEntries.every((entry) => [".ts", ".js"].includes(extname(entry.name)))); // true
 *
 * const dirsOnly = readDirSyncWithTypes("/", ["directory"]);
 *
 * console.log(dirsOnly.every((entry) => entry.isDirectory)); // true
 * ```
 * @module fs
 */

export * from "./FileExtension.ts";
export * from "./isValidDirEntry.ts";
export * from "./readDirSyncWithTypes.ts";
export * from "./readDirWithTypes.ts";
