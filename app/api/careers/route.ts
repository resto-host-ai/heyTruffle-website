import { NextRequest, NextResponse } from "next/server";

/* Careers form intake — same pattern as app/api/contact/route.ts: the
   client never talks to the automation webhook directly. The URL only
   lives in this server-side env var (CAREERS_WEBHOOK_URL, no NEXT_PUBLIC_
   prefix), so it never ships in the browser bundle and can't be scraped
   out of devtools and hit directly, bypassing the site. */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.session_id !== "string" || !body.session_id) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 },
    );
  }

  const url = process.env.CAREERS_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error("[careers] webhook non-2xx:", res.status);
      }
    } catch (err) {
      console.error("[careers] webhook error:", err);
    }
  } else {
    console.log("[careers] CAREERS_WEBHOOK_URL not configured; skipping forward");
  }

  return NextResponse.json({ ok: true });
}
