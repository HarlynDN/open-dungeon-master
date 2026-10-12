import { z } from "zod";
import { currentUser, unauthorized } from "@/lib/auth";
import { publicCampaign } from "@/lib/db/campaigns";
import { campaignCreationRefusal, canCreateCampaigns } from "@/lib/shared-host";
import { createStarterCampaign, STARTER_ONE_SHOT } from "@/lib/starter/one-shot";
import { pregenSummaries } from "@/lib/starter/pregens";
import { APP_LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { getUserSettings } from "@/lib/db/users";
import { starterMaterial } from "@/lib/i18n/starter-material-presentations";
import { pregenText } from "@/lib/i18n/entry-character-presentations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The starter one-shot (src/lib/starter/one-shot.ts): what it is, and the
// heroes that come with it.
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    return unauthorized();
  }
  const locale = normalizeLocale(new URL(request.url).searchParams.get("locale") ?? getUserSettings(user.id).uiLocale);
  const material = starterMaterial(STARTER_ONE_SHOT, locale);
  return Response.json({
    oneShot: {
      id: STARTER_ONE_SHOT.id,
      title: material.title,
      tagline: material.tagline,
      description: material.description,
    },
    pregens: pregenSummaries().map(hero => ({ ...hero,
      tagline: pregenText(hero.id, "tagline", hero.tagline, locale),
      blurb: pregenText(hero.id, "blurb", hero.blurb, locale),
    })),
  });
}

const startSchema = z.object({ solo: z.boolean().default(false), locale: z.enum(APP_LOCALES).optional() });

// One click: the campaign exists, the premise and the DM's outline are
// written, and the lobby offers the heroes.
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return unauthorized();
  }
  if (user.mustChangePassword) {
    return Response.json({ error: "Set a new password to continue." }, { status: 403 });
  }
  if (!canCreateCampaigns(user)) {
    return campaignCreationRefusal();
  }
  const parsed = startSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const campaign = createStarterCampaign(user.id, parsed.data);
  return Response.json({ campaign: publicCampaign(campaign) }, { status: 201 });
}
