import { LocaleResources } from "@/lib/i18n/LocaleResources";
import { getUiLocale, getLocaleResources } from "@/lib/i18n/server";

export default async function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return <LocaleResources catalogs={getLocaleResources(await getUiLocale(), "content")}>{children}</LocaleResources>;
}
