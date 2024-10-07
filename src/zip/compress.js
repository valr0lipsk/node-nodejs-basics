import fs from "fs";
import zlib from "zlib";
import path from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputFile = path.join(__dirname, "files", "fileToCompress.txt");
  const outputFile = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  await pipeline(readStream, gzip, writeStream);
};

await compress();
