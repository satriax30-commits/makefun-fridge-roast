// Fridge Roast: One Line, Biggest Laugh
// make.fun bounty u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb
//
// Deterministic Node 22 program (stdlib only, no network, no randomness,
// no wall-clock time). Writes a single roast line to <outputDir>/entry.txt,
// where outputDir is ENTRY_OUTPUT_DIR (or MAKEFUN_OUTPUT_DIR) if set,
// otherwise /output.
//
// Candidate lines weighed against the judge brief, most important first:
// (1) roast of a smart fridge, (2) punchline lands on first read,
// (3) specific to smart fridges, (4) tight wording, (5) fresh angle
// (no ordering-groceries / watching-you cracks):
//
// WINNER — firmware update blocks the fridge's one core job; the turn is
// a $3,000 touchscreen that "forgot how to be cold". Names two listed
// targets (firmware, ice maker) and roasts the fridge itself, not the user.
// Tightened in revision: "to make ice" replaces "before it would make ice"
// (same setup, three fewer words, punchline unchanged).
//   "My smart fridge needed a firmware update to make ice —
//    a $3,000 touchscreen that forgot how to be cold."
//
// RUNNER-UP (milk expiry) — good escalation, but the punchline roasts the
// carton's reaction more than the fridge itself:
//   "My smart fridge flagged my milk expired two days early — even the
//    carton wants a lawyer."
//
// RUNNER-UP (ice-maker noise) — specific, but the gym bit is a generic
// gadget gag and the turn lands softer:
//   "My smart fridge's ice maker groans like it's deadlifting, then drops
//    one cube — a freezer with a gym membership."
//
// RUNNER-UP (camera / leftovers) — drifts into roasting my cooking
// instead of the fridge:
//   "My smart fridge's camera called my leftovers 'unrecognizable' —
//    even it won't claim what I cooked."
//
// The winner is kept as a single literal below: no selection logic at
// runtime, so the output is byte-identical on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My smart fridge needed a firmware update to make ice \u2014 a $3,000 touchscreen that forgot how to be cold.";

const outputDir =
  process.env.ENTRY_OUTPUT_DIR ??
  process.env.MAKEFUN_OUTPUT_DIR ??
  "/output";
const outputPath = join(outputDir, "entry.txt");

// Gate: 1-200 chars, exactly one line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
if (/\r|\n/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");

// Read-back self-check: what landed on disk must be exactly the line.
const back = readFileSync(outputPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`wrote ${outputPath} (${ENTRY.length} chars)`);
console.log(ENTRY);
