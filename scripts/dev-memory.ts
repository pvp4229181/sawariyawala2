import { spawn } from "node:child_process";
import { MongoMemoryServer } from "mongodb-memory-server";

async function main() {
  const mongodb = await MongoMemoryServer.create({
    // MongoDB does not publish Windows ARM64 community archives. Windows ARM
    // can run the x64 build through its compatibility layer.
    binary: { arch: "x64" },
  });
  const uri = mongodb.getUri("sawariyawala");

  console.log(`Temporary MongoDB is ready at ${uri.replace(/:\/\/.*@/, "://***@")}`);
  console.log("Starting Next.js with the bundled menu catalog...");

  const next = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev"],
    {
      stdio: "inherit",
      env: { ...process.env, MONGODB_URI: uri },
    },
  );

  const shutdown = async () => {
    next.kill("SIGTERM");
    await mongodb.stop();
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
  next.once("exit", async (code) => {
    await mongodb.stop();
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
