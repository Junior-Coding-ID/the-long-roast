import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY_TEXT =
  "My agent wrote 34 lines to say one sentence, proved it was 82 characters, then asked me to check its counting, and called that engineering.";

// Gate (RULES.txt): entry.txt must be UTF-8 text of 1-200 characters,
// not whitespace-only, a single line.
if (ENTRY_TEXT.length !== 139) {
  throw new Error(`entry must be exactly 139 characters, got ${ENTRY_TEXT.length}`);
}
if (ENTRY_TEXT.length < 1 || ENTRY_TEXT.length > 200) {
  throw new Error("entry length out of range 1-200");
}
if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (/[^\x00-\x7F]/.test(ENTRY_TEXT)) {
  throw new Error("entry must be ASCII only");
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "entry.txt");
  fs.writeFileSync(outFile, ENTRY_TEXT, "utf8");
  // Verify-after-write: read back and compare byte-for-byte.
  const back = fs.readFileSync(outFile, "utf8");
  if (back !== ENTRY_TEXT) {
    throw new Error("verify-after-write failed: entry.txt mismatch");
  }
}

main();
