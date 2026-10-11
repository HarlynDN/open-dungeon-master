import type { GameSettings } from "../schemas/game-settings.ts";

// Legacy English preset metadata, compared against the display catalogs.
export const VARIANT_TOGGLES: Array<{
  key: Exclude<keyof GameSettings["variantRules"], "restVariant">;
  label: string;
  tip: string;
}> = [
  {
    key: "flanking",
    label: "Flanking",
    tip: "Two allies on opposite sides of a creature give each other advantage on melee attacks against it.",
  },
  {
    key: "criticalFumbles",
    label: "Critical fumbles (narrated)",
    tip: "A natural 1 on an attack roll comes with a minor mishap the DM describes. Narration only: the server changes no numbers.",
  },
  {
    key: "encumbrance",
    label: "Encumbrance",
    tip: "Carrying more than 5 times Strength in pounds slows a character by 10 feet.",
  },
  {
    key: "lingeringInjuries",
    label: "Lingering injuries (narrated)",
    tip: "A critical hit or dropping to 0 HP can leave a lasting injury the DM describes. Narration only: the server tracks no injury and changes no numbers.",
  },
  {
    key: "powerfulCritical",
    label: "Powerful critical",
    tip: "On a critical hit the extra weapon dice are dealt as their maximum instead of being rolled.",
  },
  {
    key: "criticalDamageMods",
    label: "Crit damage mods",
    tip: "On a critical hit the flat damage modifiers double along with the dice.",
  },
  {
    key: "ammunition",
    label: "Ammunition",
    tip: "Arrows, bolts and bullets are spent when they are fired and half are recovered after the fight.",
  },
  {
    key: "supplies",
    label: "Food and water",
    tip: "Each dawn every character eats a ration from their pack and drinks; going without costs exhaustion on the SRD's schedule, and that exhaustion stays until they eat. Off: the party is assumed supplied.",
  },
];

export const REST_LABELS: Record<GameSettings["variantRules"]["restVariant"], string> = {
  standard: "Standard rests (1h short, 8h long)",
  gritty: "Gritty realism (8h short, 7-day long)",
  heroic: "Heroic (5min short, 1h long)",
};
