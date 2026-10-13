import { opportunityEventText } from "../dm/opportunity-event.ts";
import { kickoffInstruction, type SystemEvent } from "../system-events.ts";
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
    case "kickoff": return event.locale === "en" ? kickoffInstruction(event.humanDm) : t("playerLog.kickoff");
    case "death":
      if (event.locale === "en") return event.english;
      return t(`playerLog.death.${event.outcome}`, { actor: event.actor, hours: event.hours ?? 0, total: event.total ?? 0, result: t(event.success ? "playerLog.death.success" : "playerLog.death.failure"), successes: event.successes ?? 0, failures: event.failures ?? 0 });
    case "rest": {
      if (event.locale === "en") return event.english;
      const days = event.minutes / 1440, hours = event.minutes / 60;
      const duration = event.minutes >= 1440 && Number.isInteger(days) ? t("playerLog.rest.days", { amount: days })
        : event.minutes >= 60 && Number.isInteger(hours) ? t("playerLog.rest.hours", { amount: hours }) : t("playerLog.rest.minutes", { amount: event.minutes });
      return t(`playerLog.rest.${event.rest}`, {
        duration, clock: event.clockText ? t("playerLog.rest.clock", { clock: event.clockText }) : "",
        skipped: event.skipped.length ? t("playerLog.rest.skipped", { names: event.skipped.map(row => t(`playerLog.rest.${row.reason}`, { actor: row.actor })).join(t("playerLog.rest.separator")) }) : "",
      });
    }
    case "opportunity": return opportunityEventText(event);
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
