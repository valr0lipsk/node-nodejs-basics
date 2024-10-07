import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { stdin } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");

  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(filePath);

    stdin.on("error", (error) => {
      console.error("Error reading from stdin:", error.message);
      reject(error);
    });

    writeStream.on("error", (error) => {
      console.error("Error writing to file:", error.message);
      reject(error);
    });

    writeStream.on("finish", () => {
      resolve();
    });

    // Перенаправляем stdin в файл
    stdin.pipe(writeStream);

    // Обрабатываем завершение ввода (Ctrl+D в Unix или Ctrl+Z в Windows)
    stdin.on("end", () => {
      writeStream.end();
    });
  });
};

await write();
