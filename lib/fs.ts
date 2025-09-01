import { extname } from "jsr:@std/path@1.1.2/extname";

export type FileExtension = `.${string}`;

export function filterFileTypes(dir: string, fileExtensions?: FileExtension[]) {
  return Deno.readDirSync(dir).reduce((valid: string[], file) => {
    if (file.isFile) {
      const fileExt = extname(file.name) as FileExtension;
      if (isValidExt(fileExt, fileExtensions)) valid.push(file.name);
    }
    return valid;
  }, []);
}

export function isValidExt(
  fileExt: FileExtension,
  extensionList?: FileExtension[]
) {
  return extensionList?.includes(fileExt);
}
