"use client";

import { useCapabilities } from "@/lib/use-capabilities";
import type { ImageBackend } from "@/lib/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { imagesNote, narrationNote } from "@/lib/i18n/media-presentations";

// Where a campaign's narration and pictures are actually made (issue 89).
// The campaign only switches them on and picks a voice or a backend; the
// address, the model and the key belong to the server and are set by an
// admin, so a table could not tell what its switch would do: was the text
// going to the cloud, to the story model's server, nowhere? These lines say
// it, from what the server reports about itself (/api/capabilities), and say
// so when the thing behind the switch is not there (issue 88).

const noteClass = "reveal text-[11px] leading-4 text-stone-500";
const warnClass = "reveal text-[11px] leading-4 text-amber-400/90";

export function NarrationNote() {
  const { locale } = useLocale();
  const capabilities = useCapabilities();
  const note = narrationNote(capabilities?.tts, locale);
  return note ? <p className={note.warning ? warnClass : noteClass}>{note.text}</p> : null;
}

export function ImagesNote({ backend }: { backend: ImageBackend }) {
  const { locale } = useLocale();
  const capabilities = useCapabilities();
  const note = imagesNote(backend, capabilities, locale);
  return note ? <p className={noteClass}>{note}</p> : null;
}
