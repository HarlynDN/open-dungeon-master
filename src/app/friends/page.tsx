"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { socialNotice, SOCIAL_NOTICES } from "@/lib/i18n/reference-social-presentations";
import { EmptyState } from "@/components/EmptyState";
import { Check, Loader2, UserPlus, X } from "lucide-react";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { PIXEL_ICONS, UserAvatar, ui } from "@/lib/ui";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { Select } from "@/components/ui/Select";
import { PageLoading, PageNotice, PageSection, PageShell } from "@/components/PageShell";

// The server's social circle: accounts are per-server, so these are the
// people at this table's door, not a global roster. Online means their
// notification stream is open somewhere on the server.

type FriendItem = {
  userId: string;
  username: string;
  avatar: { url: string } | null;
  since: string;
  online?: boolean;
};

type FriendsData = {
  friends: FriendItem[];
  incoming: FriendItem[];
  outgoing: FriendItem[];
};

type CampaignOption = {
  id: string;
  title: string;
};

type Note = { text: string; error: boolean };

// A face in the gold ring; online lights a candle on the rim.
function Avatar({ friend }: { friend: FriendItem }) {
  const { t } = useLocale();
  return (
    <span className="medallion">
      <UserAvatar url={friend.avatar?.url} userId={friend.userId} size="size-10" />
      {friend.online ? <span title={t("socialUi.online")} role="img" aria-label={t("socialUi.online")} className="online-candle" /> : null}
    </span>
  );
}

// One plate per person instead of a divider list.
const ROW = "plate-row";
const LIST = "stagger space-y-2 px-5 pb-5";

export default function FriendsPage() {
  const { t, locale } = useLocale();
  const [data, setData] = useState<FriendsData>({ friends: [], incoming: [], outgoing: [] });
  const [campaigns, setCampaigns] = useState<CampaignOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  // The add form's outcome (SOCIAL_NOTICES.requested or an error) and per-person
  // outcomes (invite sent, decline failed), each shown next to what caused
  // them rather than in one shared banner.
  const [addNote, setAddNote] = useState<Note | null>(null);
  const [rowNotes, setRowNotes] = useState<Record<string, Note>>({});

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/friends");
      if (response.status === 401) {
        setAuthed(false);
        return;
      }
      if (response.ok) {
        setData(await response.json());
      }
    } catch {
      // Offline; the next poll retries.
    }
  }, []);

  useEffect(() => {
    // Deferred a tick, bell-style: load sets state, and state changes must
    // not launch synchronously from an effect body.
    const first = setTimeout(() => {
      void load().finally(() => setLoading(false));
    }, 0);
    // Online dots go stale as people come and go; refresh on the bell's
    // cadence, cheap enough to not matter.
    const timer = setInterval(() => void load(), 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [load]);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (payload?.campaigns) {
          setCampaigns(
            payload.campaigns.map((campaign: CampaignOption) => ({
              id: campaign.id,
              title: campaign.title,
            })),
          );
        }
      })
      .catch(() => undefined);
  }, []);

  function setRowNote(userId: string, text: string, error: boolean) {
    setRowNotes((current) => ({ ...current, [userId]: { text, error } }));
  }

  async function add(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || sending) {
      return;
    }
    setSending(true);
    setAddNote(null);
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name.trim() }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAddNote({ text: payload.error ?? SOCIAL_NOTICES.failed, error: true });
        return;
      }
      setAddNote({ text: payload.message ?? SOCIAL_NOTICES.requested, error: false });
      setName("");
      void load();
    } finally {
      setSending(false);
    }
  }

  async function respond(userId: string, accept: boolean) {
    const response = await fetch("/api/friends/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, accept }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setRowNote(userId, payload.error ?? SOCIAL_NOTICES.failed, true);
      return;
    }
    void load();
  }

  async function unfriend(friend: FriendItem) {
    if (!await appConfirm(t("socialUi.removeConfirm", { name: friend.username }))) {
      return;
    }
    const response = await fetch("/api/friends", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: friend.userId }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setRowNote(friend.userId, payload.error ?? SOCIAL_NOTICES.failed, true);
      return;
    }
    void load();
  }

  async function invite(userId: string, campaignId: string) {
    const response = await fetch("/api/friends/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendUserId: userId, campaignId }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setRowNote(userId, payload.error ?? SOCIAL_NOTICES.failed, true);
      return;
    }
    setRowNote(userId, SOCIAL_NOTICES.invited, false);
  }

  if (!authed) {
    return (
      <PageNotice>
        <Link href="/" className="text-amber-200 hover:text-amber-400">
          {t("socialUi.login")}
        </Link>{" "}
        {t("socialUi.loginHelp")}
      </PageNotice>
    );
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <PageShell
      icon={PIXEL_ICONS.chats}
      glyph="tab-friends"
      title={t("socialUi.title")}
      blurb={t("socialUi.blurb")}
    >
      <PageSection heading={t("socialUi.add")} glyph="tab-friends">
        <form onSubmit={add} className="flex gap-2">
          <label className="glyph-field min-w-0 flex-1">
            <GameIcon icon={{ kind: "glyph", key: "tab-characters" }} size="size-7" className="glyph-field-icon" />
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("socialUi.nameHint")}
            maxLength={64}
            aria-label={t("socialUi.username")}
            className={cn(ui.input, "h-10")}
          />
          </label>
          <button type="submit" disabled={sending || !name.trim()} className={ui.btnPrimary}>
            {sending ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />} {t("socialUi.addButton")}
          </button>
        </form>
        {addNote ? (
          <p role={addNote.error ? "alert" : "status"} className={cn("mt-2 text-sm", addNote.error ? "motion-shake text-red-400" : "live-in text-emerald-300")}>
            {socialNotice(addNote.text, locale)}
          </p>
        ) : null}
      </PageSection>

      {data.incoming.length > 0 ? (
        <PageSection heading={t("socialUi.incoming")} glyph="cue-bell" ribbon={t("socialUi.waitingYou")} padded={false}>
          <ul className={LIST}>
            {data.incoming.map((request) => (
              <li key={request.userId} className={ROW}>
                <Avatar friend={request} />
                <span className="min-w-0 flex-1 truncate font-medium text-stone-100">
                  {request.username}
                </span>
                {rowNotes[request.userId] ? (
                  <span className="live-in inline-block text-xs text-red-400">{socialNotice(rowNotes[request.userId].text, locale)}</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => respond(request.userId, true)}
                  className={ui.btnSmall}
                >
                  <Check className="size-4 text-emerald-300" /> {t("socialUi.accept")}
                </button>
                <button
                  type="button"
                  onClick={() => respond(request.userId, false)}
                  className={ui.btnSmall}
                >
                  <X className="size-4 text-red-400" /> {t("socialUi.decline")}
                </button>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}

      <PageSection
        heading={t("socialUi.title")}
        glyph="tab-party"
        actions={data.friends.length ? <span className="count-pop tabular-nums">{data.friends.length}</span> : undefined}
        padded={data.friends.length === 0}
      >
        {data.friends.length === 0 ? (
          <EmptyState art="board" title={t("socialUi.empty")} hint={t("socialUi.emptyHint")} />
        ) : (
          <ul className={LIST}>
            {data.friends.map((friend) => (
              <FriendRow
                key={friend.userId}
                friend={friend}
                campaigns={campaigns}
                note={rowNotes[friend.userId]}
                onInvite={(campaignId) => void invite(friend.userId, campaignId)}
                onUnfriend={() => void unfriend(friend)}
              />
            ))}
          </ul>
        )}
      </PageSection>

      {data.outgoing.length > 0 ? (
        <PageSection heading={t("socialUi.outgoing")} glyph="tab-handout" padded={false}>
          <ul className={LIST}>
            {data.outgoing.map((request) => (
              <li key={request.userId} className={ROW}>
                <Avatar friend={request} />
                <span className="min-w-0 flex-1 truncate text-stone-300">{request.username}</span>
                <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                  <GameIcon icon={{ kind: "glyph", key: "rest-short" }} size="size-5" /> {t("socialUi.waiting")}
                </span>
                <button
                  type="button"
                  onClick={() => respond(request.userId, false)}
                  className={ui.btnSmall}
                >
                  <X className="size-4" /> {t("socialUi.cancel")}
                </button>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}
    </PageShell>
  );
}

// One friend: the face, the name, the invite picker and the way out, with the
// same actions under a right-click or a long press.
function FriendRow({
  friend,
  campaigns,
  note,
  onInvite,
  onUnfriend,
}: {
  friend: FriendItem;
  campaigns: CampaignOption[];
  note?: Note;
  onInvite: (campaignId: string) => void;
  onUnfriend: () => void;
}) {
  const { t, locale } = useLocale();
  const menu: ContextMenuItem[] = [
    ...campaigns.map((campaign) => ({
      id: `invite-${campaign.id}`,
      label: t("socialUi.invite", { title: campaign.title }),
      glyph: "tab-campaigns",
      onSelect: () => onInvite(campaign.id),
    })),
    { id: "unfriend", label: t("socialUi.unfriend"), glyph: "quest-failed", tone: "danger" as const, separated: campaigns.length > 0, onSelect: onUnfriend },
  ];
  return (
    <ContextMenu as="li" items={menu} label={friend.username} className="plate-row">
      <Avatar friend={friend} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium text-stone-100">{friend.username}</span>
        <span className="text-[11px] text-stone-500">{friend.online ? t("socialUi.online") : t("socialUi.offline")}</span>
      </span>
      {campaigns.length > 0 ? (
        // Always empty: choosing a campaign sends the invite, it does not
        // remember one.
        <Select
          value=""
          onChange={onInvite}
          options={campaigns.map((campaign) => ({
            value: campaign.id,
            label: campaign.title,
            icon: { kind: "glyph" as const, key: "tab-campaigns" },
          }))}
          label={t("socialUi.inviteLabel", { name: friend.username })}
          placeholder={t("socialUi.inviteHint")}
          size="sm"
          align="end"
          className="max-w-44"
        />
      ) : null}
      <button type="button" onClick={onUnfriend} className={ui.btnSmall}>
        <X className="size-4 text-red-400" /> {t("socialUi.unfriend")}
      </button>
      {note ? (
        <p role={note.error ? "alert" : "status"} className={cn("w-full pl-14 text-xs", note.error ? "motion-shake text-red-400" : "live-in text-emerald-300")}>
          {socialNotice(note.text, locale)}
        </p>
      ) : null}
    </ContextMenu>
  );
}
