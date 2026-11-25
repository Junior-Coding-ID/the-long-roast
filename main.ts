const fs = require("node:fs");
const path = require("node:path");

const ANSWER = "My agent opened a pull request for this roast, got 6 approvals, and left the punchline as a TODO.";

const outDir = process.env.MAKEFUN_OUTPUT || "/output";
const outPath = path.join(outDir, "entry.txt");

function countDots(text) {
  let n = 0;
  for (const ch of text) {
    if (ch === ".") n++;
  }
  return n;
}

const charCount = ANSWER.length;
const dotCount = countDots(ANSWER);

if (charCount < 1 || charCount > 200) {
  throw new Error("Jawaban harus 1-200 karakter, dapat " + charCount);
}
if (ANSWER.trim().length === 0) {
  throw new Error("Jawaban tidak boleh hanya whitespace");
}
if (charCount !== 97) {
  throw new Error("Jumlah karakter harus 97, dapat " + charCount);
}
if (dotCount !== 1) {
  throw new Error("Jumlah titik harus 1, dapat " + dotCount);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, ANSWER, "utf8");

const back = fs.readFileSync(outPath, "utf8");
if (back.length !== 97) {
  throw new Error("Verifikasi gagal: panjang baca-balik harus 97, dapat " + back.length);
}
if (back !== ANSWER) {
  throw new Error("Verifikasi gagal: isi entry.txt tidak sama byte-per-byte dengan jawaban");
}
const backBytes = fs.readFileSync(outPath);
if (!backBytes.equals(Buffer.from(ANSWER, "utf8"))) {
  throw new Error("Verifikasi byte gagal: entry.txt tidak sama dengan jawaban");
}

console.log("OK: entry.txt ditulis ke " + outPath);
console.log("Karakter: " + charCount);
console.log("Titik: " + dotCount);
