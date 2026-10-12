import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { Skin } from "../battlemap/skins.ts";
import { explainReadFacts, type ForgeSettings, type HintRead } from "../../app/workshop/maps/forge.ts";

export function mapForgeExplanation(read: HintRead, settings: Pick<ForgeSettings, "theme" | "ambient">, locale: AppLocale): string[] {
  const t = createTranslator(locale);
  return explainReadFacts(read, settings).map(fact => {
    switch (fact.kind) {
      case "themeOverride": case "themeWord": case "setting": case "lightDefault":
        return t(`mapForgeUi.explain.${fact.kind}`, { theme: t(`mapInspectUi.theme.${fact.theme}`).toLowerCase(), word: "word" in fact ? fact.word : "" });
      case "field": return t("mapForgeUi.explain.field");
      case "lightOverride": return t("mapForgeUi.explain.lightOverride", { light: t(`mapForgeUi.ambient.${fact.light}`).toLowerCase() });
      case "lightWord": case "rough": return t(`mapForgeUi.explain.${fact.kind}`, { word: fact.word });
    }
  });
}

export function mapSkinName(skin: Pick<Skin, "id" | "name"> | undefined, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (!skin) return t("mapForgeUi.skin.stone-dungeon");
  if (locale === "en") return skin.name;
  const key = `mapForgeUi.skin.${skin.id}` as MessageKey;
  return catalogFor("en", "mapForgeUi.skin.")[key] === skin.name ? t(key) : skin.name;
}

export function mapSkinGroup(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const key = Object.entries(catalogFor("en", "mapForgeUi.group.")).find(([, value]) => value === raw)?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : raw;
}
