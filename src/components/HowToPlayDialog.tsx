"use client";

import {
  CircleHelp,
  Compass,
  Dices,
  Hourglass,
  MessageSquareText,
  RefreshCw,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { ModeRow, Section } from "@/components/HelpParts";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Onboarding read for newcomers: what the app is, how to get a table running,
// who does the maths, and the table etiquette that follows from coalesced DM
// turns. HelpDialog stays the button-by-button reference.
export function HowToPlayDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useLocale();
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("onboarding.title")}
      icon={<ScrollText className="size-5 text-amber-500/80" />}
      width="w-[min(94vw,44rem)]"
    >
      <Section icon={Sparkles} title={t("onboarding.whatTitle")}>
        <p>{t("onboarding.what")}</p>
        <p>{t("onboarding.world")}</p>
      </Section>

      <Section icon={Compass} title={t("onboarding.startTitle")}>
        <p>{t("onboarding.create")}</p>
        <p>{t("onboarding.join")}</p>
        <p>{t("onboarding.character")}</p>
      </Section>

      <Section icon={Dices} title={t("onboarding.rulesTitle")}>
        <p>{t("onboarding.rules")}</p>
        <p>{t("onboarding.log")}</p>
      </Section>

      <Section icon={MessageSquareText} title={t("onboarding.turnTitle")}>
        <p>{t("onboarding.modeHint")}</p>
        <ModeRow label={t("composer.modeDo")}>{t("onboarding.do")}</ModeRow>
        <ModeRow label={t("composer.modeSay")}>{t("onboarding.say")}</ModeRow>
        <ModeRow label={t("composer.modeOoc")}>{t("onboarding.ooc")}</ModeRow>
        <p>{t("onboarding.ask")}</p>
      </Section>

      <Section icon={Hourglass} title={t("onboarding.queueTitle")}>
        <p>{t("onboarding.queue")}</p>
        <p>{t("onboarding.coordinate")}</p>
        <p>{t("onboarding.spotlight")}</p>
      </Section>

      <Section icon={RefreshCw} title={t("onboarding.fixTitle")}>
        <p>{t("onboarding.fix")}</p>
        <p>{t("onboarding.bookmark")}</p>
      </Section>

      <Section icon={CircleHelp} title={t("onboarding.helpTitle")}>
        <p>{t("onboarding.help")}</p>
      </Section>
    </Dialog>
  );
}
