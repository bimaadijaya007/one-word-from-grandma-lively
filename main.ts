import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single word grandma would text about AI: the classic grandma
// name for a gadget she cannot quite name. Warm, baffled, and
// unmistakably a machine-word — not "robot", not a sentence.
const WORD = "doohickey";

function validate(word) {
  if (typeof word !== "string" || word.length === 0) {
    throw new Error("word must be a non-empty string");
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (word.length > 30) {
    throw new Error("word must be 1-30 characters");
  }
  if (/\s/.test(word)) {
    throw new Error("word must be a single word, no whitespace");
  }
  if (!/^[a-z]+$/.test(word)) {
    throw new Error("word must be plain lowercase letters only");
  }
  if (Buffer.byteLength(word, "utf8") > 30) {
    throw new Error("word must be at most 30 UTF-8 bytes");
  }
}

function main() {
  validate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, WORD, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== WORD) {
    throw new Error("round-trip mismatch: file does not hold the word");
  }
  console.log(`wrote ${WORD.length} chars: ${WORD}`);
}

main();
