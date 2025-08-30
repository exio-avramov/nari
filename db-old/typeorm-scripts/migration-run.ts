#!/usr/bin/env bun
import { $ } from "bun";

const cmd = [
  "typeorm-ts-node-esm",
  "migration:run",
  "-d",
  "./db/data_source.ts",
];

// Run it
await $`${cmd}`;
