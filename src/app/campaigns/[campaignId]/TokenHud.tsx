"use client";

import {
  ArrowRightLeft,
  Crosshair,
  Eye,
  EyeOff,
  Hand,
  HandHelping,
  Heart,
  HeartCrack,
  Shield,
  Sparkles,
  Tag,
  Trash2,
  Wind,
  Wand2,
  X,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { combatName } from "@/lib/i18n/combat-ui-presentations";
import { handRefusalText } from "@/lib/i18n/hand-material-presentations";
import { cn } from "@/lib/cn";
import type { StageToken } from "@/app/campaigns/[campaignId]/BoardStage";
import type { HudGateId } from "@/lib/battlemap/hand-hud";

// The radial HUD on a token (docs/vtt-parity-implementation-plan.md section
// 1.4). Six 40 px buttons in an arc, scaling in over --dur-quick. It is a
// shortcut, not a new path: every button is an existing composer action
// or an existing adjudication, with the target already known.
//
// Positioned in the board's own coordinate space as percentages, so it
// rides with the camera and never needs measuring.

export type HudAction = {
  id: string;
  label: string;
  icon: typeof Hand;
  tone?: "gold" | "ember" | "plain";
  // The engine's reason this cannot be done now; the sigil dims and a press
  // says why instead of composing it.
  disabled?: string | null;
  onPick: () => void;
};

export function playerActions(
  token: StageToken,
  compose: (text: string) => void,
  pickTarget: (mode: "attack" | "cast") => void,
  // hudGates (src/lib/battlemap/hand-hud.ts): canAct, the turn's spends and
  // the casting state, asked the way the Hand asks them.
  gates?: Partial<Record<HudGateId, string | null>>,
  refuse?: (reason: string) => void,
  locale: AppLocale = DEFAULT_LOCALE,
): HudAction[] {
  const t = createTranslator(locale);
  const gate = (id: HudGateId, action: Omit<HudAction, "disabled">): HudAction => {
    const reason = gates?.[id] ?? null;
    return reason ? { ...action, disabled: reason, onPick: () => refuse?.(reason) } : action;
  };
  return [
    gate("attack", { id: "attack", label: t("boardUi.hud.attack"), icon: Crosshair, tone: "ember", onPick: () => pickTarget("attack") }),
    gate("cast", { id: "cast", label: t("boardUi.hud.cast"), icon: Wand2, tone: "gold", onPick: () => pickTarget("cast") }),
    gate("dodge", { id: "dodge", label: t("boardUi.hud.dodge"), icon: Shield, onPick: () => compose(t("boardUi.sent.dodge")) }),
    gate("dash", { id: "dash", label: t("boardUi.hud.dash"), icon: Wind, onPick: () => compose(t("boardUi.sent.dash")) }),
    gate("disengage", { id: "disengage", label: t("boardUi.hud.disengage"), icon: ArrowRightLeft, onPick: () => compose(t("boardUi.sent.disengage")) }),
    gate("help", { id: "help", label: t("boardUi.hud.help"), icon: HandHelping, onPick: () => compose(t("boardUi.sent.help")) }),
  ];
}

export function dmActions(
  token: StageToken,
  handlers: {
    hold: () => void;
    teleport: () => void;
    visibility: (hidden: boolean) => void;
    damage: () => void;
    heal: () => void;
    condition: () => void;
    remove: () => void;
  },
  locale: AppLocale = DEFAULT_LOCALE,
): HudAction[] {
  const t = createTranslator(locale);
  const adhoc = token.kind === "npc" || token.kind === "prop";
  const combatant = token.kind === "pc" || token.kind === "enemy";
  const actions: HudAction[] = [
    { id: "hold", label: t("boardUi.hud.hold"), icon: Hand, tone: "gold", onPick: handlers.hold },
    { id: "teleport", label: t("boardUi.hud.teleport"), icon: Sparkles, onPick: handlers.teleport },
  ];
  if (token.kind !== "pc") {
    actions.push({
      id: "visibility",
      label: t(token.hidden ? "boardUi.hud.reveal" : "boardUi.hud.hide"),
      icon: token.hidden ? Eye : EyeOff,
      onPick: () => handlers.visibility(!token.hidden),
    });
  }
  if (combatant) {
    actions.push(
      { id: "damage", label: t("boardUi.hud.damage"), icon: HeartCrack, tone: "ember", onPick: handlers.damage },
      { id: "condition", label: t("boardUi.hud.condition"), icon: Tag, onPick: handlers.condition },
    );
  }
  if (token.kind === "pc") {
    actions.push({ id: "heal", label: t("boardUi.hud.heal"), icon: Heart, onPick: handlers.heal });
  }
  if (adhoc) {
    actions.push({ id: "remove", label: t("boardUi.hud.remove"), icon: Trash2, tone: "ember", onPick: handlers.remove });
  }
  return actions.slice(0, 7);
}

export function TokenHud({
  token,
  boardWidth,
  boardHeight,
  footprint,
  actions,
  hint,
  onClose,
}: {
  token: StageToken;
  boardWidth: number;
  boardHeight: number;
  footprint: number;
  actions: HudAction[];
  // A line under the arc: "tap an enemy" while a target is being chosen.
  hint?: string;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  const name = combatName(token.name, token.kind, locale);
  const shownActions = actions.map(action => ({ ...action, disabled: action.disabled ? handRefusalText(action.disabled, locale) : action.disabled }));
  const cx = ((token.x + footprint / 2) / boardWidth) * 100;
  const cy = ((token.y + footprint / 2) / boardHeight) * 100;
  // The arc opens upward, or downward near the top edge so it stays on the board.
  const flip = token.y < boardHeight / 3;
  const radius = 56;
  const spread = Math.min(Math.PI, actions.length * 0.52);
  const start = (flip ? Math.PI / 2 : -Math.PI / 2) - spread / 2;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      role="menu"
      aria-label={t("boardUi.hud.actions", { name })}
    >
      <div
        className="absolute"
        style={{ left: `${cx}%`, top: `${cy}%`, width: 0, height: 0 }}
      >
        {shownActions.map((action, index) => {
          const angle = start + (actions.length === 1 ? spread / 2 : (index / (actions.length - 1)) * spread);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              role="menuitem"
              title={action.disabled ?? action.label}
              aria-label={action.disabled ? `${action.label}: ${action.disabled}` : action.label}
              aria-disabled={action.disabled ? "true" : undefined}
              data-refused={action.disabled ? "true" : undefined}
              onClick={(event) => {
                event.stopPropagation();
                action.onPick();
              }}
              className={cn(
                // The Dial's sigil: a dark glass disc with a lit rim, the same
                // on the painted board in both themes. A refused one dims
                // (token-sigil[data-refused] in board.css eases it) but still
                // takes the press, which says why.
                "token-sigil pointer-events-auto fx-pop absolute flex size-10 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border shadow-elev-2 backdrop-blur",
                action.disabled
                  ? "border-[rgba(107,99,148,0.4)] text-[#6f6a8c]"
                  : action.tone === "gold"
                    ? "border-[rgba(212,171,58,0.75)] text-[#ecd287]"
                    : action.tone === "ember"
                      ? "border-[rgba(224,112,58,0.75)] text-[#ffbe8f]"
                      : "border-[rgba(143,138,171,0.6)] text-[#dedbec]",
              )}
              style={{
                left: x,
                top: y,
                animationDelay: `${index * 22}ms`,
              }}
            >
              <Icon className="size-4" />
              <span className="sr-only">{action.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label={t("boardUi.hud.close")}
          className="token-sigil pointer-events-auto fx-pop absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(107,99,148,0.6)] text-[#aeaac6] hover:text-white"
          style={{ left: 0, top: flip ? -radius - 16 : radius + 16 }}
        >
          <X className="size-3.5" />
        </button>
        {hint ? (
          <p
            className="fx-pop pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-md border border-[rgba(224,112,58,0.5)] bg-[rgba(13,11,28,0.94)] px-2 py-0.5 text-[11px] text-[#ffbe8f] shadow-elev-1"
            style={{ left: 0, top: flip ? radius + 18 : -radius - 30 }}
          >
            {hint}
          </p>
        ) : null}
        {shownActions.map((action, index) => {
          const angle = start + (actions.length === 1 ? spread / 2 : (index / (actions.length - 1)) * spread);
          const x = Math.cos(angle) * (radius + 28);
          const y = Math.sin(angle) * (radius + 28);
          return (
            <span
              key={`label-${action.id}`}
              // Each name arrives with its sigil, on the same stagger.
              className="fx-pop pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[9px] font-semibold uppercase tracking-[0.14em] text-[#dedbec] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{ left: x, top: y, animationDelay: `${index * 22}ms` }}
            >
              {action.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
