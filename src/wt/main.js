import { Worker } from "worker_threads";
import { cpus } from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, "worker.js");

const performCalculations = async () => {
  const numCPUs = cpus().length;
  const results = new Array(numCPUs);
  const workers = [];
  const workerPromises = [];

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(workerPath, {
      workerData: 10 + i,
    });
    workers.push(worker);

    const workerPromise = new Promise((resolve) => {
      worker.on("message", (result) => {
        results[i] = {
          status: "resolved",
          data: result,
        };
        resolve();
      });

      worker.on("error", (e) => {
        results[i] = {
          status: "error",
          data: null,
        };
        resolve();
      });
    });

    workerPromises.push(workerPromise);
  }

  await Promise.all(workerPromises);

  for (const worker of workers) {
    worker.terminate();
  }

  console.log(results);
};

await performCalculations();
