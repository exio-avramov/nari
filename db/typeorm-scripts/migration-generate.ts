#!/usr/bin/env bun
import { $ } from "bun";
import minimist from "minimist";

// Parse CLI args
const args = minimist(process.argv.slice(2));
const name = args.name;

if (!name) {
  console.error("❌ Missing --name=<MigrationName>");
  process.exit(1);
}

// Build command
//Original package-json script: "migration:generate": "typeorm-ts-node-esm migration:generate --pretty -d ./db/data_source.ts",
const cmd = [
  "typeorm-ts-node-esm",
  "migration:generate",
  "--pretty",
  "-d",
  "./db/data_source.ts",
  `./db/migrations/${name}`,
];

// Run it
await $`${cmd}`;
