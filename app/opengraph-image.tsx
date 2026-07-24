import { ImageResponse } from "next/og";

// Site-wide social share card (Open Graph + Twitter). Rendered at build time
// as a 1200x630 PNG — no static asset to maintain.
export const alt = "heytruffle — Voice AI that answers every restaurant call";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 700px at 88% 12%, rgba(239,114,0,0.45) 0%, rgba(239,114,0,0.10) 40%, transparent 66%), linear-gradient(180deg, #1a1620 0%, #251F21 100%)",
          color: "#F6F3EC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>
          heytruffle
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          We operate the phones for your restaurant.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            color: "rgba(246,243,236,0.82)",
            maxWidth: 940,
          }}
        >
          Voice AI that answers 100% of calls 24/7 — reservations, orders and
          catering.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 28,
            fontWeight: 600,
            color: "#EF7200",
          }}
        >
          heytruffle.ai
        </div>
      </div>
    ),
    { ...size },
  );
}
