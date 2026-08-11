"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { HOSTS, type Host } from "@/lib/hosts";
import { NOISE } from "@/lib/noise";

function formatTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Lowercases only the first character, leaving acronyms like ES↔EN alone. */
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Folds the outcome list into one phrase — "Resolved · Pickup + private
 *  dining inquiry" — instead of stacking each item on its own line. The first
 *  item leads, the rest join with "+" and drop their leading capital since
 *  they read as a continuation rather than separate labels. */
function formatOutcome(outcome: string[]) {
  const [first, ...rest] = outcome;
  if (!rest.length) return first;
  const tail = rest.map((s, i) => (i === 0 ? s : lowerFirst(s))).join(" + ");
  return `${first} · ${tail}`;
}

/** Same idea for the host's title: "Bilingual, switches ES↔EN naturally"
 *  rather than two stacked lines. Hosts with a single line are unaffected. */
function formatTitle(title: string[]) {
  const [first, ...rest] = title;
  if (!rest.length) return first;
  return `${first}, ${rest.map(lowerFirst).join(", ")}`;
}

function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.3" />
      <path d="M10 8.5l5.5 3.5L10 15.5V8.5z" fill={color} />
    </svg>
  );
}

/** Word-by-word "karaoke" tint: words light up as they're spoken.
 *  Thresholds are char-proportional within the line's [start, end] window. */
function KaraokeText({
  text,
  progress,
  lit,
  dim,
}: {
  text: string;
  progress: number; // 0..1 within this line
  lit: string;
  dim: string;
}) {
  const tokens = useMemo(() => {
    const parts = text.split(/(\s+)/);
    const words = parts.filter((p) => /\S/.test(p));
    const totalChars = words.reduce((s, w) => s + w.length + 1, 0);
    let cursor = 0;
    const thresholds = new Map<number, number>();
    words.forEach((w, idx) => {
      cursor += w.length + 1;
      thresholds.set(idx, cursor / totalChars);
    });
    let wIdx = 0;
    return parts.map((p) => {
      if (!/\S/.test(p)) return { type: "ws" as const, text: p };
      const threshold = thresholds.get(wIdx) ?? 1;
      wIdx++;
      return { type: "word" as const, text: p, threshold };
    });
  }, [text]);

  return (
    <span>
      {tokens.map((t, i) =>
        t.type === "ws" ? (
          <span key={i}>{t.text}</span>
        ) : (
          <span
            key={i}
            style={{
              color: progress >= t.threshold ? lit : dim,
              transition: "color 0.18s ease",
            }}
          >
            {t.text}
          </span>
        )
      )}
    </span>
  );
}

export default function HostsDemo() {
  const [activeId, setActiveId] = useState<Host["id"] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Mobile "meet the hosts" carousel: one host per slide, bullet nav.
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goToSlide = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const host = activeId ? HOSTS.find((h) => h.id === activeId) ?? null : null;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => {
      if (Number.isFinite(a.duration)) setDuration(a.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
    };
  }, []);

  // Drive transcript progress off the audio clock while playing.
  useEffect(() => {
    if (!playing) return;
    const a = audioRef.current;
    if (!a) return;
    let raf = 0;
    const tick = () => {
      setProgress(a.currentTime);
      setMaxProgress((m) => Math.max(m, a.currentTime));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const openHost = (h: Host) => {
    setActiveId(h.id);
    setProgress(0);
    setMaxProgress(0);
    setDuration(0);
    setNeedsTap(false);

    const a = audioRef.current;
    if (!a) return;
    a.src = h.audio;
    a.currentTime = 0;
    // Called inside the click handler so browsers treat it as user-gesture play.
    a.play().catch(() => setNeedsTap(true));
  };

  /* Bring the panel into view once it has actually replaced the grid.

     Has to be an effect, not part of the click handler: at click time React
     hasn't committed the new DOM, so any measurement still sees the (much
     shorter) grid and the scroll lands short.

     Positioned by hand instead of scrollIntoView({block:"center"}) for two
     reasons: the panel is usually taller than a phone screen, so centring
     pushes its header and close button above the fold; and smooth
     scrollIntoView locks its target on the first frame, so anything that
     settles afterwards (the host image decoding, fonts swapping) leaves it
     aimed at a stale offset. Two rAFs let layout settle, then we scroll to a
     fixed 16px below the sticky header. */
  useEffect(() => {
    if (!activeId) return;
    const HEADER_H = 80;
    const GAP = 16;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const el = rootRef.current;
        if (!el) return;
        const top =
          window.scrollY + el.getBoundingClientRect().top - HEADER_H - GAP;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [activeId]);

  const closeHost = () => {
    audioRef.current?.pause();
    setActiveId(null);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !host) return;
    setNeedsTap(false);
    if (a.paused) {
      if (a.ended) {
        a.currentTime = 0;
        setProgress(0);
        setMaxProgress(0);
      }
      a.play().catch(() => setNeedsTap(true));
    } else {
      a.pause();
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * duration;
    setProgress(a.currentTime);
    setMaxProgress((m) => Math.max(m, a.currentTime));
  };

  // Index of the line being spoken right now (-1 before the first line).
  const currentIdx = useMemo(() => {
    if (!host) return -1;
    const lines = host.conversation;
    const t = progress + 0.15;
    for (let i = 0; i < lines.length; i++) {
      if (t >= lines[i].start && t < lines[i].end) return i;
    }
    return progress >= (lines[lines.length - 1]?.end ?? 0)
      ? lines.length - 1
      : -1;
  }, [progress, host]);

  // Lines revealed so far (they stay visible when paused / after ending).
  const revealedCount = useMemo(() => {
    if (!host || (maxProgress === 0 && !playing)) return 0;
    let count = 0;
    for (const l of host.conversation) {
      if (maxProgress + 0.2 >= l.start) count++;
      else break;
    }
    return count;
  }, [maxProgress, playing, host]);

  // Keep the newest line in view.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (revealedCount === 0) {
      el.scrollTop = 0;
      return;
    }
    const last = el.querySelector<HTMLElement>('[data-msg-last="true"]');
    if (!last) return;
    el.scrollTo({
      top: last.offsetTop - el.clientHeight + last.offsetHeight + 24,
      behavior: "smooth",
    });
  }, [revealedCount, activeId]);

  return (
    <div
      id="meet-the-hosts"
      ref={rootRef}
      className={`w-full  scroll-mt-28 -mt-10  md:min-h-[75vh] ${
        host
          ? " rounded-[32px] bg-[#f6f3ec] p-2 shadow-2xl  md:p-3"
          : " flex flex-col justify-center rounded-[32px] bg-[#f6f3ec] px-6 py-8 shadow-2xl  md:px-16 md:py-12 md:mt-18"
      }`}
    >
      {/* key on the active host so the animation replays on every swap, both
          grid → player and player → grid. */}
      {!host ? (
        <div key="grid" className="host-view-in">
          <h3 className="text-center font-serif text-[30px] font-bold! leading-[110%] text-[#251f21] md:text-[38px] lg:text-[44px]">
            Meet the hosts
          </h3>
          <p className="font-body mx-auto mt-4 max-w-2xl text-center text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
            Trained for the restaurant. Tuned every{" "}
            <br className="hidden sm:inline" />
            week. Built to feel like part of the team.
          </p>

          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="mt-4 flex snap-x snap-mandatory overflow-x-auto 
            
            overflow-y-hidden py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-8 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10 sm:overflow-visible sm:py-0 [&::-webkit-scrollbar]:hidden"
          >
            {HOSTS.map((h, i) => (
              <button
                key={h.id}
                type="button"
                onClick={() => openHost(h)}
                aria-label={`Play a sample call with ${h.name}`}
                className="group flex min-w-full shrink-0 snap-center flex-col items-center text-center sm:min-w-0 sm:shrink"
              >
                <span className="relative flex items-center justify-center sm:w-full">
                  {/* sonar rings rippling outward in the host's colour */}
                  <span
                    aria-hidden
                    className="host-ring pointer-events-none h-32 w-32 md:h-36 md:w-36"
                    style={{ borderColor: h.color, animationDelay: "0s" }}
                  />
                  <span
                    aria-hidden
                    className="host-ring pointer-events-none h-32 w-32 md:h-36 md:w-36"
                    style={{ borderColor: h.color, animationDelay: "1.5s" }}
                  />
                  <span className="host-alive relative block sm:w-full">
                    {/* synchronized: no per-host delay */}
                    <Image
                      src={h.image}
                      alt={h.name}
                      width={342}
                      height={337}
                      quality={75}
                      sizes="(max-width: 640px) 52vw, 200px"
                      /* First slide only: on phones the carousel shows one
                         host, and lazy left its avatar decoding right as fast
                         scrolling arrived (blank card). Eager+low starts the
                         download early without competing with the LCP. */
                      loading={i === 0 ? "eager" : undefined}
                      fetchPriority={i === 0 ? "low" : undefined}
                      className="mx-auto h-auto w-[46vw] max-w-[170px] object-contain transition-transform duration-300 group-hover:scale-105 sm:w-[62%] sm:max-w-none"
                    />
                  </span>
                </span>
                <span className="mt-2 transition-transform duration-300 group-hover:scale-110 sm:mt-3">
                  <PlayIcon color={h.color} />
                </span>
                <p
                  className="mt-2 text-center font-serif text-[22px] font-bold leading-[110%] md:text-[26px]"
                  style={{ color: h.color }}
                >
                  {h.name}
                </p>
                {/* <p className="mt-1.5 text-center font-body text-[16px] font-normal leading-[145%] text-[#251f21]/60 md:text-[18px]">
                  {h.deployedAt}
                </p> */}
                <p className="mt-2 max-w-40 text-center font-body text-[14px] font-normal leading-[140%] text-[#251f21]/45 md:text-[15px]">
                  {h.voice}
                </p>
              </button>
            ))}
          </div>

          {/* Carousel bullets (mobile only) */}
          <div className="mt-5 flex justify-center gap-2.5 sm:hidden">
            {HOSTS.map((h, idx) => (
              <button
                key={h.id}
                type="button"
                aria-label={`Show ${h.name}`}
                aria-current={idx === slide}
                onClick={() => goToSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === slide
                    ? "w-6 bg-[#251f21]"
                    : "w-2.5 bg-[#251f21]/25"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div key={host.id} className="host-view-in relative">
          {/* Back to the grid */}
          <button
            type="button"
            onClick={closeHost}
            aria-label="Back to all hosts"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#251f21]/20 bg-white/50 text-[#251f21]/60 backdrop-blur-sm transition-colors hover:bg-white/80 hover:text-[#251f21] md:right-6 md:top-6"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Tinted, grainy panel — each host colours its own background,
              lighter at the top and settling into the host colour below. */}
          <div
            /* Capped to the viewport (80px header + the card's own padding
               and a little air) and laid out as a flex column, so the panel can
               never grow past the fold no matter how long the transcript is.

               The radius tracks the breakpoint because the card's padding does:
               8px on mobile and 12px from md. Concentric with a 32px card means
               32−8=24 and 32−12=20 — a single fixed value is right on only one
               of the two. */
            className="relative flex max-h-[calc(100svh-132px)] flex-col overflow-hidden rounded-[24px] px-5 py-6 md:rounded-[20px] md:p-7"
            style={{
              background: `linear-gradient(180deg, #f8f5ef 0%, ${host.color}14 42%, ${host.color}59 100%)`,
            }}
          >
            {/* Grain overlay — blend only from md (offscreen composite cost
                on iOS); phones get the texture at plain low opacity. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35] md:opacity-[0.8] md:mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />

            <div className="relative flex min-h-0 flex-1 flex-col font-body">
              {/* ---- Header ---- */}
              <div className="flex shrink-0 items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Host mark. It used to sit above the transcript, where it
                      ate ~150px of the panel and pushed the conversation into a
                      narrow strip; beside the name it identifies the host just
                      as well and gives that height back to the transcript. */}
                  <div className="relative flex shrink-0 items-center justify-center">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute h-20 w-20 rounded-full opacity-70 blur-[26px]"
                      style={{
                        background: `radial-gradient(circle, ${host.color} 0%, transparent 68%)`,
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute h-14 w-14 rounded-full opacity-70 blur-[22px]"
                      style={{
                        background:
                          "radial-gradient(circle, #d592f3 0%, transparent 70%)",
                      }}
                    />
                    <Image
                      src={host.image}
                      alt=""
                      width={342}
                      height={337}
                      quality={75}
                      sizes="80px"
                      className={`relative h-[60px] w-[60px] object-contain md:h-[72px] md:w-[72px] ${
                        playing ? "host-breathe" : ""
                      }`}
                    />
                  </div>

                <div>
                  {/* Hidden on phones: the panel is tight there and the label
                      adds no information the rest of the header doesn't. */}
                  <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-[#251f21]/60 md:block">
                    AI voice host
                  </p>
                  <p
                    /* No top margin on phones — the eyebrow it was spacing away
                       from isn't rendered there. */
                    className="font-serif text-[34px] font-bold leading-[100%] md:mt-2 md:text-[42px]"
                    style={{ color: host.color }}
                  >
                    {host.name}
                  </p>
                  <p className="mt-2 text-[14px] leading-snug text-[#251f21]/75 md:text-[15px]">
                    {/* Own line on mobile: joined with a middot the pair wraps
                        mid-phrase in a narrow column. Desktop doesn't show it
                        here at all — it has its own footer column. */}
                    <span className="block md:hidden">{host.deployedAt}</span>
                    {formatTitle(host.title)}
                  </p>
                </div>
                </div>
                {/* "Deployed at" used to live here, but it crowded the close
                    button in the corner. It sits with the rest of the call
                    metadata in the footer now. */}
              </div>

              {/* ---- Call card (flower + transcript) ---- */}
              <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-white/55 shadow-[0_16px_50px_rgba(37,31,33,0.08)] backdrop-blur-sm">
                {/* Flower with a soft multi-colour halo */}

                {/* Transcript */}
                <div
                  ref={scrollerRef}
                  /* Fixed height rather than flex-1: as flex-1 it grew line by line as
                     the call played, so the panel kept resizing under the reader.
                     34vh (floor 200px, ceiling 440px) always fits inside the
                     panel's own max-height, verified from 780px to 1440px tall.
                     It can still shrink if a viewport is shorter than expected —
                     only the growing is pinned. */
                  className="transcript-scroll flex h-[clamp(200px,34vh,440px)] flex-col gap-4 overflow-y-auto px-6 py-6 md:px-8 md:py-5"
                  style={
                    {
                      maskImage:
                        "linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 12px), transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 12px), transparent 100%)",
                      "--sb-color": host.color,
                    } as React.CSSProperties
                  }
                >
                  {revealedCount === 0 && (
                    <p className="m-auto text-center font-mono text-xs tracking-[0.1em] text-[#251f21]/50">
                      {needsTap
                        ? "PRESS PLAY TO HEAR THE CALL"
                        : "CONNECTING THE CALL…"}
                    </p>
                  )}

                  {host.conversation.slice(0, revealedCount).map((l, i) => {
                    const isHost = l.who === "host";
                    const isLast = i === revealedCount - 1;
                    const lineDur = Math.max(0.001, l.end - l.start);
                    const bias = host.karaokeBias ?? 0;
                    const lineProgress =
                      i === currentIdx
                        ? Math.max(
                            0,
                            Math.min(1, (progress + bias - l.start) / lineDur)
                          )
                        : i < currentIdx
                          ? 1
                          : 0;

                    return (
                      <div
                        key={`${host.id}-${i}`}
                        data-msg-last={isLast ? "true" : "false"}
                        className="msg-in flex"
                        style={{
                          justifyContent: isHost ? "flex-start" : "flex-end",
                        }}
                      >
                        <p
                          className="max-w-[85%] text-base leading-snug md:max-w-[75%] md:text-lg"
                          style={{ textAlign: isHost ? "left" : "right" }}
                        >
                          <KaraokeText
                            text={l.text}
                            progress={lineProgress}
                            lit={isHost ? host.color : "#251f21"}
                            dim={
                              isHost ? `${host.color}59` : "rgba(37,31,33,0.35)"
                            }
                          />
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Call outcome — one line with a colour dot, right above the
                    player, rather than a block competing in the footer grid. */}
                <div className="flex shrink-0 items-center gap-2 px-6 pt-1 md:hidden">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: host.color }}
                  />
                  <p className="text-[13px] leading-snug text-[#251f21]/70">
                    {formatOutcome(host.outcome)}
                  </p>
                </div>

                {/* Player bar */}
                <div className="flex shrink-0 items-center gap-4 px-6 pb-4 pt-2 md:px-8">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
                    style={{ backgroundColor: host.color }}
                  >
                    {playing ? (
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                        <rect x="1" width="3.5" height="14" rx="1" fill="#f6f3ec" />
                        <rect x="7.5" width="3.5" height="14" rx="1" fill="#f6f3ec" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M3.5 1.5l9 5.5-9 5.5v-11z" fill="#f6f3ec" />
                      </svg>
                    )}
                  </button>

                  <div
                    role="slider"
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(progress)}
                    onClick={seek}
                    className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-[#251f21]/10"
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor: host.color,
                        width: `${duration ? Math.min(100, (progress / duration) * 100) : 0}%`,
                      }}
                    />
                  </div>

                  <span className="shrink-0 font-mono text-xs text-[#251f21]/60">
                    {formatTime(progress)} /{" "}
                    {duration ? formatTime(duration) : host.durationLabel}
                  </span>
                </div>
              </div>

              {/* ---- Footer ----
                   Desktop keeps all four columns. Mobile drops "Deployed at"
                   and "Call outcome", which move into the header line and above
                   the player respectively — four blocks stacked two-by-two ate
                   most of a phone screen. */}
              <div className="mt-4 grid shrink-0 grid-cols-2 items-start gap-4 rounded-[20px] bg-white/35 px-5 py-4 backdrop-blur-sm md:grid-cols-[repeat(4,auto)] md:justify-between md:gap-x-8">
                <div className="hidden md:block">
                  <p className="text-[13px] font-semibold" style={{ color: host.color }}>
                    Deployed at
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-[#251f21]/80">
                    {host.deployedAt}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-semibold" style={{ color: host.color }}>
                    Voice
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-[#251f21]/80">
                    {host.voice}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-semibold" style={{ color: host.color }}>
                    Languages
                  </p>
                  {/* Every language reads the same — the first one used to be
                      filled with the host colour, which made it look like a
                      selected state rather than one item in a list. */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {host.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-[#251f21]/25 px-2.5 py-0.5 text-xs font-medium text-[#251f21]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-[13px] font-semibold" style={{ color: host.color }}>
                    Call outcome
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-[#251f21]/80">
                    {formatOutcome(host.outcome)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="none" />
    </div>
  );
}
