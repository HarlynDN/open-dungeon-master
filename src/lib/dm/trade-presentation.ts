import type { TradeOffer } from "./trade-logic.ts";
import { formatCopper } from "../srd/currency.ts";

export type TradeFailureDetail = {
  version: 1;
  english: string;
  kind: "giveItem" | "wantItem" | "giveCoin" | "wantCoin";
  who: string;
  item?: string;
  qty?: number;
  cp?: number;
};
function nativeFailure(detail: Omit<TradeFailureDetail, "english">): string | null {
  if (!detail.who || typeof detail.who !== "string") return null;
  const give = detail.kind === "giveItem" || detail.kind === "giveCoin";
  if (detail.kind === "giveItem" || detail.kind === "wantItem") {
    if (typeof detail.item !== "string" || !detail.item || typeof detail.qty !== "number" || !Number.isFinite(detail.qty) || detail.qty < 1) return null;
    return `${detail.who} ${give ? "no longer carries" : "does not carry"} ${detail.qty > 1 ? `${detail.qty} ` : ""}${detail.item}.`;
  }
  if (detail.kind !== "giveCoin" && detail.kind !== "wantCoin") return null;
  if (typeof detail.cp !== "number" || !Number.isFinite(detail.cp) || detail.cp < 0) return null;
  return `${detail.who} ${give ? "no longer has" : "does not have"} ${formatCopper(detail.cp)}.`;
}

// Bind known computeTrade failures to the exact offer and proper actor names.
// No English-name splitting, changed mutation parameters or extra DB reads.
export function tradeFailureDetail(english: string, offer: TradeOffer, from: string, to: string): TradeFailureDetail | null {
  const candidates: Array<Omit<TradeFailureDetail, "english">> = [
    ...offer.give.map(line => ({ version: 1 as const, kind: "giveItem" as const, who: from, item: line.name, qty: line.qty })),
    ...offer.want.map(line => ({ version: 1 as const, kind: "wantItem" as const, who: to, item: line.name, qty: line.qty })),
    { version: 1, kind: "giveCoin", who: from, cp: offer.giveCp },
    { version: 1, kind: "wantCoin", who: to, cp: offer.wantCp },
  ];
  const matched = candidates.find(detail => nativeFailure(detail) === english);
  return matched ? { ...matched, english } : null;
}
export function validTradeFailureDetail(raw: unknown, english: string): TradeFailureDetail | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const detail = raw as TradeFailureDetail;
  return detail.version === 1 && detail.english === english && nativeFailure(detail) === english ? detail : null;
}
