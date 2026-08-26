/**
 * Runs `fn` once the page has finished loading AND the main thread has gone
 * idle — the scheduling every analytics/attribution tag on this site wants.
 *
 * None of those tags produce anything a visitor can see, but on a phone they
 * were competing for the same bandwidth and main-thread time as the CSS and
 * fonts the first paint actually waits on (Lighthouse measured the chain of
 * third-party scripts as the largest non-CSS item in the critical window).
 * Deferring them costs nothing: a session recording or a visitor-identity
 * ping is just as valid a few hundred milliseconds later.
 *
 * `timeout` caps the idle wait so a permanently busy main thread — a long
 * scroll animation, say — still fires the callback rather than dropping it.
 */
export function whenIdle(fn: () => void, timeout = 2000): () => void {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  let idleHandle: number | undefined;
  let timerHandle: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    if (cancelled) return;
    // requestIdleCallback only reached Safari in 16.4, so fall back to a
    // macrotask on anything older.
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(() => !cancelled && fn(), {
        timeout,
      });
    } else {
      timerHandle = setTimeout(() => !cancelled && fn(), 1);
    }
  };

  // A client-side route change lands here with the document already complete;
  // don't wait for a `load` event that will never fire again.
  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleHandle !== undefined && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleHandle);
    }
    if (timerHandle !== undefined) clearTimeout(timerHandle);
  };
}
