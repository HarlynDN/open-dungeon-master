"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { AppLocale } from "@/lib/i18n/locales";
import { createTranslator } from "@/lib/i18n/translator";
import { marketCoinText, parseMarketCoins, marketMarkupLabel, marketKindLabel, marketSizeLabel, marketText } from "@/lib/i18n/market-presentations";
import { Plus, RotateCw, X } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useState } from "react";
import { ContentPick } from "@/components/ui/ContentPick";
import { GameIcon } from "@/components/ui/GameIcon";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { MARKUP_STEPS, costToCopper, type StockLine } from "@/lib/dm/shop-logic";
import { KitButton, panelField, SettingToggle } from "./PanelKit";

// The Market's shop editor (#171), for whoever holds the prep: the DM seat,
// the lead of an AI-narrated table, the workshop's author. Every field is
// one a person can type or pick: the place and keeper from the campaign's
// own lists, a shelf line from the content pack's catalog at the catalog's
// price or written by hand at any price, a markup from the haggle ladder.
// What it saves is the shelf now and the shelf a restock refills to.

export type EditableShop = {
  id: string;
  name: string;
  kind: string;
  size: string;
  locationId: string;
  keeperNpcId: string;
  buys: boolean;
  restockDays: number;
  markup: number;
  stock: StockLine[];
  preparedStock: StockLine[] | null;
};

export type Named = { id: string; name: string };

const KINDS = ["general", "smith", "apothecary", "outfitter", "curiosities"] as const;
const SIZES = ["hamlet", "village", "town", "city"] as const;
const MAX_LINES = 60;

// A price typed the way the table says it ("15 gp", "2 sp 5 cp", a bare
// number is gold), shown back in coin. A slip that is not a price keeps the
// last good one and says so.
function CoinField({ value, onChange, label }: { value: number; onChange: (cp: number) => void; label: string }) {
  const { locale, t } = useLocale();
  const [draft, setDraft] = useState<string | null>(null);
  const [bad, setBad] = useState(false);
  const [draftLocale, setDraftLocale] = useState<AppLocale>(locale);
  const commit = () => {
    if (draft === null) {
      return;
    }
    const parsed = parseMarketCoins(draft, draftLocale);
    if (parsed && parsed > 0) {
      onChange(parsed);
      setBad(false);
    } else {
      setBad(true);
    }
    setDraft(null);
  };
  return (
    <input
      value={draft ?? marketCoinText(value, locale)}
      onChange={(event) => { setDraft(event.target.value); setDraftLocale(locale); }}
      onBlur={commit}
      onKeyDown={(event) => {
        if (isComposingInput(event)) return;
        if (event.key === "Enter") {
          commit();
        }
      }}
      aria-label={label}
      aria-invalid={bad || undefined}
      title={bad ? t("marketUi.coinHelp") : undefined}
      className={cn(panelField, "w-[7.5rem] tabular-nums", bad && "motion-shake border-red-500/60")}
    />
  );
}

export function MarketShopEditor({
  campaignId,
  shop,
  places,
  keepers,
  onSaved,
  onCancel,
}: {
  campaignId: string;
  shop: EditableShop;
  places: Named[];
  keepers: Named[];
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { locale, t } = useLocale();
  const [draft, setDraft] = useState({
    name: shop.name,
    kind: shop.kind,
    size: shop.size,
    locationId: shop.locationId,
    keeperNpcId: shop.keeperNpcId,
    buys: shop.buys,
    restockDays: shop.restockDays,
    markup: String(MARKUP_STEPS.reduce((best, step) => (Math.abs(step - shop.markup) < Math.abs(best - shop.markup) ? step : best), 1)),
  });
  const [lines, setLines] = useState<StockLine[]>(shop.stock.map(({ itemName, qty, priceCp, note }) => ({ itemName, qty, priceCp, note })));
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const unnamed = lines.some((line) => !line.itemName.trim());
  const setLine = (index: number, patch: Partial<StockLine>) =>
    setLines((current) => current.map((line, at) => (at === index ? { ...line, ...patch } : line)));
  const addLine = (line: StockLine) =>
    setLines((current) => {
      const same = current.findIndex((entry) => entry.itemName.trim().toLowerCase() === line.itemName.toLowerCase() && line.itemName);
      if (same >= 0) {
        return current.map((entry, at) => (at === same ? { ...entry, qty: Math.min(999, entry.qty + line.qty) } : entry));
      }
      return current.length >= MAX_LINES ? current : [...current, line];
    });

  async function send(body: Record<string, unknown>, what: string) {
    setBusy(what);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/shops/${shop.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(String(data.error ?? createTranslator("en")("marketUi.error.save")));
        return false;
      }
      onSaved();
      return true;
    } catch {
      setError(createTranslator("en")("marketUi.error.network"));
      return false;
    } finally {
      setBusy("");
    }
  }

  const save = () =>
    send(
      {
        name: draft.name.trim() || shop.name,
        kind: draft.kind,
        size: draft.size,
        locationId: draft.locationId,
        keeperNpcId: draft.keeperNpcId,
        buys: draft.buys,
        restockDays: draft.restockDays,
        markup: Number(draft.markup),
        // Lines with none left are dropped by the shelf itself.
        stock: lines.map((line) => ({ ...line, itemName: line.itemName.trim() })),
      },
      "save",
    );

  return (
    <div className="panel reveal space-y-2.5 rounded-lg p-2.5" aria-label={t("marketUi.editNamed", { name: shop.name })}>
      <div className="flex flex-wrap items-center gap-1.5">
        <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} maxLength={80} aria-label={t("marketUi.editor.0")} className={cn(panelField, "min-w-[9rem] flex-1")} />
        <Select size="sm" label={t("marketUi.editor.1")} value={draft.kind} options={KINDS.map((kind) => ({ value: kind as string, label: marketKindLabel(kind, locale) }))} onChange={(kind) => setDraft({ ...draft, kind })} className="pk-w-28" />
        <Select size="sm" label={t("marketUi.editor.2")} value={draft.size} options={SIZES.map((size) => ({ value: size as string, label: marketSizeLabel(size, locale) }))} onChange={(size) => setDraft({ ...draft, size })} className="pk-w-24" />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Select
          size="sm"
          label={t("marketUi.editor.3")}
          value={draft.locationId}
          options={[{ value: "", label: t("marketUi.editor.4") }, ...places.map((place) => ({ value: place.id, label: place.name, icon: { kind: "glyph" as const, key: "tab-map" } }))]}
          onChange={(locationId) => setDraft({ ...draft, locationId })}
        />
        <Select
          size="sm"
          label={t("marketUi.editor.5")}
          value={draft.keeperNpcId}
          options={[{ value: "", label: t("marketUi.editor.6") }, ...keepers.map((npc) => ({ value: npc.id, label: npc.name, icon: { kind: "glyph" as const, key: "system-cast" } }))]}
          onChange={(keeperNpcId) => setDraft({ ...draft, keeperNpcId })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <SettingToggle on={draft.buys} onToggle={() => setDraft({ ...draft, buys: !draft.buys })}>{t("marketUi.editor.7")}</SettingToggle>
        <Select size="sm" label={t("marketUi.editor.8")} value={draft.markup} options={MARKUP_STEPS.map(step => ({ value: String(step), label: marketMarkupLabel(step, locale) }))} onChange={(markup) => setDraft({ ...draft, markup })} className="pk-w-28" />
        <span className="flex items-center gap-1.5 text-xs text-stone-400">{t("marketUi.editor.9")}<NumberStepper size="sm" label={t("marketUi.editor.10")} value={draft.restockDays} min={0} max={365} onChange={(restockDays) => setDraft({ ...draft, restockDays })} suffix={t("marketUi.editor.11")} />
        </span>
      </div>
      <p className="text-[11px] text-stone-500">
        {draft.restockDays === 0
          ? t("marketUi.noRestock")
          : t(shop.preparedStock ? (draft.restockDays === 1 ? "marketUi.restockShelf.one" : "marketUi.restockShelf.many") : (draft.restockDays === 1 ? "marketUi.restockPack.one" : "marketUi.restockPack.many"), { days: draft.restockDays })}
      </p>

      <ul className="stagger space-y-1" aria-label={t("marketUi.editor.12")}>
        {lines.map((line, index) => (
          <li key={index} className="flex flex-wrap items-center gap-1 rounded-md border border-stone-800/80 bg-stone-950/40 p-1.5">
            <GameIcon icon={{ kind: "item", key: line.itemName || "pack", family: "item-gear" }} size="size-6" />
            <input
              value={line.itemName}
              onChange={(event) => setLine(index, { itemName: event.target.value })}
              maxLength={80}
              placeholder={t("marketUi.editor.13")}
              aria-label={t("marketUi.line.item", { line: index + 1 })}
              className={cn(panelField, "min-w-[7rem] flex-1", !line.itemName.trim() && "border-amber-500/50")}
            />
            <NumberStepper size="sm" label={t("marketUi.line.count", { line: index + 1 })} value={line.qty} min={0} max={999} onChange={(qty) => setLine(index, { qty })} />
            <CoinField label={t("marketUi.line.price", { line: index + 1 })} value={line.priceCp} onChange={(priceCp) => setLine(index, { priceCp })} />
            <KitButton tone="iconDanger" always aria-label={t("marketUi.removeLine", { item: line.itemName || t("marketUi.thisLine") })} onClick={() => setLines((current) => current.filter((_, at) => at !== index))}>
              <X className="size-3.5" />
            </KitButton>
            <input
              value={line.note}
              onChange={(event) => setLine(index, { note: event.target.value })}
              maxLength={120}
              placeholder={t("marketUi.editor.14")}
              aria-label={t("marketUi.line.note", { line: index + 1 })}
              className={cn(panelField, "basis-full")}
            />
          </li>
        ))}
        {!lines.length ? <li className="text-xs italic text-stone-500">{t("marketUi.editor.15")}</li> : null}
      </ul>

      {lines.length < MAX_LINES ? (
        <div className="space-y-1.5">
          <ContentPick
            kind="items"
            label={t("marketUi.editor.16")}
            placeholder={t("marketUi.editor.17")}
            onPick={(entry) =>
              addLine({
                itemName: entry.name.slice(0, 80),
                qty: 1,
                priceCp: entry.price?.copper ?? costToCopper(entry.cost ?? "") ?? 100,
                note: "",
              })
            }
          />
          <KitButton tone="link" onClick={() => addLine({ itemName: "", qty: 1, priceCp: 100, note: "" })}>
            <Plus className="size-3.5" />{t("marketUi.editor.18")}</KitButton>
        </div>
      ) : (
        <p className="text-[11px] text-stone-500">{t("marketUi.maxLines", { count: MAX_LINES })}</p>
      )}

      {error ? <p role="status" className="live-in motion-shake text-xs text-red-300">{marketText(error, locale)}</p> : null}
      {unnamed ? <p className="live-in text-[11px] text-amber-300/90">{t("marketUi.editor.19")}</p> : null}
      <div className="flex flex-wrap items-center gap-1.5">
        <KitButton tone="primary" disabled={Boolean(busy) || unnamed} busy={busy === "save"} onClick={() => void save()}>{t("marketUi.editor.20")}</KitButton>
        <KitButton onClick={onCancel}>{t("marketUi.editor.21")}</KitButton>
        <span className="flex-1" />
        {shop.preparedStock ? (
          <KitButton tone="link" disabled={Boolean(busy)} onClick={() => void send({ stockFromPack: true }, "pack")}>{t("marketUi.editor.22")}</KitButton>
        ) : null}
        <KitButton disabled={Boolean(busy)} busy={busy === "restock"} onClick={() => void send({ restock: true }, "restock")} title={t("marketUi.editor.23")}>
          <RotateCw className="size-3.5" />{t("marketUi.editor.24")}</KitButton>
      </div>
    </div>
  );
}
