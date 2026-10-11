import type { BuilderGateCode } from "../i18n/builder-messages.ts";
import type { RuleArgs, RuleProblemDetail } from "./problems.ts";

// Presentation accompanies the original gate sentence; it never changes
// whether the gate holds, where it points, or the sheet being submitted.
export type BuilderPresentation =
  | { kind: "gate"; code: BuilderGateCode; args: RuleArgs }
  | { kind: "rules"; problems: string[]; problemDetails: RuleProblemDetail[]; more: number };
export type BuilderFeedback = { message: string; presentation?: BuilderPresentation };
export type BuilderValidation = BuilderFeedback & { kind: "error" | "spellWarning" };

export function builderGate(code: BuilderGateCode, args: RuleArgs = {}): BuilderPresentation {
  return { kind: "gate", code, args: structuredClone(args) };
}

export function builderRules(problems: string[], problemDetails: RuleProblemDetail[], more = 0): BuilderPresentation {
  return { kind: "rules", problems: [...problems], problemDetails: structuredClone(problemDetails), more };
}
