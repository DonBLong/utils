import {
  isValidDirEntry,
  readDirSyncWithTypes,
  readDirWithTypes,
} from "@donb/utils/fs";
import { assertEquals } from "@std/assert/equals";

// isValidDirEntry()
Deno.test("isValidDirEntry()", () => {
  const dirEntry: Deno.DirEntry = {
    isDirectory: false,
    isFile: true,
    isSymlink: false,
    name: "file.ts",
  };
  assertEquals(isValidDirEntry(dirEntry, [".js", ".ts"]), true);
  assertEquals(isValidDirEntry(dirEntry, ["directory", ".ts"]), true);
  assertEquals(isValidDirEntry(dirEntry, ["directory", ".txt"]), false);
});

const readPermession = Deno.permissions.requestSync({
  name: "read",
  path: "./tests/fs/dir",
});

if (readPermession.state === "granted") {
  // readDirSyncWithTypes
  Deno.test("readDirSyncWithTypes()", () => {
    assertEquals(
      readDirSyncWithTypes("./tests/fs/dir", [".txt", "directory"]),
      [
        {
          name: "file01.txt",
          isDirectory: false,
          isFile: true,
          isSymlink: false,
        },
        {
          name: "subDir",
          isDirectory: true,
          isFile: false,
          isSymlink: false,
        },
      ],
    );
  });

  // readDirWithTypes
  Deno.test("readDirWithTypes()", async () => {
    assertEquals(
      await readDirWithTypes("./tests/fs/dir", [".txt", "directory"]),
      [
        {
          name: "file01.txt",
          isDirectory: false,
          isFile: true,
          isSymlink: false,
        },
        {
          name: "subDir",
          isDirectory: true,
          isFile: false,
          isSymlink: false,
        },
      ],
    );
  });
}
