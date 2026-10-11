import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { joinByInviteCode, publicCampaign } from "@/lib/db/campaigns";
import { publishPersisted } from "@/lib/events";
import { checkLogin, recordLoginFailure, recordLoginSuccess } from "@/lib/login-throttle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const joinSchema = z.object({
  inviteCode: z.string().trim().toUpperCase().min(4).max(12),
});

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Not logged in.", errorCode: "session_expired" }, { status: 401 });
  }
  if (user.mustChangePassword) {
    return Response.json({ error: "Set a new password to continue.", errorCode: "password_required" }, { status: 403 });
  }

  const raw = await request.json().catch(() => ({}));
  const parsed = joinSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: "Invalid invite code.", errorCode: "room_code_format" }, { status: 400 });
  }

  // Room codes never expire, so wrong guesses get the same escalating
  // lockout as wrong passwords; a valid join clears the slate.
  const throttle = `join:${user.id}`;
  const gate = checkLogin(throttle);
  if (gate.blocked) {
    return Response.json(
      { error: `Too many attempts. Try again in ${gate.retryAfterSec}s.`, errorCode: "rate_limited", retryAfterSec: gate.retryAfterSec },
      { status: 429, headers: { "Retry-After": String(gate.retryAfterSec) } },
    );
  }

  const result = joinByInviteCode(user.id, parsed.data.inviteCode);
  if ("error" in result) {
    recordLoginFailure(throttle);
    return Response.json({ error: result.error, errorCode: result.error === "No campaign with that invite code." ? "room_invalid" : /full/i.test(result.error) ? "room_full" : "room_unavailable" }, { status: 400 });
  }
  recordLoginSuccess(throttle);

  publishPersisted(result.campaign.id, "member_joined", {
    userId: user.id,
    username: user.username,
  });

  return Response.json({ campaign: publicCampaign(result.campaign) });
}
