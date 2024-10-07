import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    await fs.access(filePath);

    const content = await fs.readFile(filePath, "utf8");
    console.log("CONTENT:", content);
  } catch (error) {
    throw new Error("FS operation failed");
  }
  // Write your code here
};

await read();
