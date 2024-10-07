import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyDirectory(source, destination) {
  await fs.mkdir(destination);
  const items = await fs.readdir(source, { withFileTypes: true });

  for (let i = 0; i < items.length; i++) {
    const sPath = path.join(source, items[i].name);
    const cPath = path.join(destination, items[i].name);

    if (items[i].isDirectory()) {
      await copyFolder(sPath, cPath);
    } else {
      await fs.copyFile(sPath, cPath);
    }
  }
}

const copy = async () => {
  const sourceFolder = path.join(__dirname, "files");
  const copyFolder = path.join(__dirname, "files_copy");

  try {
    await fs.access(sourceFolder);

    try {
      await fs.access(copyFolder);
      throw new Error("FS operation failed");
    } catch (err) {}
    await fs.mkdir(copyFolder);

    const items = await fs.readdir(sourceFolder, { withFileTypes: true });

    for (const item of items) {
      const sPath = path.join(sourceFolder, item.name);
      const cPath = path.join(copyFolder, item.name);

      if (item.isDirectory()) {
        await copyDirectory(sPath, cPath);
      } else {
        await fs.copyFile(sPath, cPath);
      }
    }

    console.log("Success");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy();
