import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, "files", "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.on("error", (error) => {
    console.error(`Error in child process: ${error.message}`);
  });

  const exitPromise = new Promise((resolve) => {
    child.on("exit", (code, signal) => {
      resolve();
    });
  });

  child.on("message", (message) => {
    console.log("Received message from child:", message);
  });

  await exitPromise;
};

spawnChildProcess(["arg1", "arg2", "arg3"]);
