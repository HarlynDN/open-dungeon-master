import type { GameSettings } from "../schemas/game-settings.ts";
import { genreLabel } from "./settings.ts";
import { createTranslator } from "./translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";

export function hpMethodLabel(method: GameSettings["hpMethod"], locale: AppLocale = DEFAULT_LOCALE) {
  const t = createTranslator(locale);
  return t(method === "rolled" ? "panel.hpRolled" : method === "max" ? "panel.hpMax" : "panel.hpAverage");
}

export function wealthLabel(method: GameSettings["startingWealth"], locale: AppLocale = DEFAULT_LOCALE) {
  return createTranslator(locale)(method === "rolled" ? "panel.wealthRolled" : "panel.wealthEquipment");
}

// A language switch projects server settings; it never rewrites them. Pack
// names and custom voices are supplied unchanged by their respective owners.
export function gameSettingsSummary(settings: GameSettings, voiceName: string, packName?: string, locale: AppLocale = DEFAULT_LOCALE) {
  const t = createTranslator(locale);
  const world = [packName ?? genreLabel(settings.genre, locale)];
  if (settings.dmMode === "human") world.push(t("panel.humanDm"));
  if (settings.dmMode === "steered") world.push(t("panel.steeredDm"));
  if (settings.dmMode !== "human") {
    if (settings.aiStorySetup) world.push(t("panel.aiStory"));
    world.push(t(settings.campaignLength === "short" ? "panel.shortCampaign" : settings.campaignLength === "epic" ? "panel.epicCampaign" : "panel.standardCampaign"));
  }
  return {
    world: world.join(" · "),
    dice: t(settings.dicePolicy === "real_allowed" ? "panel.realAllowed" : "panel.digitalSummary"),
    narration: settings.ttsEnabled ? t("panel.narrationOn", { voice: voiceName }) : t("panel.narrationOff"),
    ambience: t(!settings.ambienceEnabled ? "panel.ambienceOff" : settings.ambienceAuto ? "panel.ambienceAuto" : "panel.ambienceOn"),
    maps: t(settings.mapsEnabled ? "panel.mapsOn" : "panel.mapsOff"),
    multiclassing: t(settings.multiclassingEnabled ? "panel.multiAllowed" : "panel.multiOff"),
    hp: hpMethodLabel(settings.hpMethod, locale),
    wealth: wealthLabel(settings.startingWealth, locale),
    joining: t(settings.midGameJoinOpen ? "panel.joinOpen" : "panel.joinClosed"),
    responses: t(settings.holdSubmissions ? "panel.responseHeld" : "panel.responseOpen"),
    worldSimulation: t(settings.worldSimulation ? "panel.livingOn" : "panel.livingOff"),
    approvals: t(settings.inventoryApprovals ? settings.vitalsApprovals ? "panel.approvalsBoth" : "panel.approvalsItems" : settings.vitalsApprovals ? "panel.approvalsVitals" : "panel.approvalsNeither"),
    bonds: t(settings.relationships === "off" ? "panel.bondsOff" : settings.romance !== "off" ? "panel.bondsRomance" : "panel.bondsOnly"),
    companions: t("panel.companionSummary", { mode: t(`setting.companions.${settings.companions}`) }),
  };
}
