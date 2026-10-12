import type { SystemEvent } from "../system-events.ts";
import { SYSTEM_LOG_MESSAGES } from "./system-log-messages.ts";
import { createTranslator, registerMessages } from "./translator.ts";
import { referenceDisplayName } from "./references.ts";
import { breakdown, formatCopper } from "../srd/currency.ts";

// Standalone API workers must not rely on a prior page render to load copy.
registerMessages(SYSTEM_LOG_MESSAGES);

// Render once in the campaign locale before persistence. Old content is never
// reinterpreted on a UI-language switch; English tool results stay separate.
export function systemEventText(event: SystemEvent): string {
  const t = createTranslator(event.locale);
  switch (event.kind) {
    case "partyItem": return t(`playerLog.item.${event.direction}`, {
      actor: event.actor, item: referenceDisplayName("equipment", event.item, event.locale),
      quantity: event.qty > 1 ? t("playerLog.quantity", { count: event.qty }) : "",
    });
    case "partyCoins": {
      const coins = event.locale === "en" ? formatCopper(event.copper) : breakdown(event.copper)
        .map(row => `${row.count} ${t(`playerLog.denom.${row.denomination}`)}`).join(" ") || `0 ${t("playerLog.denom.gp")}`;
      return t(`playerLog.coins.${event.direction}`, { actor: event.actor, coins });
    }
    case "partyXp": return t("playerLog.xp", { spent: event.spent, names: event.names.join(t("playerLog.list")) });
  }
}
