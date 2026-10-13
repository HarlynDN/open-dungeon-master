import { randomInt } from "node:crypto";
import { rollExpression as scoreExpression, d20Expression, type DieRng, type Advantage, type RollOptions } from "./dice-core.ts";

export * from "./dice-core.ts";

// Authoritative server rolls retain the cryptographic RNG. Browser consumers
// import dice-core for validation/scoring without pulling Node into their bundle.
export function defaultRng(sides: number) {
  return randomInt(1, sides + 1);
}

export function rollExpression(expression: string, rng: DieRng = defaultRng, options: RollOptions = {}) {
  return scoreExpression(expression, rng, options);
}

export function rollD20(modifier: number, advantage: Advantage = "none", rng: DieRng = defaultRng) {
  return rollExpression(d20Expression(modifier, advantage), rng);
}
