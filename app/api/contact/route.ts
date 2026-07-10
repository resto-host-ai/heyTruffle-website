import { NextRequest, NextResponse } from "next/server";

type Payload = Record<string, string>;

/* Lead intake, ported from the RestoHost site in simplified form: the
   original also emailed the team + prospect over SMTP (nodemailer) and
   ran Vercel BotID. Here leads are logged and forwarded to whatever
   automation webhook is set in LEADS_WEBHOOK_URL (Make.com, Zapier, …)
   as { source, timestamp, data } — wire SMTP back in when credentials
   for this project exist. */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  /* Keep only flat string fields — the ROI calculator also sends a
     nested `roiInputs` object which must not leak into the webhook. */
  const payload: Payload = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === "string") payload[k] = v;
  }

  const { honeypot, ...loggable } = payload;

  /* Honeypot: real users never see the offscreen "website" field, so a
     non-empty value is a bot. Return 200 OK to give zero feedback. */
  if (honeypot && honeypot.trim() !== "") {
    console.warn("[contact] honeypot triggered; silently dropping");
    return NextResponse.json({ ok: true });
  }

  const name =
    payload.name ||
    [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  const email = payload.email;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  console.log("[contact] lead:", loggable);

  const url = process.env.LEADS_WEBHOOK_URL;
  if (url) {
    const {
      source,
      firstName: _firstName,
      lastName: _lastName,
      name: _legacyName,
      ...rest
    } = loggable;
    void _firstName;
    void _lastName;
    void _legacyName;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          timestamp: new Date().toISOString(),
          data: { name, ...rest },
        }),
      });
      if (!res.ok) {
        console.error("[contact] leads webhook non-2xx:", res.status);
      }
    } catch (err) {
      console.error("[contact] leads webhook error:", err);
    }
  } else {
    console.log("[contact] LEADS_WEBHOOK_URL not configured; skipping forward");
  }

  return NextResponse.json({ ok: true });
}
