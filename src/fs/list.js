import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const dirPath = path.join(__dirname, "files");

  try {
    await fs.access(dirPath);

    const items = await fs.readdir(dirPath);
    console.log("FILES:");
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  } catch (error) {
    throw new Error("FS operation failed");
  }
  // Write your code here
};

await list();
