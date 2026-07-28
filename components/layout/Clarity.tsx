"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

// Microsoft Clarity — same account as the RestoHost site (project "resto-host").
// Session recordings + heatmaps. Initialized once from the root layout so it
// runs on every route, via the official @microsoft/clarity npm package
// (https://www.npmjs.com/package/@microsoft/clarity) rather than the
// hand-rolled inline snippet — the ID is supplied via env so it can be
// rotated without a code change and verified against .env directly.
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityInit() {
  useEffect(() => {
    // Without an ID Clarity.init would throw — skip it entirely rather than
    // load a broken tracker.
    if (!CLARITY_PROJECT_ID) return;
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
}
