import { spawn } from "node:child_process";

const child = spawn("docker", ["compose", "up", "-d", "postgres"], {
  shell: false,
  stdio: "inherit",
});

child.on("error", (error) => {
  if (error.code === "ENOENT") {
    console.error("Docker is not installed or is not available on PATH.");
    console.error("");
    console.error("Install Docker Desktop, then rerun:");
    console.error("  npm run db:start");
    console.error("");
    console.error("Or start PostgreSQL manually at the DATABASE_URL in .env.local.");
    process.exit(1);
    return;
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
