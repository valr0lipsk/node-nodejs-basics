import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    await fs.appendFile(filePath, "I am fresh and young", { flag: "ax" });
    console.log("Success");
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await create();
