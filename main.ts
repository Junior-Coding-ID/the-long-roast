const fs = require("node:fs");
const path = require("node:path");

// The Long Roast v6 — writes exactly one roast line to <output>/entry.txt.
// Plain Node.js only (node:fs, node:path) — no other runtime APIs, no
// TypeScript annotations, so `node main.ts` runs directly on Node.
const ANSWER = "My agent tidied its memory by filing \"never contact my boss\" under \"User Superstitions\" and queuing a 2 AM email to him: \"Subject: Testing a theory.\"";

// Grader mounts the repo read-only; only the output directory is writable.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_OUTPUT ||
  "/output";

function main() {
  // Bounty gate: exactly one line, 1-200 characters.
  const len = [...ANSWER].length;
  if (len < 1 || len > 200) {
    throw new Error("answer length out of gate: " + len + " characters");
  }
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, ANSWER, "utf8");
  // Self-check: read back from the same output directory.
  const back = fs.readFileSync(target, "utf8");
  if (back !== ANSWER) {
    throw new Error("self-check failed: entry.txt does not match the answer");
  }
}

main();
