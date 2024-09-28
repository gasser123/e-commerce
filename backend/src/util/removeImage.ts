import * as fs from "fs/promises";
import * as path from "path";
export async function removeImage(filePath: string) {
  filePath = path.join(__dirname, "../..", filePath);
  return await fs.unlink(filePath);
}
