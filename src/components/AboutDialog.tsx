"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";
import { Check, Copy, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import type { BuildInfo, UpdateStatus } from "@/lib/build-info";
import { cn } from "@/lib/cn";
import { shellHost } from "@/lib/shell-host";
import { ui } from "@/lib/ui";

// About this server (issue 102): the release it runs, the exact build behind
// that number, and whether a newer release is out. It exists so "is the fix
// in what I am running?" can be answered from the browser, and so a problem
// can be reported with the build it happened on: the Copy button puts that
// on the clipboard in the shape an issue wants.

type About = {
  serverName: string;
  build: BuildInfo;
  update: UpdateStatus;
  repositoryUrl: string;
  canRecheck: boolean;
};

function day(iso: string, locale: AppLocale): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(locale === "en" ? undefined : locale, { year: "numeric", month: "long", day: "numeric" });
}

function moment(iso: string, locale: AppLocale): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString(locale === "en" ? undefined : locale, { dateStyle: "medium", timeStyle: "short" });
}

// The build in a sentence: what the label's metadata means, for someone who
// does not read git.
function buildLine(build: BuildInfo, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (!build.known) {
    return t("aboutUi.unknownBuild");
  }
  const where = build.release
    ? t("aboutUi.release", { tag: build.tag })
    : build.tag.replace(/^v/, "") === build.version && build.ahead > 0
      ? t(build.ahead === 1 ? "aboutUi.aheadOne" : "aboutUi.aheadMany", { count: build.ahead, tag: build.tag })
      : build.tag.replace(/^v/, "") === build.version
        ? t("aboutUi.based", { tag: build.tag })
        : t("aboutUi.development");
  return build.dirty ? t("aboutUi.dirty", { where }) : where;
}

function reportText(about: About): string {
  const { build, update } = about;
  const inApp = shellHost() ? "yes" : "no";
  return [
    `Open Dungeon Master ${build.label}`,
    `Commit: ${build.commit || "unknown"}${build.dirty ? " (with uncommitted changes)" : ""}`,
    `Built: ${build.builtAt || "unknown"}`,
    `Latest release: ${"latest" in update ? update.latest.version : update.state === "off" ? "not checked" : "could not check"}`,
    `Inside the desktop or Android app: ${inApp}`,
    `Browser: ${navigator.userAgent}`,
  ].join("\n");
}

// Null when the server could not be asked. `fresh` has it look for a newer
// release again now (an admin's button) instead of using its kept answer.
async function ask(fresh: boolean): Promise<About | null> {
  try {
    const response = await fetch(`/api/about${fresh ? "?fresh=1" : ""}`, { cache: "no-store" });
    return response.ok ? ((await response.json()) as About) : null;
  } catch {
    return null;
  }
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-stone-800/70 py-2 first:border-t-0">
      <dt className="eyebrow shrink-0 text-[10px] text-stone-500">{label}</dt>
      <dd className="min-w-0 break-words text-right text-sm text-stone-200">{children}</dd>
    </div>
  );
}

function UpdateLine({ update, build }: { update: UpdateStatus; build: BuildInfo }) {
  const { t, locale } = useLocale();
  if (update.state === "off") {
    return (
      <p className="text-sm text-stone-400">
        {update.reason === "device_world"
          ? t("aboutUi.device")
          : t("aboutUi.off")}
      </p>
    );
  }
  if (update.state === "unknown") {
    return <p className="text-sm text-stone-400">{t("aboutUi.github")}</p>;
  }
  const { latest } = update;
  const released = day(latest.publishedAt, locale);
  if (update.state === "available") {
    return (
      <div className="live-in rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2.5">
        <p className="text-sm text-amber-100">
          {t("aboutUi.available", { latest: latest.version, current: build.version, date: released ? ` (${released})` : "" })}
        </p>
        <a href={latest.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-amber-300 underline-offset-2 hover:underline">
          {t("aboutUi.whatsNew", { version: latest.version })} <ExternalLink className="size-3" />
        </a>
        <p className="mt-1 text-xs text-stone-400">{t("aboutUi.operator")}</p>
      </div>
    );
  }
  return (
    <p className="flex items-center gap-1.5 text-sm text-stone-200">
      <Check className="size-4 shrink-0 text-emerald-500" />
      {update.state === "ahead"
        ? t("aboutUi.aheadLatest", { version: latest.version })
        : t("aboutUi.upToDate", { version: latest.version })}
    </p>
  );
}

export function AboutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t, locale } = useLocale();
  const [about, setAbout] = useState<About | null>(null);
  const [failed, setFailed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Asked each time the dialog opens: it is opened to learn what is running
  // now, and a server may have been updated since the page was loaded.
  useEffect(() => {
    if (!open) {
      return;
    }
    let live = true;
    void ask(false).then((answer) => {
      if (live) {
        setAbout(answer ?? null);
        setFailed(answer === null);
      }
    });
    return () => {
      live = false;
    };
  }, [open]);

  async function copy() {
    if (!about) return;
    try {
      await navigator.clipboard.writeText(reportText(about));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard here (an insecure address): the details stay on screen.
    }
  }

  const build = about?.build;
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("aboutUi.title")}
      icon={<GameIcon icon={{ kind: "glyph", key: "system-rules" }} size="size-6" />}
      width="w-[min(92vw,30rem)]"
    >
      {!about || !build ? (
        <p className="flex items-center gap-2 text-sm text-stone-400" role="status">
          {failed ? t("aboutUi.failed") : <><Loader2 className="size-4 animate-spin" /> {t("aboutUi.asking")}</>}
        </p>
      ) : (
        <div className="reveal space-y-4">
          <div>
            <p className="gold-title font-display text-xl tracking-wide">Open Dungeon Master</p>
            <p className="mt-0.5 text-sm text-stone-300">
              {t("aboutUi.version")}<span className="font-mono text-amber-100">{build.version}</span>
              {about.serverName && about.serverName !== "Open Dungeon Master" ? <span className="text-stone-500">{t("aboutUi.on", { name: about.serverName })}</span> : null}
            </p>
          </div>

          <UpdateLine update={about.update} build={build} />

          <dl className="rounded-lg border border-stone-700/60 bg-stone-900/40 px-3">
            <Row label={t("aboutUi.build")}>
              <span className="font-mono text-[13px]">{build.label}</span>
            </Row>
            {build.shortCommit ? (
              <Row label={t("aboutUi.commit")}>
                <a
                  href={`${about.repositoryUrl}/commit/${build.commit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[13px] text-amber-200 underline-offset-2 hover:underline"
                >
                  {build.shortCommit} <ExternalLink className="size-3" />
                </a>
              </Row>
            ) : null}
            {build.builtAt ? <Row label={t("aboutUi.built")}>{moment(build.builtAt, locale)}</Row> : null}
            {"checkedAt" in about.update ? <Row label={t("aboutUi.checked")}>{moment(about.update.checkedAt, locale)}</Row> : null}
          </dl>
          <p className={cn("text-xs leading-relaxed", build.dirty ? "text-amber-300/90" : "text-stone-500")}>{buildLine(build, locale)}</p>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => void copy()} className={cn(ui.btnSmall, "gap-1.5")}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? t("aboutUi.copied") : t("aboutUi.copy")}
            </button>
            {about.canRecheck && about.update.state !== "off" ? (
              <button
                type="button"
                disabled={checking}
                onClick={async () => {
                  setChecking(true);
                  const answer = await ask(true);
                  if (answer) {
                    setAbout(answer);
                  }
                  setChecking(false);
                }}
                className={cn(ui.btnSmall, "gap-1.5")}
              >
                <RefreshCw className={cn("size-3.5", checking && "animate-spin")} /> {t("aboutUi.again")}
              </button>
            ) : null}
          </div>
          {shellHost() ? (
            <p className="text-xs text-stone-500">{t("aboutUi.server")}</p>
          ) : null}
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <a href={`${about.repositoryUrl}/releases`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-stone-400 underline-offset-2 hover:text-amber-200 hover:underline">
              {t("aboutUi.releaseNotes")} <ExternalLink className="size-3" />
            </a>
            <a href={`${about.repositoryUrl}/issues`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-stone-400 underline-offset-2 hover:text-amber-200 hover:underline">
              {t("aboutUi.report")} <ExternalLink className="size-3" />
            </a>
          </p>
        </div>
      )}
    </Dialog>
  );
}
