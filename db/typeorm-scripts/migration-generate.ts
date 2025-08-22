#!/usr/bin/env bun
import { $ } from "bun";
import minimist from "minimist";
import fs from "fs";
import path from "path";

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

// -------------------------
// Fix import for TS 5+ verbatimModuleSyntax
// -------------------------
const migrationsDir = path.resolve("./db/migrations");
const migrationFiles = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".ts"))
  .map((f) => ({ file: f, mtime: fs.statSync(path.join(migrationsDir, f)).mtime.getTime() }))
  .sort((a, b) => b.mtime - a.mtime);

const latestFile = path.join(migrationsDir, migrationFiles[0].file);
let content = fs.readFileSync(latestFile, "utf-8");

content = content.replace(
  /import \{ MigrationInterface, QueryRunner \} from "typeorm";/,
  'import type { MigrationInterface, QueryRunner } from "typeorm";'
);

fs.writeFileSync(latestFile, content);