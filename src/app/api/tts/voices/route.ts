import { currentUser, unauthorized } from "@/lib/auth";
import { backendForLocale, labelVoices, serverVoices, ttsBackend, voicesForLocale } from "@/lib/tts-backend";
import { normalizeLocale } from "@/lib/i18n/locales";
import { localeNarratorVoice } from "@/lib/tts-locale";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The narrator voices this server's speech backend offers, for the voice
// pickers (issue 89). `listed` says the server named them itself; when it is
// false the list is the shipped fallback (or empty) and the picker leans on
// typing a voice. A custom voice string is always allowed: many servers take
// blends and described voices that no list could hold.
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    return unauthorized();
  }
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = normalizeLocale(localeParam);
  const backend = backendForLocale(ttsBackend(), locale);
  const { ids, listed } = await serverVoices(backend);
  return Response.json({
    model: backend.model,
    provider: backend.provider,
    voices: labelVoices(localeParam ? voicesForLocale(ids, locale) : ids),
    listed,
    defaultVoice: localeParam ? localeNarratorVoice(backend.defaultVoice, locale) : backend.defaultVoice,
  });
}
