"use client";

import { useCallback } from "react";

// heytruffle demo booking link (heytruffle-branded Calendly event).
const CALENDLY_URL =
  "https://calendly.com/d/d2hc-kqk-knn/discover-heytruffle";
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

/** Open the booking popup; fall back to a new tab if the widget can't load. */
export async function openCalendly(): Promise<void> {
  try {
    await ensureCalendlyLoaded();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  } catch {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}

export function BookDemoButton({
  className,
  style,
  onClick,
  children,
  ariaLabel,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.();
      await openCalendly();
    },
    [onClick],
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
