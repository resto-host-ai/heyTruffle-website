"use client";

import { useCallback } from "react";
import { OPEN_CALENDLY_EVENT } from "@/components/ui/CalendlyModal";

// heytruffle demo booking link (heytruffle-branded Calendly event).
const CALENDLY_URL =
  "https://calendly.com/d/dtqn-973-ryc/discover-heytruffle";

/** Open the booking modal (components/ui/CalendlyModal.tsx, mounted in the
 *  root layout). Accepts a specific Calendly URL (e.g. one carrying campaign
 *  UTMs, like the MRLA/IRA/FRLA pages use) — defaults to the plain heytruffle
 *  event. Async only to keep the existing `void openCalendly()` call sites. */
export async function openCalendly(url: string = CALENDLY_URL): Promise<void> {
  window.dispatchEvent(new CustomEvent(OPEN_CALENDLY_EVENT, { detail: { url } }));
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
