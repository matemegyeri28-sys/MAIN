#!/usr/bin/env node
const command = process.argv.slice(2).join(" ");
console.log(`Prisma CLI stub executed${command ? `: ${command}` : ""}.`);
process.exit(0);
