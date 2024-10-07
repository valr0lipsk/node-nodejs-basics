import { createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);

    readStream.on("error", (error) => {
      console.error("Error reading file:", error.message);
      reject(error);
    });

    readStream.on("end", () => {
      process.stdout.write("\n");
      resolve();
    });

    readStream.pipe(process.stdout);
  });
};

await read();
