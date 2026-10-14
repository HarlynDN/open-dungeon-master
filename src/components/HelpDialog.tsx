"use client";
import { LocalizedText } from "@/lib/i18n/LocalizedText";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { helpTourView } from "@/lib/i18n/app-help-presentations";
import { catalogFor } from "@/lib/i18n/translator";
import { loadLocaleMessages } from "@/lib/i18n/client-catalogs";
import type { AppLocale } from "@/lib/i18n/locales";
import {
  BookOpen,
  Brain,
  Compass,
  Footprints,
  Crown,
  Dices,
  DoorOpen,
  Gavel,
  MessageSquareText,
  Mic,
  Music,
  PanelRight,
  Puzzle,
  RefreshCw,
  Swords,
  Volume2,
} from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import { HelpContents, ModeRow, Section } from "@/components/HelpParts";
import { ui } from "@/lib/ui";

// HowToPlayDialog and WorkshopHelpDialog import these from here.
export { ModeRow, Section };

// One walkthrough of the whole app: menus, side-panel tabs, composer modes,
// asking the DM, fixing a bad narration, what the DM remembers, dice, voice,
// lead powers and world packs. Opened from the home account menu and the
// in-session header.
function HelpBody({
  open,
  onOpenChange,
  tours,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // The table offers its guided tours from here; each runs once on its own
  // and can be replayed at will. Other pages pass nothing.
  tours?: { label: string; detail: string; onStart: () => void }[];
}) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("appHelp.fragment.0")}
      icon={<GameIcon icon={{ kind: "glyph", key: "tab-story" }} size="size-7" />}
      width="w-[min(94vw,44rem)]"
    >
      <HelpContents withTours={Boolean(tours?.length)} />
      {tours && tours.length ? (
        <Section icon={Footprints} title={t("appHelp.fragment.1")} anchor={"Guided tours"}>
          <p>{t("appHelp.fragment.2")}</p>
          <div className="flex flex-wrap gap-2">
            {tours.map((tour) => {
              const view = helpTourView(tour, locale);
              return <button
                key={tour.label}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  tour.onStart();
                }}
                className={ui.btnSmall}
                title={view.detail}
              >
                <Footprints className="size-4" /> {view.label}
              </button>;
            })}
          </div>
        </Section>
      ) : null}
      <Section icon={Compass} title={t("appHelp.fragment.3")} anchor={"Getting started"}>
        <p>{t("appHelp.fragment.4")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.5")}</span>{t("appHelp.fragment.6")}</p>
        <p>{t("appHelp.fragment.7")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.8")}</span>{t("appHelp.fragment.9")}</p>
      </Section>

      <Section icon={DoorOpen} title={t("appHelp.fragment.10")} anchor={"The lobby"}>
        <p>{t("appHelp.fragment.11")}</p>
      </Section>

      <Section icon={MessageSquareText} title={t("appHelp.fragment.12")} anchor={"Talking to the DM"}>
        <p>{t("appHelp.fragment.13")}</p>
        <ModeRow label={t("appHelp.fragment.14")}>{t("appHelp.fragment.15")}</ModeRow>
        <ModeRow label={t("appHelp.fragment.16")}>{t("appHelp.fragment.17")}</ModeRow>
        <ModeRow label={t("appHelp.fragment.18")}>{t("appHelp.fragment.19")}</ModeRow>
        <ModeRow label={t("appHelp.fragment.20")} lead>{t("appHelp.fragment.21")}<span className="text-stone-300">{t("appHelp.fragment.22")}</span>{t("appHelp.fragment.23")}</ModeRow>
        <p>{t("appHelp.fragment.24")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.25")}</span>{t("appHelp.fragment.26")}<span className="text-stone-300">{t("appHelp.fragment.27")}</span>{t("appHelp.fragment.28")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.29")}</span>{t("appHelp.fragment.30")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.31")}</span>.
        </p>
        <p>{t("appHelp.fragment.32")}</p>
        <p>{t("appHelp.fragment.33")}</p>
      </Section>

      <Section icon={Swords} title={t("appHelp.fragment.34")} anchor={"Your hand in a fight"}>
        <p>{t("appHelp.fragment.35")}</p>
        <p>{t("appHelp.fragment.36")}<span className="text-stone-300">{t("appHelp.fragment.37")}</span>{t("appHelp.fragment.38")}<span className="text-stone-300">{t("appHelp.fragment.39")}</span>{t("appHelp.fragment.40")}</p>
        <p>{t("appHelp.fragment.41")}</p>
      </Section>

      <Section icon={RefreshCw} title={t("appHelp.fragment.42")} anchor={"When the DM gets it wrong"}>
        <p>{t("appHelp.fragment.43")}</p>
        <ul className="list-none space-y-1.5">
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.44")}</span>{t("appHelp.fragment.45")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.46")}</span>{t("appHelp.fragment.47")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.48")}</span>{t("appHelp.fragment.49")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.50")}</span>{t("appHelp.fragment.51")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.52")}</span>{t("appHelp.fragment.53")}</li>
        </ul>
        <p>{t("appHelp.fragment.54")}</p>
      </Section>

      <Section icon={Brain} title={t("appHelp.fragment.55")} anchor={"What the DM remembers"}>
        <p>{t("appHelp.fragment.56")}</p>
        <ul className="list-none space-y-1.5">
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.57")}</span>{t("appHelp.fragment.58")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.59")}</span>{t("appHelp.fragment.60")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.61")}</span>{t("appHelp.fragment.62")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.63")}</span>{t("appHelp.fragment.64")}</li>
        </ul>
        <p>{t("appHelp.fragment.65")}</p>
      </Section>

      <Section icon={PanelRight} title={t("appHelp.fragment.66")} anchor={"The side panel"}>
        <ul className="list-none space-y-1.5">
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.67")}</span>{t("appHelp.fragment.68")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.69")}</span>{t("appHelp.fragment.70")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.71")}</span>{t("appHelp.fragment.72")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.73")}</span>{t("appHelp.fragment.74")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.75")}</span>{t("appHelp.fragment.76")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.77")}</span>{t("appHelp.fragment.78")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.79")}</span>{t("appHelp.fragment.80")}</li>
          <li>
            <span className="text-stone-300">{t("appHelp.fragment.81")}</span>{t("appHelp.fragment.82")}</li>
        </ul>
        <p>
          <LocalizedText message="upstreamUi.helpLayout" values={{layout: <span className="text-stone-300">{t("upstreamUi.helpLabel.layout")}</span>, arrange: <span className="text-stone-300">{t("upstreamUi.helpLabel.arrange")}</span>, lock: <span className="text-stone-300">{t("upstreamUi.helpLabel.lock")}</span>, reset: <span className="text-stone-300">{t("upstreamUi.helpLabel.reset")}</span>}} />
        </p>
      </Section>

      <Section icon={Dices} title={t("appHelp.fragment.83")} anchor={"Dice"}>
        <p>{t("appHelp.fragment.84")}<span className="text-stone-300">{t("appHelp.fragment.85")}</span>{t("appHelp.fragment.86")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.87")}</span>{t("appHelp.fragment.88")}</p>
        <p>{t("appHelp.fragment.89")}<span className="text-stone-300">{t("appHelp.fragment.90")}</span>{t("appHelp.fragment.91")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.92")}</span>{t("appHelp.fragment.93")}</p>
      </Section>

      <Section icon={Volume2} title={t("appHelp.fragment.94")} anchor={"Voice and narration"}>
        <p>{t("appHelp.fragment.95")}</p>
        <p><LocalizedText message="appHelp.dictationKey" values={{key: <span className="text-stone-300">{t("upstreamUi.helpLabel.dictation")}</span>}} /></p>
      </Section>

      <Section icon={Mic} title={t("appHelp.fragment.96")} anchor={"Live voice chat"}>
        <p>{t("appHelp.fragment.97")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.98")}</span>{t("appHelp.fragment.99")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.100")}</span>{t("appHelp.fragment.101")}</p>
        <p>{t("appHelp.fragment.102")}<span className="text-stone-300">{t("appHelp.fragment.103")}</span>{t("appHelp.fragment.104")}</p>
      </Section>

      <Section icon={Music} title={t("appHelp.fragment.105")} anchor={"Ambience and music"}>
        <p>{t("appHelp.fragment.106")}</p>
        <p>{t("appHelp.fragment.107")}</p>
        <p>{t("appHelp.soundLibrary")}</p>
      </Section>

      <Section icon={Gavel} title={t("appHelp.fragment.108")} anchor={"Playing with a human DM"}>
        <p>{t("appHelp.fragment.109")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.110")}</span>{t("appHelp.fragment.111")}</p>
        <p>{t("appHelp.fragment.112")}<span className="text-stone-300">{t("appHelp.fragment.113")}</span>{t("appHelp.fragment.114")}{" "}
          <span className="text-stone-300">{t("appHelp.fragment.115")}</span>{t("appHelp.fragment.116")}</p>
        <p>{t("appHelp.fragment.117")}<span className="text-stone-300">{t("appHelp.fragment.118")}</span>{t("appHelp.fragment.119")}</p>
      </Section>

      <Section icon={Crown} title={t("appHelp.fragment.120")} anchor={"Party lead"}>
        <p>{t("appHelp.fragment.121")}</p>
        <p>{t("appHelp.fragment.122")}</p>
        <p>{t("appHelp.fragment.123")}</p>
        <p>{t("appHelp.fragment.124")}</p>
      </Section>

      <Section icon={Puzzle} title={t("appHelp.fragment.125")} anchor={"Campaign plugins"}>
        <p>{t("appHelp.fragment.126")}<span className="text-stone-300">{t("appHelp.fragment.127")}</span>{t("appHelp.fragment.128")}</p>
        <p>{t("appHelp.fragment.129")}</p>
        <p>{t("appHelp.fragment.130")}</p>
      </Section>

      <Section icon={BookOpen} title={t("appHelp.fragment.131")} anchor={"New to D&D?"}>
        <p>{t("appHelp.fragment.132")}</p>
        <p>{t("appHelp.fragment.133")}{" "}
          <Link href="/reference" className="text-amber-300 underline-offset-2 hover:underline">{t("appHelp.fragment.134")}</Link>{" "}{t("appHelp.fragment.135")}{" "}
          <Link href="/rulebook" className="text-amber-300 underline-offset-2 hover:underline">{t("appHelp.fragment.136")}</Link>{" "}{t("appHelp.fragment.137")}</p>
      </Section>

      <Section icon={BookOpen} title={t("appHelp.fragment.138")} anchor={"About"}>
        <p>{t("appHelp.fragment.139")}{" "}
          <Link href="/licenses" className="text-amber-300 underline-offset-2 hover:underline">{t("appHelp.fragment.140")}</Link>
          .
        </p>
      </Section>
    </Dialog>
  );
}

// Home has no campaign/character content boundary. Load only the chosen help
// locale when opened, and show a translated retry if its chunk cannot arrive.
export function HelpDialog(props: Parameters<typeof HelpBody>[0]) {
  const { locale, t } = useLocale();
  const [readyLocale, setReadyLocale] = useState<AppLocale | null>(() => catalogFor(locale, "appHelp.fragment.0")["appHelp.fragment.0"] ? locale : null);
  const [failedLocale, setFailedLocale] = useState<AppLocale | null>(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!props.open) return;
    let live = true;
    loadLocaleMessages(locale, "help").then(() => {
      if (live) setReadyLocale(locale);
    }).catch(() => {
      if (live) setFailedLocale(locale);
    });
    return () => { live = false; };
  }, [locale, props.open, retry]);
  if (!props.open) return null;
  if (readyLocale === locale) return <HelpBody {...props} />;
  return (
    <Dialog open onOpenChange={props.onOpenChange} title={t("nav.help")} width="w-[min(94vw,44rem)]">
      {failedLocale === locale ? (
        <div role="alert" className="space-y-2 text-sm text-stone-400">
          <p>{t("helpLoading.error")}</p>
          <button type="button" className={ui.btnSmall} onClick={() => { setFailedLocale(null); setRetry(value => value + 1); }}>{t("helpLoading.retry")}</button>
        </div>
      ) : <p role="status" className="text-sm text-stone-400">{t("common.loading")}</p>}
    </Dialog>
  );
}
