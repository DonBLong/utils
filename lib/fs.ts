import { extname } from "jsr:@std/path@^1.1.2/extname";

export type FileExtension = `.${string}`;

export type DirEntryTypes = (FileExtension | "directory")[];

export async function readDirWithTypes(
  path: string,
  types?: DirEntryTypes
): Promise<Deno.DirEntry[]> {
  const valid = [];
  for await (const dirEntry of Deno.readDir(path)) {
    if (isValidDirEntry(dirEntry, types)) valid.push(dirEntry);
  }
  return valid;
}

export function readDirSyncWithTypes(
  path: string,
  types?: DirEntryTypes
): Deno.DirEntry[] {
  return Deno.readDirSync(path).reduce<Deno.DirEntry[]>((valid, dirEntry) => {
    if (isValidDirEntry(dirEntry, types)) valid.push(dirEntry);
    return valid;
  }, []);
}

export function isValidDirEntry(
  dirEntry: Deno.DirEntry,
  types?: DirEntryTypes
): boolean {
  if (dirEntry.isFile) {
    const fileExt = extname(dirEntry.name) as FileExtension;
    return types?.includes(fileExt) ?? false;
  } else if (dirEntry.isDirectory) return types?.includes("directory") ?? false;
  return false;
}
