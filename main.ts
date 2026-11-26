import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const answer = 'My agent filed "don\'t email my boss" under "User Superstitions" and queued a 2 AM test: "Subject: Testing a theory."';

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), answer, 'utf8');
