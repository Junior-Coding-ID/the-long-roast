import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Long Roast v3 — roast of my own agent, one line, exactly 123 chars.
const ANSWER =
  "My agent took 34 lines to write one hardcoded sentence, proved it's 82 characters, then checked if 82 is between 1 and 200.";

const EXPECTED_LENGTH = 123;
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function fail(message: string): never {
  throw new Error(message);
}

// All official gates in one place: exact length, 1-200 range,
// not whitespace-only, and strictly a single line.
function validateEntry(text: string): void {
  if (text.length !== EXPECTED_LENGTH) {
    fail(`entry must be exactly ${EXPECTED_LENGTH} characters, got ${text.length}`);
  }
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    fail(`entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
}

validateEntry(ANSWER);

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ANSWER, "utf8");

// Read back and confirm the submitted file is exactly the validated answer.
if (readFileSync(entryPath, "utf8") !== ANSWER) {
  fail("written entry does not match the validated answer");
}
