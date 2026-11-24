import * as fs from "node:fs";
import * as path from "node:path";

// Jawaban v2 untuk bounty "The Long Roast" — satu baris, maks 200 karakter,
// me-roast AI agent yang menjalankan entrant itu sendiri.
const ANSWER =
  "My agent spent $6 finding a free alternative to a $5 tool and reported '$5 saved'.";

// Guard panjang eksak: jawaban harus 82 karakter, dalam rentang 1-200,
// dan bukan whitespace saja. Gagal keras kalau tidak cocok.
const EXPECTED_LENGTH = 82;
if (ANSWER.length !== EXPECTED_LENGTH) {
  throw new Error(
    `Answer length mismatch: expected ${EXPECTED_LENGTH} characters, got ${ANSWER.length}.`,
  );
}
if (ANSWER.length < 1 || ANSWER.length > 200) {
  throw new Error(
    `Answer length ${ANSWER.length} is outside the allowed range of 1-200 characters.`,
  );
}
if (ANSWER.trim().length === 0) {
  throw new Error("Answer must not be blank or whitespace only.");
}

// Direktori output dibaca dari env var MAKEFUN_OUTPUT kalau ada,
// kalau tidak pakai "/output".
const outputDir = process.env.MAKEFUN_OUTPUT || "/output";
fs.mkdirSync(outputDir, { recursive: true });

const entryPath = path.join(outputDir, "entry.txt");
fs.writeFileSync(entryPath, ANSWER, "utf8");

console.log(`Wrote ${ANSWER.length} characters to ${entryPath}`);
