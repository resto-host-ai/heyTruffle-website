"use client";

import { useCallback } from "react";

// heytruffle demo booking link (heytruffle-branded Calendly event).
const CALENDLY_URL =
  "https://calendly.com/d/dtqn-973-ryc/discover-heytruffle";
const CALENDLY_SCRIPT =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

let calendlyLoadingPromise: Promise<void> | null = null;

/** Inject the Calendly widget assets once, resolving when the script is ready. */
function ensureCalendlyLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (calendlyLoadingPromise) return calendlyLoadingPromise;

  calendlyLoadingPromise = new Promise((resolve, reject) => {
    if (!document.querySelector("link[data-calendly]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      link.dataset.calendly = "true";
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-calendly]",
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Calendly script failed")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.dataset.calendly = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed"));
    document.head.appendChild(script);
  });

  return calendlyLoadingPromise;
}

/** Open the booking popup; fall back to a new tab if the widget can't load.
 *  Accepts a specific Calendly URL (e.g. one carrying campaign UTMs, like the
 *  MRLA/IRA/FRLA pages use) — defaults to the plain heytruffle event. */
export async function openCalendly(url: string = CALENDLY_URL): Promise<void> {
  try {
    await ensureCalendlyLoaded();
    window.Calendly?.initPopupWidget({ url });
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export function BookDemoButton({
  className,
  style,
  onClick,
  children,
  ariaLabel,
  calendlyUrl,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  /** Override the default heytruffle Calendly event, e.g. to keep a
   *  campaign's UTM params on the link. */
  calendlyUrl?: string;
}) {
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.();
      await openCalendly(calendlyUrl);
    },
    [onClick, calendlyUrl],
  );

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
