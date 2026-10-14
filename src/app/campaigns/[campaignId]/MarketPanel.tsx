"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { referenceDisplayName } from "@/lib/i18n/references";
import { marketCoinText, marketKindLabel, marketSizeLabel, marketText } from "@/lib/i18n/market-presentations";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { EmptyState } from "@/components/EmptyState";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { useEffect, useState } from "react";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { cn } from "@/lib/cn";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { KitButton, LoadFailed, panelField, PanelLoading, SettingToggle } from "./PanelKit";
import { MarketShopEditor, type Named } from "./MarketShopEditor";
import type { StockLine } from "@/lib/dm/shop-logic";

// The market (docs/vtt-parity-implementation-plan.md 11.1): the shops at
// the party's place, stock as tiles with a price chip in coin, a Buy on
// each, the pack laid out to sell, a haggle button, and a coin arc into
// the purse when money moves. Whoever steers the story sees every shop in
// the world; whoever holds the prep (the DM seat, the lead of an
// AI-narrated table, the workshop's author: the server says which, #171)
// opens shops here or in the workshop and writes their shelves.

type StockView = { itemName: string; qty: number; priceCp: number; askingCp: number; note: string };
type ShopView = {
  id: string;
  name: string;
  kind: string;
  size: string;
  locationId: string;
  keeperNpcId: string;
  restockDays: number;
  preparedStock: StockLine[] | null;
  locationName: string;
  keeperName: string;
  keeperPortrait: string;
  stock: StockView[];
  buys: boolean;
  markup: number;
  haggledBy: string[];
};

const KINDS = ["general", "smith", "apothecary", "outfitter", "curiosities"] as const;
const SIZES = ["hamlet", "village", "town", "city"] as const;

// The coin a price is mostly made of, so a chip leads with the right metal.
function coinGlyph(copper: number): string {
  return copper >= 100 ? "coin-gp" : copper >= 10 ? "coin-sp" : "coin-cp";
}

export function MarketPanel({
  campaignId,
  steersStory,
  isDm = false,
  mySheet,
  refreshKey = 0,
  coins,
}: {
  campaignId: string;
  // Story authority sees every shop and where it stands.
  steersStory: boolean;
  // Holds the DM seat. The server's word (`canPrep`) decides once the
  // market has loaded; this only covers the first paint.
  isDm?: boolean;
  mySheet: CharacterSheet | null;
  refreshKey?: number;
  coins?: { characterId: string; direction: "in" | "out"; at: number } | null;
}) {
  const { locale, t } = useLocale();
  const [shops, setShops] = useState<ShopView[] | null>(null);
  const [here, setHere] = useState<{ id: string; name: string } | null>(null);
  const [places, setPlaces] = useState<Named[]>([]);
  const [keepers, setKeepers] = useState<Named[]>([]);
  const [canPrep, setCanPrep] = useState(isDm);
  const [editing, setEditing] = useState("");
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();

  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const [draft, setDraft] = useState({ name: "", kind: "general", size: "village", locationId: "", keeperNpcId: "", stockFromPack: true });
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    readLoad<{ shops?: ShopView[]; here?: { id: string; name: string } | null; places?: Named[]; keepers?: Named[]; canPrep?: boolean }>(
      fetch(`/api/campaigns/${campaignId}/shops`),
      "The market",
    ).then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      if (outcome.payload) {
        setShops(outcome.payload.shops ?? []);
        setHere(outcome.payload.here ?? null);
        setPlaces(outcome.payload.places ?? []);
        setKeepers(outcome.payload.keepers ?? []);
        setCanPrep(outcome.payload.canPrep ?? isDm);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, refreshKey, reload, settle, isDm]);

  async function counter(shop: ShopView, action: "buy" | "sell" | "haggle", item = "") {
    setBusy(`${shop.id}:${action}:${item}`);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/shops/${shop.id}/trade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, item, qty: 1, characterId: mySheet?.id }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(String(data.error ?? createTranslator("en")("marketUi.error.refused")));
      } else if (action === "haggle") {
        setError(data.result?.success ? createTranslator("en")("marketUi.haggle.good", { prices: data.result.prices }) : createTranslator("en")("marketUi.haggle.bad", { prices: data.result?.prices ?? "rise" }));
      }
      setReload((current) => current + 1);
    } catch {
      setError(createTranslator("en")("marketUi.error.network"));
    } finally {
      setBusy("");
    }
  }

  async function open() {
    if (!draft.name.trim()) {
      return;
    }
    setBusy("open");
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/shops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, locationId: draft.locationId || here?.id || "" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(String(data.error ?? createTranslator("en")("marketUi.error.open")));
        return;
      }
      setOpening(false);
      setDraft({ name: "", kind: "general", size: "village", locationId: "", keeperNpcId: "", stockFromPack: true });
      // A shop started bare opens straight into its shelf.
      if (!draft.stockFromPack && data.shop?.id) {
        setEditing(String(data.shop.id));
      }
      setReload((current) => current + 1);
    } catch {
      setError(createTranslator("en")("marketUi.error.network"));
    } finally {
      setBusy("");
    }
  }

  async function close(shop: ShopView) {
    if (!(await appConfirm(t("marketUi.closeConfirm", { name: shop.name }), { actionLabel: t("marketUi.closeAction"), tone: "danger" }))) {
      return;
    }
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/shops/${shop.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(String(data.error ?? createTranslator("en")("marketUi.error.close")));
        return;
      }
      setReload(current => current + 1);
    } catch {
      setError(createTranslator("en")("marketUi.error.network"));
    }
  }

  const purse = mySheet ? mySheet.gold * 100 + mySheet.copper : 0;
  const coinFx = coins && mySheet && coins.characterId === mySheet.id ? coins : null;

  if (shops === null && loadError) {

    return <LoadFailed error={marketText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} />;

  }

  if (shops === null) {
    return <PanelLoading label={t("marketUi.panel.0")} />;
  }
  return (
    <div className="space-y-2">
      <SectionHead
        title={t("marketUi.panel.1")}
        glyph="tab-market"
        aside={
          mySheet ? (
            <span key={coinFx?.at ?? 0} className="pk-chip relative py-0.5 text-xs text-amber-200">
              <GameIcon icon={{ kind: "glyph", key: "coin-purse" }} size="size-5" /> {marketCoinText(purse, locale)}
              {coinFx ? <span aria-hidden className={cn("coin-arc pointer-events-none absolute -left-3 top-1/2 text-amber-300", coinFx.direction === "out" && "coin-arc-out")}>●</span> : null}
            </span>
          ) : null
        }
      />
      {shops.length && loadError ? <LoadFailed error={marketText(loadError, locale)} onRetry={() => setReload(current => current + 1)} /> : null}
      {here ? <p className="-mt-1 text-xs text-stone-500">{t("marketUi.at", { place: here.name })}</p> : null}
      {error ? <p role="status" className="live-in text-xs text-amber-300/90">{marketText(error, locale)}</p> : null}
      {canPrep ? (
        opening ? (
          <div className="panel reveal flex flex-wrap items-center gap-1.5 rounded-lg p-2.5">
            <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} maxLength={80} placeholder={t("marketUi.panel.2")} aria-label={t("marketUi.panel.3")} className={cn(panelField, "min-w-[9rem] flex-1")} />
            <Select size="sm" label={t("marketUi.panel.4")} value={draft.kind} options={KINDS.map(kind => ({ value: kind as string, label: marketKindLabel(kind, locale) }))} onChange={(kind) => setDraft({ ...draft, kind })} className="pk-w-28" />
            <Select size="sm" label={t("marketUi.panel.5")} value={draft.size} options={SIZES.map(size => ({ value: size as string, label: marketSizeLabel(size, locale) }))} onChange={(size) => setDraft({ ...draft, size })} className="pk-w-24" />
            {places.length ? (
              <Select
                size="sm"
                label={t("marketUi.panel.6")}
                value={draft.locationId || here?.id || ""}
                options={[{ value: "", label: t("marketUi.panel.7") }, ...places.map((place) => ({ value: place.id, label: place.name, icon: { kind: "glyph" as const, key: "tab-map" } }))]}
                onChange={(locationId) => setDraft({ ...draft, locationId })}
                className="min-w-[9rem] flex-1"
              />
            ) : null}
            {keepers.length ? (
              <Select
                size="sm"
                label={t("marketUi.panel.8")}
                value={draft.keeperNpcId}
                options={[{ value: "", label: t("marketUi.panel.9") }, ...keepers.map((npc) => ({ value: npc.id, label: npc.name, icon: { kind: "glyph" as const, key: "system-cast" } }))]}
                onChange={(keeperNpcId) => setDraft({ ...draft, keeperNpcId })}
                className="min-w-[9rem] flex-1"
              />
            ) : null}
            <SettingToggle on={draft.stockFromPack} onToggle={() => setDraft({ ...draft, stockFromPack: !draft.stockFromPack })}>{t("marketUi.panel.10")}</SettingToggle>
            {draft.stockFromPack ? null : <span className="live-in basis-full text-[11px] text-stone-500">{t("marketUi.panel.11")}</span>}
            <KitButton tone="primary" disabled={busy === "open" || !draft.name.trim()} busy={busy === "open"} onClick={() => void open()}>{t("marketUi.panel.12")}</KitButton>
            <KitButton onClick={() => setOpening(false)}>{t("marketUi.panel.13")}</KitButton>
          </div>
        ) : (
          <KitButton onClick={() => setOpening(true)}>
            <Plus className="size-3.5" /> {t("marketUi.openShop", { place: here ? t("marketUi.at", { place: here.name }) : "" })}
          </KitButton>
        )
      ) : null}
      {!shops.length ? (
        loadError ? (
          <LoadFailed error={marketText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} />
        ) : loaded ? (
          <EmptyState size="sm" art="chest" title={here ? t("marketUi.emptyPlace", { place: here.name }) : t(canPrep ? "marketUi.emptyPrep" : "marketUi.emptyParty")} />
        ) : null
      ) : null}
      {shops.map((shop) => {
        const canHaggle = Boolean(mySheet && !shop.haggledBy.includes(mySheet.id));
        const shopItems: ContextMenuItem[] = [
          ...(canHaggle ? [{ id: "haggle", label: t("marketUi.panel.14"), glyph: "skill-persuasion", disabled: Boolean(busy), onSelect: () => void counter(shop, "haggle") }] : []),
          ...(canPrep ? [{ id: "edit", label: t("marketUi.panel.15"), glyph: "ui-edit", separated: canHaggle, onSelect: () => setEditing(shop.id) }] : []),
          ...(canPrep ? [{ id: "close", label: t("marketUi.closeNamed", { name: shop.name }), glyph: "ui-lock", tone: "danger" as const, onSelect: () => void close(shop) }] : []),
        ];
        if (editing === shop.id) {
          return (
            <MarketShopEditor
              key={shop.id}
              campaignId={campaignId}
              shop={shop}
              places={places}
              keepers={keepers}
              onSaved={() => {
                setEditing("");
                setReload((current) => current + 1);
              }}
              onCancel={() => setEditing("")}
            />
          );
        }
        return (
          <section key={shop.id} className="panel @container space-y-2 rounded-lg p-2.5">
            <ContextMenu items={shopItems} label={shop.name} className="group flex items-center gap-2">
              {shop.keeperPortrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shop.keeperPortrait} alt="" className="size-10 rounded-full border border-amber-500/40 object-cover shadow-[0_2px_8px_rgba(4,2,12,0.5)]" />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full border border-amber-500/25 bg-stone-900/70">
                  <GameIcon icon={{ kind: "glyph", key: "tab-shop" }} size="size-7" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="gold-title truncate text-sm">{shop.name}</p>
                <p className="truncate text-[11px] text-stone-500">
                  {marketKindLabel(shop.kind, locale)}
                  {shop.keeperName ? t("marketUi.keeper", { name: shop.keeperName }) : ""}
                  {steersStory && shop.locationName ? t("marketUi.shopPlace", { place: shop.locationName }) : ""}
                  {shop.markup !== 1 ? t("marketUi.prices", { percent: `${shop.markup > 1 ? "+" : ""}${Math.round((shop.markup - 1) * 100)}` }) : ""}
                </p>
              </div>
              {canHaggle ? (
                <KitButton disabled={Boolean(busy)} busy={busy === `${shop.id}:haggle:`} onClick={() => void counter(shop, "haggle")}>{t("marketUi.panel.14")}</KitButton>
              ) : null}
              {canPrep ? (
                <>
                  <KitButton tone="icon" always aria-label={t("marketUi.editNamed", { name: shop.name })} onClick={() => setEditing(shop.id)}>
                    <Pencil className="size-3.5" />
                  </KitButton>
                  <KitButton tone="iconDanger" always aria-label={t("marketUi.closeNamed", { name: shop.name })} onClick={() => void close(shop)}>
                    <Trash2 className="size-3.5" />
                  </KitButton>
                </>
              ) : null}
            </ContextMenu>
            {/* Columns follow the panel, not the window: the side panel is
                narrow on the widest screen, and three columns there left
                no room for a price. */}
            <ul className="stagger-up grid grid-cols-2 gap-1.5 @lg:grid-cols-3">
              {shop.stock.map((line) => {
                const buying = busy === `${shop.id}:buy:${line.itemName}`;
                const cannotBuy = Boolean(busy) || purse < line.askingCp;
                return (
                  <ContextMenu
                    as="li"
                    key={line.itemName}
                    label={referenceDisplayName("equipment", line.itemName, locale)}
                    items={mySheet ? [{ id: "buy", label: t("marketUi.buyFor", { price: marketCoinText(line.askingCp, locale) }), glyph: coinGlyph(line.askingCp), disabled: cannotBuy, onSelect: () => void counter(shop, "buy", line.itemName) }] : []}
                    className="flex flex-col justify-between rounded-lg border border-stone-700/60 bg-stone-900/50 p-2 transition-transform duration-[var(--dur-quick,150ms)] hover:-translate-y-0.5 hover:border-amber-500/40"
                  >
                    <span className="flex min-w-0 items-center gap-1.5 text-xs text-stone-200" title={line.note || referenceDisplayName("equipment", line.itemName, locale)}>
                      <GameIcon icon={{ kind: "item", key: line.itemName, family: "item-gear" }} size="size-7" />
                      <span className="truncate">{referenceDisplayName("equipment", line.itemName, locale)}</span>
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center justify-between gap-1">
                      <span className="pk-chip max-w-full whitespace-normal text-amber-200">
                        <GameIcon icon={{ kind: "glyph", key: coinGlyph(line.askingCp) }} size="size-4" />
                        {marketCoinText(line.askingCp, locale)}
                      </span>
                      <span className="text-[11px] tabular-nums text-stone-500">{t("marketUi.stockCount", { count: line.qty })}</span>
                    </span>
                    {mySheet ? (
                      <KitButton disabled={cannotBuy} busy={buying} onClick={() => void counter(shop, "buy", line.itemName)} className="mt-1.5 w-full justify-center border-amber-500/30 text-amber-100">
                        {buying ? null : t("marketUi.buy")}
                      </KitButton>
                    ) : null}
                  </ContextMenu>
                );
              })}
              {!shop.stock.length ? <li className="col-span-full text-xs italic text-stone-500">{t("marketUi.panel.16")}</li> : null}
            </ul>
            {shop.buys && mySheet?.equipment.length ? (
              <details className="group/sell text-xs">
                <summary className="pk-link pk-tap flex cursor-pointer list-none items-center gap-1">
                  <GameIcon icon={{ kind: "glyph", key: "tab-trade" }} size="size-5" />{t("marketUi.panel.17")}<ChevronDown className="size-3.5 transition-transform group-open/sell:rotate-180" />
                </summary>
                <ul className="stagger mt-1.5 flex flex-wrap gap-1">
                  {mySheet.equipment.map((item) => (
                    <li key={item.name}>
                      <KitButton disabled={Boolean(busy)} onClick={() => void counter(shop, "sell", item.name)}>
                        <GameIcon icon={{ kind: "item", key: item.name, family: "item-gear" }} size="size-4" />
                        {referenceDisplayName("equipment", item.name, locale)}
                        {item.qty > 1 ? t("marketUi.itemCount", { count: item.qty }) : ""}
                      </KitButton>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
