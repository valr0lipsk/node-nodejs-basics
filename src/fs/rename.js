import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const filePath = path.join(__dirname, "files", "wrongFilename.txt");
  const newFilePath = path.join(__dirname, "files", "properFilename.md");

  try {
    await fs.access(filePath);

    try {
      await fs.access(newFilePath);
      throw new Error("FS operation failed");
    } catch (error) {}

    await fs.rename(filePath, newFilePath);
    console.log("Success");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
