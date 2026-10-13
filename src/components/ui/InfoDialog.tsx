"use client";

import { scopeQuery, useContentCampaign } from "@/lib/content-scope";
import { Info, Loader2 } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { GameIcon } from "@/components/ui/GameIcon";
import type { IconRef } from "@/lib/icons";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Dialog } from "@/components/ui/Dialog";
import type { ItemHelpResult } from "@/lib/help/load-item-help";
import type { ItemSheet } from "@/lib/help/item-sheet";
import { firstSentence, parseRulesBlocks } from "@/lib/help/rules-text";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { nativeFeatHelp } from "@/lib/i18n/feature-material-presentations";
import { nativeArchetypeHelp } from "@/lib/i18n/calling-material-presentations";
import { itemSheetView } from "@/lib/i18n/equipment-help-presentations";
import { nativeSpellHelp } from "@/lib/i18n/spell-help-presentations";
import { nativeItemHelp } from "@/lib/i18n/magic-item-material-presentations";

// The "what does this do?" affordance, used everywhere a game term appears.
//
// Built on the shared Dialog rather than a popover on purpose: Radix tooltips
// never open on a touch tap, and the session layout is used on phones. A
// dialog behaves identically with a mouse, a finger and a keyboard.
//
// Text can be passed directly (features, glossary terms) or fetched lazily
// from the content pack by {kind, slug} for spells, feats and items, which is
// what /api/content/[kind]/[slug] was built for.

// `name` lets the lookup recover when a row's slug is not the plain
// slugified name (third-party documents pick their own), by falling back to
// a search.
export type ContentRef = { kind: string; slug: string; name?: string };

// Content-pack descriptions are markdown-ish: headings, bold, italics, tables.
// The block structure comes from src/lib/help/rules-text.ts, which knows the
// pack's quirks; this only turns each block into elements. Table rows keep
// their pipes inside a monospace block.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|(?<![\w])_[^_\n]+_(?![\w]))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      out.push(text.slice(last, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-${index}`;
    index += 1;
    if (token.startsWith("**")) {
      out.push(
        <strong key={key} className="font-medium text-stone-200">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      out.push(
        <em key={key} className="text-stone-300">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    out.push(text.slice(last));
  }
  return out;
}

export function renderRules(text: string): ReactNode {
  return parseRulesBlocks(text).map((block, blockIndex) => {
    switch (block.kind) {
      case "table":
        return (
          <pre
            key={blockIndex}
            className="overflow-x-auto rounded-md bg-stone-900/60 p-2 text-[11px] leading-relaxed text-stone-400"
          >
            {block.rows.join("\n")}
          </pre>
        );
      case "list":
        return (
          <ul key={blockIndex} className="list-disc space-y-1 pl-4">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{renderInline(item, `${blockIndex}-${itemIndex}`)}</li>
            ))}
          </ul>
        );
      case "heading":
        // A heading line becomes a small label rather than showing its hashes.
        return (
          <p key={blockIndex} className="reveal mb-1 text-xs font-medium uppercase tracking-wide text-amber-200/80">
            {block.text}
          </p>
        );
      default:
        return <p key={blockIndex}>{renderInline(block.text, String(blockIndex))}</p>;
    }
  });
}

// Loads a content-pack entry's description on first open, so opening a sheet
// with forty spells on it costs nothing until one is actually inspected.
function ContentBody({ reference }: { reference: ContentRef }) {
  const { locale, t } = useLocale();
  // The table the dialog opened at reads its DMs' homebrew.
  const campaignId = useContentCampaign();
  const [state, setState] = useState<{ text: string | null; display?: { locale: string; source: string; text: string }; loading: boolean; name?: string; source?: string; documentSlug?: string; classId?: string; for?: string; failed?: boolean }>({
    text: null,
    loading: true,
  });

  const [attempt, setAttempt] = useState(0);
  const requestKey = JSON.stringify([reference.kind, reference.slug, reference.name, campaignId, attempt, locale]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { describeContentEntry } = await import("@/lib/help");
        const response = await fetch(
          `/api/content/${reference.kind}/${encodeURIComponent(reference.slug)}?localized=1&locale=${encodeURIComponent(locale)}${scopeQuery(campaignId, "&")}`,
        );
        if (response.ok) {
          const data = await response.json();
          const text = describeContentEntry(data?.entry?.data, { includeHigherLevels: reference.kind === "spells", includeMonsterActions: reference.kind === "monsters" });
          if (text) {
            if (!cancelled) {
              setState({ for: requestKey, text, display: data?.entry?.display, name: data?.entry?.name, source: data?.entry?.source,
                documentSlug: data?.entry?.documentSlug,
                classId: typeof data?.entry?.data?.class === "string" ? data.entry.data.class : undefined, loading: false });
            }
            return;
          }
        }
        // The slug guessed from the name missed, or the row it found carries
        // no text. Search by name and take an exact match.
        const wanted = (reference.name ?? reference.slug).trim().toLowerCase();
        const search = await fetch(
          `/api/content/${reference.kind}?q=${encodeURIComponent(wanted)}&limit=20&mechanics=1&localized=1&locale=${encodeURIComponent(locale)}${scopeQuery(campaignId, "&")}`,
        );
        if (!search.ok) {
          if (!cancelled) setState({ for: requestKey, text: null, loading: false, failed: true });
          return;
        }
        const results = (await search.json()).results ?? [];
        const hit = results.find(
          (entry: { name: string; source?: string; documentSlug?: string; data?: Record<string, unknown> }) => entry.name.trim().toLowerCase() === wanted,
        );
        if (!cancelled) {
          setState({ for: requestKey, text: describeContentEntry(hit?.data, { includeHigherLevels: reference.kind === "spells", includeMonsterActions: reference.kind === "monsters" }), display: hit?.display, name: hit?.name, source: hit?.source,
            documentSlug: hit?.documentSlug,
            classId: typeof hit?.data?.class === "string" ? hit.data.class : undefined, loading: false });
        }
      } catch {
        if (!cancelled) {
          setState({ for: requestKey, text: null, loading: false, failed: true });
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reference.kind, reference.slug, reference.name, campaignId, attempt, requestKey, locale]);

  if (state.for !== requestKey || state.loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-stone-500">
        <Loader2 className="size-4 animate-spin" /> {t("itemHelp.loading")}
      </p>
    );
  }
  if (state.failed) return <p role="alert" className="text-sm text-amber-200">{t("pickerFlow.helpFailed")} <button type="button" onClick={() => setAttempt(value => value + 1)} className="underline">{t("pickerFlow.retry")}</button></p>;
  if (!state.text) {
    return (
      <p className="text-sm text-stone-500">
        {t("itemHelp.noDescription")}
      </p>
    );
  }
  let text = state.text;
  if (state.display?.locale === locale && state.display.source === text) return <>{renderRules(state.display.text)}</>;
  if (reference.kind === "feats" && state.source !== "homebrew") text = nativeFeatHelp(state.name ?? reference.name, text, locale) ?? text;
  else if (reference.kind === "archetypes" && state.classId) text = nativeArchetypeHelp(state.classId, state.name ?? reference.name ?? "", text, locale, state);
  else if (reference.kind === "spells") text = nativeSpellHelp({ ...state, name: state.name ?? reference.name }, text, locale) ?? text;
  else if (reference.kind === "items") text = nativeItemHelp({ ...state, name: state.name ?? reference.name }, text, locale) ?? text;
  return <>{renderRules(text)}</>;
}

function StatTile({ label, value, note }: { label: string; value: string | null; note?: string | null }) {
  return (
    <div className="rounded-md border border-stone-800 bg-stone-900/60 px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wider text-stone-500">{label}</p>
      <p className={cn("font-display text-base leading-tight", value ? "text-amber-100" : "text-stone-600")}>
        {value ?? "—"}
      </p>
      {note ? <p className="text-[11px] leading-tight text-stone-400">{note}</p> : null}
    </div>
  );
}

function ItemSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wide text-amber-200/80">{title}</p>
      {children}
    </section>
  );
}

function RuleList({ rows }: { rows: Array<{ label: string; text: string | null }> }) {
  return (
    <dl className="space-y-1.5">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
          <dt className="shrink-0 font-medium text-stone-200 sm:w-32">{row.label}</dt>
          <dd className="text-stone-400">{row.text ?? ""}</dd>
        </div>
      ))}
    </dl>
  );
}

// The item card: what it is, weight and value always on show, then the
// armour or weapon stats, then the long text when there is any. The facts
// come from every row that shares the name plus the bundled SRD tables
// (src/lib/help/item-sheet.ts), so a v1 table row with no prose, a v2 gear
// row with no stats and a genre item the pack lacks all get a full card.
function ItemBody({ reference }: { reference: ContentRef }) {
  const campaignId = useContentCampaign();
  // Remount on identity/scope changes before effects run; locale changes retain
  // the same key and project already-loaded original text.
  return <ItemDetails key={JSON.stringify([reference.slug, reference.name, campaignId])} reference={reference} campaignId={campaignId} />;
}

function ItemDetails({ reference, campaignId }: { reference: ContentRef; campaignId: string | null }) {
  const { locale, t } = useLocale();
  const [state, setState] = useState<Partial<ItemHelpResult> & { sheet: ItemSheet | null; loading: boolean }>({
    sheet: null,
    loading: true,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    async function load() {
      try {
        const { loadItemHelp } = await import("@/lib/help/load-item-help");
        const result = await loadItemHelp({ slug: reference.slug, name: reference.name }, campaignId, controller.signal);
        if (!cancelled) setState({ ...result, loading: false });
      } catch {
        if (!cancelled) setState({ sheet: null, loading: false, failed: true });
      }
    }
    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [reference.slug, reference.name, campaignId, attempt]);

  if (state.loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-stone-500">
        <Loader2 className="size-4 animate-spin" /> {t("itemHelp.loading")}
      </p>
    );
  }
  const failure = state.failed ? <p role="alert" className="text-sm text-amber-200">{t("pickerFlow.helpFailed")} <button type="button" onClick={() => {
    setState({ sheet: null, loading: true });
    setAttempt(value => value + 1);
  }} className="underline">{t("pickerFlow.retry")}</button></p> : null;
  const sheet = state.sheet ? itemSheetView(state.sheet, locale, state.descriptionOwner ?? { name: reference.name }) : null;
  if (!sheet) {
    if (failure) return failure;
    return (
      <p className="text-sm text-stone-500">
        {t("itemHelp.noDetails")}
      </p>
    );
  }

  const tags = [
    sheet.rarity,
    sheet.attunement ? t("itemHelp.attunement") : null,
    sheet.bonus ? t("itemHelp.magicBonus", { bonus: sheet.bonus }) : null,
  ].filter((tag): tag is string => Boolean(tag));
  const tiles: Array<{ label: string; value: string | null; note?: string | null }> = [
    { label: t("itemHelp.weight"), value: sheet.weight },
    { label: t("itemHelp.value"), value: sheet.cost },
  ];
  if (sheet.armor) {
    tiles.push({ label: sheet.armor.shield ? t("itemHelp.acBonus") : t("itemHelp.ac"), value: sheet.armor.ac });
  }
  if (sheet.weapon) {
    tiles.push({
      label: t("itemHelp.damage"),
      value: sheet.weapon.damage ?? t("itemHelp.none"),
      note: sheet.weapon.damageType,
    });
    if (sheet.weapon.range) {
      tiles.push({ label: t("itemHelp.range"), value: sheet.weapon.range });
    }
  }

  const armorRows: Array<{ label: string; text: string | null }> = [];
  if (sheet.armor) {
    if (sheet.armor.shield) {
      armorRows.push({ label: t("itemHelp.shield"), text: t("itemHelp.shieldRule") });
    }
    if (sheet.armor.dex) {
      armorRows.push({ label: t("itemHelp.dexterity"), text: sheet.armor.dex });
    }
    armorRows.push({
      label: t("itemHelp.strength"),
      text: sheet.armor.strength
        ? t("itemHelp.strengthRule", { strength: sheet.armor.strength })
        : t("itemHelp.noMinimum"),
    });
    armorRows.push({
      label: t("itemHelp.stealth"),
      text: sheet.armor.stealthDisadvantage
        ? t("itemHelp.stealthRule")
        : t("itemHelp.noPenalty"),
    });
  }
  const weaponRows: Array<{ label: string; text: string | null }> = [];
  if (sheet.weapon) {
    if (sheet.bonus) {
      weaponRows.push({ label: t("itemHelp.weaponBonus", { bonus: sheet.bonus }), text: t("itemHelp.weaponBonusRule", { bonus: sheet.bonus }) });
    }
    for (const property of sheet.weapon.properties) {
      weaponRows.push({ label: property.name, text: property.blurb });
    }
    if (sheet.weapon.damageType && sheet.weapon.damageBlurb) {
      weaponRows.push({ label: `${capitalize(sheet.weapon.damageType)}`, text: sheet.weapon.damageBlurb });
    }
    if (!sheet.weapon.damage) {
      weaponRows.push({ label: t("itemHelp.noDamage"), text: t("itemHelp.noDamageRule") });
    }
  }

  return (
    <div className="space-y-4">
      {failure}
      {sheet.type || tags.length ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {sheet.type ? <span className="text-sm font-medium text-stone-200">{sheet.type}</span> : null}
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-amber-200/20 bg-amber-200/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-200/80"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))]">
        {tiles.map((tile) => (
          <StatTile key={tile.label} {...tile} />
        ))}
      </div>
      {armorRows.length ? (
        <ItemSection title={t("itemHelp.armor")}>
          <RuleList rows={armorRows} />
        </ItemSection>
      ) : null}
      {weaponRows.length ? (
        <ItemSection title={t("itemHelp.weapon")}>
          <RuleList rows={weaponRows} />
        </ItemSection>
      ) : null}
      {sheet.description ? (
        <ItemSection title={t("itemHelp.description")}>
          <div className="space-y-2 border-t border-stone-800 pt-2">{renderRules(sheet.description)}</div>
        </ItemSection>
      ) : null}
    </div>
  );
}

function capitalize(text: string): string {
  return text ? text[0].toUpperCase() + text.slice(1) : text;
}

// The ⓘ button plus its dialog. `label` names the thing; `text` is its
// description, or omit it and pass `reference` to fetch one.
export function InfoButton({
  label,
  ariaLabel,
  text,
  reference,
  meta,
  note,
  className,
  size = "sm",
}: {
  label: string;
  // Some callers supply a complete question as the dialog title.
  ariaLabel?: string;
  text?: string | null;
  reference?: ContentRef;
  // A short line under the title: spell level and school, feature level, and
  // so on.
  meta?: string;
  // A rules line read before the entry itself, whichever way the entry
  // loads: how much of a spell the server settles (src/lib/srd/spell-support.ts).
  note?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  // Nothing to say and nothing to look up: render no control at all rather
  // than a button that opens an empty box.
  if (!text?.trim() && !reference) {
    return null;
  }
  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        data-info-trigger
        aria-label={ariaLabel ?? t("field.whatIs", { label })}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:text-amber-200",
          className,
        )}
      >
        <Info className={size === "md" ? "size-4" : "size-3.5"} />
      </button>
      <InfoDialog
        open={open}
        onOpenChange={setOpen}
        title={label}
        meta={meta}
        note={note}
        text={text}
        reference={reference}
      />
    </>
  );
}

// A list of named things, each with its own ⓘ. Replaces the comma-joined
// strings the sheets used to print for features, feats and spells.
export function InfoChipList({
  items,
  emptyText,
}: {
  items: Array<{
    // Stable identity when the display name changes with the viewer locale.
    id?: string;
    name: string;
    text?: string | null;
    meta?: string;
    reference?: ContentRef;
    // Rendered after the name, e.g. "(story)" for a feature the DM granted.
    note?: string;
    // The painted icon that leads the chip, when the thing has one.
    icon?: IconRef;
  }>;
  emptyText?: string;
}) {
  const { t } = useLocale();
  if (!items.length) {
    return emptyText ? <p className="text-xs text-stone-500">{emptyText}</p> : null;
  }
  return (
    <div className="stagger-pop flex flex-wrap gap-1.5">
      {items.map((item) => {
        const line = firstLine(item.text);
        return (
          <span key={item.id ?? item.name} className="info-chip">
            <Tooltip
              content={
                <span className="flex items-start gap-2.5">
                  {item.icon ? <GameIcon icon={item.icon} size="size-12" className="shrink-0" /> : null}
                  <span className="min-w-0">
                    <span className="block font-display text-[13px] tracking-wide text-amber-100">{item.name}</span>
                    {item.meta ? <span className="block text-[10px] uppercase tracking-wider text-stone-500">{item.meta}</span> : null}
                    <span className="mt-0.5 block text-stone-300">{line ?? t("itemHelp.openEntry")}</span>
                  </span>
                </span>
              }
            >
              <span className="flex min-w-0 items-center gap-1.5" tabIndex={-1}>
                {item.icon ? <GameIcon icon={item.icon} size="size-8" /> : null}
                <span className="truncate">{item.name}</span>
                {item.note ? <span className="text-stone-500">{item.note}</span> : null}
              </span>
            </Tooltip>
            <InfoButton
              label={item.name}
              meta={item.meta}
              text={item.text}
              reference={item.reference}
            />
          </span>
        );
      })}
    </div>
  );
}

// The first sentence of a write-up, for the hover preview, markdown removed.
function firstLine(text: string | null | undefined): string | null {
  return firstSentence(text);
}

export function InfoDialog({
  open,
  onOpenChange,
  title,
  meta,
  note,
  text,
  reference,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  meta?: string;
  note?: string;
  text?: string | null;
  reference?: ContentRef;
  children?: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title} width="w-[min(92vw,32rem)]">
      {meta ? (
        <p className="reveal mb-3 text-xs uppercase tracking-wide text-amber-200/70">{meta}</p>
      ) : null}
      <div className="space-y-2 text-sm leading-relaxed text-stone-400">
        {note ? <div className="rounded border border-amber-300/20 bg-amber-300/5 px-2.5 py-1.5 text-stone-300">{renderRules(note)}</div> : null}
        {text?.trim() ? (
          renderRules(text)
        ) : reference?.kind === "items" ? (
          <ItemBody reference={reference} />
        ) : reference ? (
          <ContentBody reference={reference} />
        ) : null}
        {children}
      </div>
    </Dialog>
  );
}
