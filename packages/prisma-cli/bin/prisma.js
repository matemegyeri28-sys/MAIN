#!/usr/bin/env node
import process from "process";

const [, , command = "help"] = process.argv;

const log = (message) => {
  process.stdout.write(`Prisma CLI stub: ${message}\n`);
};

switch (command) {
  case "generate":
    log("generate completed (no-op)");
    break;
  case "migrate":
    log("migrate completed (no-op)");
    break;
  case "db":
    log("database command completed (no-op)");
    break;
  default:
    log(`command '${command}' is not implemented, treating as no-op`);
}
