"use client";

import { Check, Link2, Loader2, Trash2, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { PIXEL_ICONS, UserAvatar, ui } from "@/lib/ui";
import { DiceLookEditor } from "@/components/DiceLookEditor";
import { PageLoading, PageNotice, PageSection, PageShell } from "@/components/PageShell";
import { GameIcon } from "@/components/ui/GameIcon";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { DeleteAccountDialog } from "@/app/settings/DeleteAccountDialog";
import { AvatarCropDialog } from "@/app/settings/AvatarCropDialog";
import { AppearanceSection } from "@/app/settings/AppearanceSection";
import { InterfaceLocalePicker } from "@/components/LocalePicker";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { DictationShortcutSection } from "@/app/settings/DictationShortcutSection";
import { BlockedPlayersSection } from "@/app/settings/BlockedPlayersSection";
import { ConnectedAgentsSection } from "@/app/settings/ConnectedAgentsSection";
import { ChangePasswordForm } from "@/app/ChangePasswordForm";
import { LoadFailed, PanelLoading } from "@/app/campaigns/[campaignId]/PanelKit";
import { readUiResponse, requestErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { accountDate, accountGraceCopy, accountRequestError, deleteAccountReady, discordNoticeKey, parseAccountServerInfo, type AccountServerInfo } from "@/lib/i18n/account-presentations";
import { currentPathname, currentQuery, replaceAddress } from "@/lib/navigation";

type Me = {
  id: string;
  username: string;
  avatar: { url: string } | null;
  isAdmin?: boolean;
  discordLinked?: boolean;
  discordAvailable?: boolean;
  hasPassword?: boolean;
  deletionDueAt?: string | null;
};

// Account settings: profile picture, password, Discord link, deletion, and
// the About card naming the server.
export default function SettingsPage() {
  const { locale, t } = useLocale();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [cropping, setCropping] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteError, setDeleteError] = useState<UiRequestError | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Set once the server has accepted the request: this session is over, so
  // the page turns into the farewell note instead of re-fetching anything.
  const [scheduled, setScheduled] = useState<{ dueAt: string; purged: boolean } | null>(null);
  const [keeping, setKeeping] = useState(false);
  // Server identity for the About section, from the same public endpoint
  // the login form and client apps read. graceDays feeds the deletion copy.
  const [about, setAbout] = useState<AccountServerInfo | null>(null);
  const [policyError, setPolicyError] = useState<UiRequestError | null>(null);
  const [profileError, setProfileError] = useState<UiRequestError | null>(null);
  const [avatarError, setAvatarError] = useState<UiRequestError | null>(null);
  const [keepError, setKeepError] = useState<UiRequestError | null>(null);
  const [profileAttempt, setProfileAttempt] = useState(0);
  const [policyAttempt, setPolicyAttempt] = useState(0);
  const deviceWorld = about?.deviceWorld === true;
  const [discordNotice] = useState(() => typeof window === "undefined" ? null : discordNoticeKey(currentQuery()));

  useEffect(() => {
    let cancelled = false;
    readUiResponse<{ user: Me | null }>(fetch("/api/auth/me"), "account.profileLoadError")
      .then((data) => {
        if (cancelled) return;
        if (!("user" in data) || (data.user !== null && (typeof data.user.id !== "string" || typeof data.user.username !== "string"))) throw new Error("Malformed account response.");
        setMe(data.user); setProfileError(null);
      })
      .catch((cause) => { if (!cancelled) setProfileError(accountRequestError(cause, "account.profileLoadError")); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [profileAttempt]);
  useEffect(() => {
    let cancelled = false;
    readUiResponse<unknown>(fetch("/api/auth/providers"), "account.serverInfoError")
      .then(parseAccountServerInfo)
      .then((info) => { if (!cancelled) { setAbout(info); setPolicyError(null); } })
      .catch((cause) => { if (!cancelled) setPolicyError(accountRequestError(cause, "account.serverInfoError")); });
    return () => { cancelled = true; };
  }, [policyAttempt]);
  useEffect(() => {
    const query = currentQuery();
    if (query.get("linked") || query.get("error")) replaceAddress(currentPathname());
  }, []);

  async function setAvatar(avatar: { url: string } | null): Promise<boolean> {
    setSaving(true); setAvatarError(null);
    try {
      const data = await readUiResponse<{ avatar: { url: string } | null }>(fetch("/api/profile", {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ avatar }),
      }), "account.avatarSaveError");
      if (!("avatar" in data)) throw new Error("Malformed avatar update response.");
      setMe((current) => current ? { ...current, avatar: data.avatar } : current);
      return true;
    } catch (cause) { setAvatarError(accountRequestError(cause, "account.avatarSaveError")); return false; }
    finally { setSaving(false); }
  }

  async function deleteAccount() {
    if (!me || !about || policyError) return;
    setDeleting(true); setDeleteError(null);
    try {
      const data = await readUiResponse<{ dueAt: string; purged: boolean }>(fetch("/api/profile", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(me.hasPassword ? { password: deleteConfirm } : {}),
      }), "account.deleteError");
      if (typeof data.dueAt !== "string" || typeof data.purged !== "boolean") throw new Error("Malformed deletion response.");
      setConfirmingDelete(false); setScheduled(data);
    } catch (cause) { setDeleteError(accountRequestError(cause, "account.deleteError")); }
    finally { setDeleting(false); }
  }

  async function keepAccount() {
    setKeeping(true); setKeepError(null);
    try {
      const data = await readUiResponse<{ deletionDueAt: string | null }>(fetch("/api/profile", {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keepAccount: true }),
      }), "account.keepError");
      if (data.deletionDueAt !== null) throw new Error("Account deletion was not canceled.");
      setMe((current) => current ? { ...current, deletionDueAt: null } : current);
    } catch (cause) { setKeepError(accountRequestError(cause, "account.keepError")); }
    finally { setKeeping(false); }
  }

  function flashPasswordSaved() {
    setPasswordChanged(true);
    setTimeout(() => setPasswordChanged(false), 2500);
  }

  // The confirm button unlocks on the right password, or on typing DELETE for
  // Discord-only accounts that have no password.
  const deleteReady = deleteAccountReady(Boolean(me?.hasPassword), deleteConfirm);
  const graceDays = about?.graceDays ?? null;
  const graceCopy = graceDays === null ? "" : accountGraceCopy(graceDays, locale);

  if (loading) {
    return <PageLoading width="narrow" />;
  }

  if (profileError) return <PageNotice width="narrow"><span>{requestErrorText(locale, profileError)}</span><button type="button" className={cn(ui.btnSmall, "mt-3")} onClick={() => setProfileAttempt((attempt) => attempt + 1)}>{t("voicePicker.retry")}</button></PageNotice>;

  if (scheduled) {
    return (
      <PageNotice width="narrow">
        {scheduled.purged ? t("account.purged") : t("account.scheduledFarewell", { date: accountDate(scheduled.dueAt, locale) })}{" "}
        <Link href="/" className="text-amber-200 hover:text-amber-400">
          {t("account.frontDoor")}
        </Link>
      </PageNotice>
    );
  }

  if (!me) {
    return (
      <PageNotice width="narrow">
        <Link href="/" className="text-amber-200 hover:text-amber-400">
          {t("account.login")}
        </Link>{" "}
        {t("account.loginHint")}
      </PageNotice>
    );
  }

  return (
    <PageShell
      user={me}
      width="narrow"
      icon={PIXEL_ICONS.characters}
      glyph="tab-settings"
      title={t("account.settingsTitle")}
      blurb={t("account.signedIn", { name: me.username })}
      actions={
        me.isAdmin ? (
          <Link href="/admin" className={ui.btnSecondary}>
            <GameIcon icon={{ kind: "glyph", key: "tab-admin" }} size="size-6" /> {t("nav.admin")}
          </Link>
        ) : null
      }
    >
      <PageSection heading={t("locale.interface")} glyph="tab-settings">
        <InterfaceLocalePicker />
      </PageSection>
      <PageSection heading={t("account.profilePicture")} glyph="tab-characters">
        <div className="flex items-center gap-5">
          <span className="medallion">
            {me.avatar ? (
              <ImageLightbox
                src={me.avatar.url}
                alt={t("account.avatar")}
                caption={t("account.avatar")}
                className="size-24 rounded-full object-cover"
              />
            ) : (
              // Nobody chose a picture: the sigil this account hashes to, the
              // same one the lobby and the table already show for them.
              <UserAvatar userId={me.id} size="size-24" />
            )}
          </span>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setCropping(true)}
              disabled={saving}
              className={ui.btnPrimary}
            >
              {me.avatar ? t("account.changePicture") : t("account.addPicture")}
            </button>
            {me.avatar ? (
              <button
                type="button"
                onClick={() => setAvatar(null)}
                disabled={saving}
                className={cn(ui.btnSmall, "text-xs hover:border-red-500/50 hover:text-red-400")}
              >
                <Trash2 className="size-3.5" /> {t("account.remove")}
              </button>
            ) : null}
          </div>
        </div>
        {avatarError ? <p role="alert" className="mt-3 text-xs text-ember-600">{requestErrorText(locale, avatarError)}</p> : null}
        <p className="mt-3 text-xs text-stone-500">
          {t("account.avatarHint")}
        </p>
      </PageSection>

      <PageSection
        heading={t("account.dice")}
        glyph="die-d20"
        intro={t("account.diceHint")}
      >
        <DiceLookEditor />
      </PageSection>

      {!about || policyError || (deviceWorld && !me.isAdmin) ? null : (
      <PageSection heading={me.hasPassword === false ? t("account.setPasswordTitle") : t("account.passwordTitle")} glyph="tab-admin">
        {me.hasPassword === false ? (
          <>
            <p className="mb-3 text-sm text-stone-400">
              {t("account.discordPasswordHint")}
            </p>
            {/* lockCurrent hides the current-password field; the server
                skips verification for accounts that have none. */}
            <ChangePasswordForm
              currentPassword=""
              lockCurrent
              submitLabel={t("account.setPassword")}
              onChanged={() => {
                setMe((current) => (current ? { ...current, hasPassword: true } : current));
                flashPasswordSaved();
              }}
            />
          </>
        ) : (
          <ChangePasswordForm onChanged={flashPasswordSaved} />
        )}
        {passwordChanged ? (
          <p className="reveal mt-2 inline-flex items-center gap-1 text-sm text-emerald-400">
            <Check className="size-4" /> {t("account.passwordSaved")}
          </p>
        ) : null}
      </PageSection>
      )}

      {me.discordAvailable || me.discordLinked ? (
        <PageSection heading="Discord" glyph="system-share">
          {me.discordLinked ? (
            <p className="reveal text-sm text-stone-400">
              <Check className="mr-1 inline size-4 text-emerald-400" />
              {t("account.discordLinked")}
            </p>
          ) : (
            <a href="/api/auth/discord/start?link=1" className={ui.btnSmall}>
              <Link2 className="size-3.5" /> {t("account.linkDiscord")}
            </a>
          )}
          {discordNotice ? <p className="live-in mt-2 text-sm text-amber-300">{t(discordNotice)}</p> : null}
        </PageSection>
      ) : null}

      {policyError ? <PageSection><LoadFailed error={requestErrorText(locale, policyError)} onRetry={() => setPolicyAttempt((attempt) => attempt + 1)} /></PageSection> : !about ? <PageSection><PanelLoading label={t("account.loadingPolicy")} rows={1} /></PageSection> : null}
      <AppearanceSection />
      <DictationShortcutSection />
      <BlockedPlayersSection />
      <ConnectedAgentsSection />

      {me.deletionDueAt ? (
        <PageSection
          heading={t("account.deletionTitle")}
          glyph="quest-failed"
          ribbon={t("account.pending")}
          ribbonTone="ember"
          tone="danger"
          intro={t("account.deletionHint", { date: accountDate(me.deletionDueAt, locale) })}
        >
          <button
            type="button"
            onClick={keepAccount}
            disabled={keeping}
            className={ui.btnPrimary}
          >
            {keeping ? <Loader2 className="size-4 animate-spin" /> : <Undo2 className="size-4" />}
            {t("account.keep")}
          </button>
          {keepError ? <p role="alert" className="mt-2 text-xs text-ember-600">{requestErrorText(locale, keepError)}</p> : null}
        </PageSection>
      ) : (
        <PageSection
          heading={t("account.delete")}
          glyph="quest-failed"
          ribbon={t("account.irreversible")}
          ribbonTone="ember"
          tone="danger"
          intro={graceCopy}
        >
          <button
            type="button"
            onClick={() => {
              setDeleteConfirm("");
              setDeleteError(null);
              setConfirmingDelete(true);
            }}
            disabled={!about || Boolean(policyError)}
            className={cn(ui.btnSmall, "hover:border-red-500/50 hover:text-red-400")}
          >
            <Trash2 className="size-3.5" /> {t("account.delete")}
          </button>
        </PageSection>
      )}

      <PageSection heading={t("account.about")} glyph="system-lore">
        {about ? (
          <p className="reveal text-sm text-stone-300">
            {about.serverName} <span className="text-stone-500">{t("account.version", { version: about.version })}</span>
          </p>
        ) : (
          <p className="text-sm text-stone-500">Open Dungeon Master</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/rulebook" className={ui.btnSmall}>
            {t("nav.rulebook")}
          </Link>
          <Link href="/reference" className={ui.btnSmall}>
            {t("account.rulesReference")}
          </Link>
          <Link href="/terms" className={ui.btnSmall}>
            {t("account.terms")}
          </Link>
          <Link href="/privacy" className={ui.btnSmall}>
            {t("account.privacy")}
          </Link>
          <Link href="/licenses" className={ui.btnSmall}>
            {t("account.licenses")}
          </Link>
          <a
            href="https://github.com/Lebbitheplow/open-dungeon-master"
            target="_blank"
            rel="noopener noreferrer"
            className={ui.btnSmall}
          >
            GitHub
          </a>
        </div>
      </PageSection>

      {cropping ? (
        <AvatarCropDialog
          title={t("account.profilePicture")}
          onUploaded={(image) => setAvatar({ url: image.url })}
          onClose={() => setCropping(false)}
        />
      ) : null}

      {confirmingDelete && graceDays !== null ? (
        <DeleteAccountDialog
          hasPassword={Boolean(me.hasPassword)}
          graceCopy={graceCopy}
          graceDays={graceDays}
          value={deleteConfirm}
          onValue={setDeleteConfirm}
          error={requestErrorText(locale, deleteError)}
          deleting={deleting}
          ready={deleteReady}
          onConfirm={deleteAccount}
          onClose={() => setConfirmingDelete(false)}
        />
      ) : null}
    </PageShell>
  );
}
