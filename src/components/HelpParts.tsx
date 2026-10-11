"use client";

import { HELP_TOPICS } from "@/lib/i18n/app-help-metadata";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Search, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { GameIcon } from "@/components/ui/GameIcon";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";

function sectionId(title: string): string {
  return `help-${title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "")}`;
}

// Exported (through HelpDialog) for HowToPlayDialog, which is the short orientation read to this
// dialog's full reference. Both used to carry byte-identical private copies,
// so a styling change had to be made twice or the two drifted apart.
export function Section({
  icon: Icon,
  title,
  anchor = title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  // Defaults preserve existing callers; main-help anchors stay canonical.
  anchor?: string;
  children: ReactNode;
}) {
  const glyph = HELP_TOPICS.find(topic => topic.canonical === anchor)?.glyph;
  return (
    <section id={sectionId(anchor)} className="mb-6 scroll-mt-4 last:mb-0">
      {/* The kit heading's classes with either a painted glyph or, for the
          dialogs that have none, the line icon they always passed. */}
      <header className="section-head">
        {glyph ? (
          <GameIcon icon={{ kind: "glyph", key: glyph }} size="size-7" className="shrink-0" />
        ) : (
          <Icon className="size-4 shrink-0 text-amber-500/80" />
        )}
        <h3 className="section-head-title">{title}</h3>
        <span className="section-head-rule motion-rule" aria-hidden="true" />
      </header>
      <div className="space-y-2 text-sm leading-relaxed text-stone-400">{children}</div>
    </section>
  );
}

export function ModeRow({
  label,
  lead,
  children,
}: {
  label: string;
  lead?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={
          lead
            ? "mt-0.5 w-14 shrink-0 rounded-full bg-gradient-to-b from-ember-400 to-ember-600 px-2 py-0.5 text-center text-xs font-medium text-stone-950"
            : "mt-0.5 w-14 shrink-0 rounded-full bg-gradient-to-b from-amber-100 to-amber-400 px-2 py-0.5 text-center text-xs font-medium text-amber-950"
        }
      >
        {label}
      </span>
      <span>{children}</span>
    </div>
  );
}


// Contents: every section one tap away, narrowed by the field.
export function HelpContents({ withTours }: { withTours: boolean }) {
  const { t } = useLocale();
  const [find, setFind] = useState("");
  const needle = find.trim().toLowerCase();
  const contents = HELP_TOPICS.map(topic => ({ ...topic, title: t(topic.key) })).filter(
    topic => (topic.canonical !== "Guided tours" || withTours) && (!needle || topic.title.toLowerCase().includes(needle) || topic.canonical.toLowerCase().includes(needle)),
  );
  return (
    <nav aria-label={t("appHelp.contents.label")} className="mb-5">
      <div className="relative mb-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-amber-300/70" />
        <input
          value={find}
          onChange={(event) => setFind(event.target.value)}
          placeholder={t("appHelp.contents.placeholder")}
          aria-label={t("appHelp.contents.searchLabel")}
          className={cn(ui.input, "h-10 pl-9")}
        />
      </div>
      <div className="stagger-pop flex flex-wrap gap-1.5">
        {contents.map((topic) => (
          <button
            key={topic.canonical}
            type="button"
            onClick={() => {
              const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              document.getElementById(sectionId(topic.canonical))?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
            }}
            className="motion-press inline-flex min-h-9 items-center gap-1.5 rounded-full border border-stone-700/70 py-0.5 pl-1 pr-3 text-xs text-stone-300 hover:border-amber-500/40 hover:text-amber-100"
          >
            <GameIcon icon={{ kind: "glyph", key: topic.glyph }} size="size-6" />
            {topic.title}
          </button>
        ))}
        {!contents.length ? <p className="text-xs text-stone-500">{t("appHelp.contents.empty")}</p> : null}
      </div>
    </nav>
  );
}
