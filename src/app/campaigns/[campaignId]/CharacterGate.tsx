"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import Link from "next/link";
import { UserPlus } from "lucide-react";

// Replaces the composer for a member who joined an active campaign but has
// no character yet: they must create one before acting.
export function CharacterGate({ campaignId }: { campaignId: string }) {
  const { t } = useLocale();
  return (
    <div className="border-t border-stone-800 p-4">
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-amber-900/60 bg-amber-950/20 px-5 py-5 text-center">
        <UserPlus className="size-6 text-amber-300" />
        <div>
          <p className="font-serif text-base text-stone-100">{t("entryCharacter.gate.title")}</p>
          <p className="mt-1 text-sm text-stone-400">
            {t("entryCharacter.gate.description")}
          </p>
        </div>
        <Link
          href={`/campaigns/${campaignId}/character`}
          className="rounded-lg bg-amber-200 px-4 py-2 text-sm font-medium text-stone-950 hover:bg-amber-100"
        >
          {t("entryCharacter.gate.create")}
        </Link>
      </div>
    </div>
  );
}
