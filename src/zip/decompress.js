import fs from "fs";
import zlib from "zlib";
import path from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const inputFile = path.join(__dirname, "files", "archive.gz");
  const outputFile = path.join(__dirname, "files", "fileToCompress.txt");

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();

  await pipeline(readStream, gunzip, writeStream);
};

await decompress();
