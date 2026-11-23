import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const FRONT_KEYS_FILE = "src/types/chatErrorKeys.ts";
const DEFAULT_CONTRACT = "../moonie/frontend_handshake_strategy.md";
const ROW_PATTERN = /^\|\s*`(\d{3})`\s*\|\s*`([a-z][a-z0-9_]*)`\s*\|/;

function parseFrontKeys() {
  const file = path.resolve(process.cwd(), FRONT_KEYS_FILE);
  const source = readFileSync(file, "utf8");
  const block = source.match(
    /CHAT_ERROR_KEYS\s*=\s*\[([\s\S]*?)\]\s*as\s+const/,
  );

  if (block === null) {
    console.error(`Could not find CHAT_ERROR_KEYS in ${FRONT_KEYS_FILE}.`);
    process.exit(1);
  }

  return [...block[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
}

function parseContractKeys(file) {
  const keys = [];

  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(ROW_PATTERN);
    if (match !== null) keys.push(match[2]);
  }

  return keys;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

const frontKeys = parseFrontKeys();
const contractPath = path.resolve(
  process.cwd(),
  process.env.MOONIE_CONTRACT_PATH ?? DEFAULT_CONTRACT,
);

if (!existsSync(contractPath)) {
  console.log(`Contract not found at ${contractPath}; skipping drift check.`);
  process.exit(0);
}

const contractKeys = parseContractKeys(contractPath);

if (contractKeys.length === 0) {
  console.error("Could not parse contract table.");
  process.exit(1);
}

const frontSet = new Set(frontKeys);
const contractSet = new Set(contractKeys);
const missingInFront = [...contractSet].filter((key) => !frontSet.has(key));
const missingInContract = [...frontSet].filter((key) => !contractSet.has(key));
const duplicates = [
  ...findDuplicates(frontKeys),
  ...findDuplicates(contractKeys),
];

if (missingInFront.length > 0) {
  console.error(`Missing in frontend: ${missingInFront.join(", ")}`);
}

if (missingInContract.length > 0) {
  console.error(`Missing in contract: ${missingInContract.join(", ")}`);
}

if (duplicates.length > 0) {
  console.error(`Duplicate keys: ${duplicates.join(", ")}`);
}

const hasDrift =
  missingInFront.length > 0 ||
  missingInContract.length > 0 ||
  duplicates.length > 0;

if (hasDrift) process.exit(1);

console.log(`errorKey contract in sync (${frontKeys.length} keys).`);
