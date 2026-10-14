import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { Skin } from "../battlemap/skins.ts";
import { explainForge, forgeOutcome, type ForgeSettings } from "../../app/workshop/maps/forge.ts";
import { sceneRough } from "../battlemap/generate.ts";
import { cueById } from "../ambience/catalog.ts";
import { sceneCueLabel } from "./map-scene-presentations.ts";

export function mapForgeExplanation(settings: Pick<ForgeSettings, "theme" | "ambient" | "scene">, locale: AppLocale): string[] {
  const t = createTranslator(locale);
  if (locale === "en") return explainForge(settings, theme => t(`mapInspectUi.theme.${theme}`), scene => cueById(scene)?.label ?? scene);
  const { theme } = forgeOutcome(settings);
  const label = t(`mapInspectUi.theme.${theme}`);
  const scene = sceneCueLabel({ value: settings.scene, label: cueById(settings.scene)?.label ?? settings.scene }, locale);
  const out = [settings.theme ? t("mapForgeUi.sceneOverride", { theme: label })
    : settings.scene ? t("mapForgeUi.sceneTerrain", { scene, theme: label }) : t("mapForgeUi.openGround")];
  out.push(settings.ambient ? t("mapForgeUi.explain.lightOverride", { light: t(`mapForgeUi.ambient.${settings.ambient}`) })
    : t("mapForgeUi.explain.lightDefault", { theme: label }));
  if (sceneRough(settings.scene)) out.push(t("mapForgeUi.sceneRough", { scene }));
  return out;
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
