import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { validProposalSummaryDetail } from "../dm/proposal-summary.ts";
import { normalizeTradeOffer, tradeSummary, type TradeOffer } from "../dm/trade-logic.ts";
import { validTradeFailureDetail } from "../dm/trade-presentation.ts";
import { breakdown } from "../srd/currency.ts";
import { referenceDisplayName } from "./references.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { handRefusalText } from "./hand-material-presentations.ts";
import { playEditNotice } from "./play-edit-presentations.ts";

export const PROPOSAL_SEND_FAILURE = "That did not work.";
export const PROPOSAL_NETWORK_FAILURE = "Could not reach the server.";
export const TRADE_SEND_FAILURE = "The offer could not be made.";

export function proposalSummaryText(proposal: { toolName: string; summary: string; summaryDetail?: unknown }, locale: AppLocale): string {
  if (locale === "en") return proposal.summary;
  const detail = validProposalSummaryDetail(proposal.summaryDetail, proposal.summary, proposal.toolName);
  if (!detail) return proposal.summary;
  const t = createTranslator(locale), args = detail.args, who = detail.characterName;
  const qty = Math.max(1, Number(args.qty ?? 1));
  const nativeItem = String(args.name ?? args.item ?? "").trim();
  const name = nativeItem ? referenceDisplayName("equipment", nativeItem, locale) : t("sessionUi.proposal.unknownItem");
  const item = qty > 1 ? t("sessionUi.proposal.itemQty", { name, qty }) : name;
  switch (detail.toolName) {
    case "grant_item": return t("sessionUi.proposal.giveItem", { item, who });
    case "remove_item": return t("sessionUi.proposal.takeItem", { item, who });
    case "modify_gold": return t(Number(args.delta ?? 0) >= 0 ? "sessionUi.proposal.giveGold" : "sessionUi.proposal.takeGold", { amount: Math.abs(Number(args.delta ?? 0)), who });
    case "purchase": return t(args.action === "sell" ? "sessionUi.proposal.sell" : "sessionUi.proposal.buy", { item, who, gold: Number(args.price ?? 0) * qty });
    case "apply_damage": {
      const type = String(args.type ?? "").trim();
      const key = `combatDetail.damage.${type.toLowerCase()}` as MessageKey;
      const label = type && catalogFor("en", "combatDetail.damage.")[key] ? t(key) : type;
      return t("sessionUi.proposal.damage", { amount: Math.max(1, Number(args.amount ?? 0)), type: label, who });
    }
    case "heal": {
      const amount = Number(args.amount ?? 0), spell = String(args.spell ?? "").trim();
      if (args.temp) return t("sessionUi.proposal.tempHp", { who, amount: Math.max(1, amount) });
      if (spell) return t(amount > 0 ? "sessionUi.proposal.healSpellAmount" : "sessionUi.proposal.healSpell", { who, spell: referenceDisplayName("spell", spell, locale), amount });
      return t("sessionUi.proposal.heal", { who, amount: Math.max(1, amount) });
    }
    case "set_condition":
    case "clear_condition": {
      const native = String(args.condition ?? "").trim();
      const condition = native ? conditionLabel(native, locale) : t("sessionUi.proposal.unknownCondition");
      const rounds = Number(args.rounds ?? 0);
      return t(detail.toolName === "clear_condition" ? "sessionUi.proposal.clearCondition" : rounds > 0 ? "sessionUi.proposal.conditionRounds" : "sessionUi.proposal.condition", { who, condition, rounds });
    }
    default: return proposal.summary;
  }
}

function tradeSide(lines: TradeOffer["give"], cp: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  const parts = lines.map(line => {
    const name = referenceDisplayName("equipment", line.name, locale);
    return line.qty > 1 ? t("sessionUi.proposal.itemQty", { name, qty: line.qty }) : name;
  });
  if (cp > 0) parts.push(breakdown(cp).map(coin => `${coin.count} ${t(`sheetPlay.between.coin.${coin.denomination}` as MessageKey)}`).join(" "));
  return parts.length ? parts.join(t("sessionUi.trade.list")) : t("sessionUi.trade.nothing");
}
export function tradeSummaryText(raw: string, offer: unknown, from: string, to: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const normalized = normalizeTradeOffer(offer);
  if (!normalized || !Number.isFinite(normalized.giveCp) || !Number.isFinite(normalized.wantCp) || tradeSummary(normalized, from, to) !== raw) return raw;
  return createTranslator(locale)("sessionUi.trade.summary", { from, to, give: tradeSide(normalized.give, normalized.giveCp, locale), want: tradeSide(normalized.want, normalized.wantCp, locale) });
}

// Known API messages and complete refusal wrappers only. The original native
// diagnostic survives when its inner wording is authored or not yet registered.
export function proposalErrorText(raw: string, locale: AppLocale, errorDetail?: unknown): string {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  const native = validTradeFailureDetail(errorDetail, raw);
  if (native) {
    const name = native.item ? referenceDisplayName("equipment", native.item, locale) : "";
    const item = native.qty && native.qty > 1 ? t("sessionUi.proposal.itemQty", { name, qty: native.qty }) : name;
    const coin = typeof native.cp === "number" ? breakdown(native.cp).map(value => `${value.count} ${t(`sheetPlay.between.coin.${value.denomination}` as MessageKey)}`).join(" ") || `0 ${t("sheetPlay.between.coin.gp")}` : "";
    return t(`sessionUi.trade.failure.${native.kind}`, { who: native.who, item, coin });
  }
  for (const prefix of ["sessionUi.proposal.error.", "sessionUi.trade.error."]) {
    for (const [key, source] of Object.entries(catalogFor("en", prefix))) {
      if (source === raw) return t(key as MessageKey);
      const at = source.indexOf("{detail}");
      if (at < 0 || !raw.startsWith(source.slice(0, at)) || raw.length === at) continue;
      const inner = raw.slice(at);
      const structured = validTradeFailureDetail(errorDetail, inner);
      if (structured) return t(key as MessageKey, { detail: proposalErrorText(inner, locale, structured) });
      const hand = handRefusalText(inner, locale);
      return t(key as MessageKey, { detail: hand !== inner ? hand : playEditNotice(inner, locale) });
    }
  }
  return playEditNotice(raw, locale);
}
