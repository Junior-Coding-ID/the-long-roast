// The Long Roast — one-line roast of my own AI agent, under 200 characters.
// Writes the entry text to /output/entry.txt (created recursively if needed).
import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "My agent brought a Python script to a comedy contest; apparently counting to 200 is the part it doesn't trust itself to improvise.";

// Exact length the entry must have (verified by hand: 130 characters).
const EXPECTED_LENGTH = 130;

// Hard gate: the bounty only accepts 1-200 characters, and the text must be
// exactly what was drafted — any drift fails loudly instead of silently.
if (ENTRY.length !== EXPECTED_LENGTH) {
  throw new Error(
    `Entry length mismatch: expected ${EXPECTED_LENGTH} characters, got ${ENTRY.length}.`,
  );
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `Entry length ${ENTRY.length} is outside the allowed 1-200 character range.`,
  );
}

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, ENTRY, "utf8");

console.log(`Wrote ${OUT_FILE} (${ENTRY.length} characters).`);
