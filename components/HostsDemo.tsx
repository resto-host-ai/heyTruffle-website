"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { HOSTS, type Host } from "@/lib/hosts";

function formatTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
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

export default function HostsDemo({
  soloHostId,
}: {
  /** Show a single host's call panel directly (no grid), paused and ready. */
  soloHostId?: Host["id"];
} = {}) {
  const [activeId, setActiveId] = useState<Host["id"] | null>(
    soloHostId ?? null,
  );
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const host = activeId ? HOSTS.find((h) => h.id === activeId) ?? null : null;

  // Solo mode: preload the host's clip without auto-playing, so the visitor
  // presses play to start it.
  useEffect(() => {
    if (!soloHostId) return;
    const a = audioRef.current;
    const h = HOSTS.find((x) => x.id === soloHostId);
    if (!a || !h) return;
    a.src = h.audio;
    a.currentTime = 0;
    setNeedsTap(true);
  }, [soloHostId]);

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
      className={`w-full scroll-mt-28 ${
        soloHostId
          ? ""
          : "mt-12 rounded-[36px] bg-[#f6f3ec] px-6 py-12 shadow-2xl md:px-16 md:py-16"
      }`}
    >
      {!host ? (
        <>
          <h3 className="text-center font-serif text-[40px] font-bold! leading-[110%] text-[#251f21] md:text-[52px] lg:text-[64px]">
            Meet the hosts
          </h3>
          <p className="font-body mx-auto mt-5 max-w-2xl text-center text-[26px] font-normal leading-[140%] text-[#251f21]">
            Trained for the restaurant. Tuned every week. Built to feel like
            part of the team.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-16 sm:grid-cols-4">
            {HOSTS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => openHost(h)}
                aria-label={`Play a sample call with ${h.name}`}
                className="group flex flex-col items-center text-center"
              >
                <span className="relative flex items-center justify-center">
                  {/* sonar rings rippling outward in the host's colour */}
                  <span
                    aria-hidden
                    className="host-ring pointer-events-none h-40 w-40 md:h-48 md:w-48"
                    style={{ borderColor: h.color, animationDelay: "0s" }}
                  />
                  <span
                    aria-hidden
                    className="host-ring pointer-events-none h-40 w-40 md:h-48 md:w-48"
                    style={{ borderColor: h.color, animationDelay: "1.5s" }}
                  />
                  <span className="host-alive relative block">
                    {/* synchronized: no per-host delay */}
                    <Image
                      src={h.image}
                      alt={h.name}
                      width={342}
                      height={337}
                      unoptimized
                      className="h-44 w-44 object-contain transition-transform duration-300 group-hover:scale-105 md:h-52 md:w-52"
                    />
                  </span>
                </span>
                <span className="mt-3 transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon color={h.color} />
                </span>
                <p
                  className="mt-3 text-center font-serif text-[28px] font-bold leading-[110%] md:text-[40px]"
                  style={{ color: h.color }}
                >
                  {h.name}
                </p>
                <p className="mt-2 text-center font-body text-[26px] font-normal leading-[140%] text-[#251f21]/60">
                  {h.desc[0]}
                  <br />
                  {h.desc[1]}
                </p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="relative">
          {/* Back to the grid (hidden in solo mode) */}
          {!soloHostId && (
            <button
              type="button"
              onClick={closeHost}
              aria-label="Back to all hosts"
              className="absolute -top-4 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#251f21]/15 text-[#251f21]/60 transition-colors hover:bg-[#251f21]/5 hover:text-[#251f21] md:-top-8 md:-right-8"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}

          <div className="grid gap-5 md:grid-cols-[250px_minmax(0,1fr)]">
            {/* ---- Sidebar ---- */}
            <aside className="flex flex-col gap-6 self-start rounded-3xl border border-[#251f21]/5 bg-[#fdfbf5] p-6 font-body shadow-sm md:min-h-[420px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#251f21]">
                AI voice host
              </p>
              <div>
                <p
                  className="font-serif text-4xl font-bold md:text-5xl"
                  style={{ color: host.color }}
                >
                  {host.name}
                </p>
                <div className="mt-2 text-sm leading-snug text-[#251f21]/80">
                  {host.title.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: host.color }}>
                  Deployed at
                </p>
                <p className="mt-1 text-sm text-[#251f21]/80">{host.deployedAt}</p>
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: host.color }}>
                  Voice
                </p>
                <p className="mt-1 max-w-[13rem] text-sm leading-snug text-[#251f21]/80">
                  {host.voice}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: host.color }}>
                  Languages
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {host.languages.map((lang, i) => (
                    <span
                      key={lang}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={
                        i === 0
                          ? { backgroundColor: host.color, color: "#f6f3ec" }
                          : {
                              border: "1px solid rgba(37,31,33,0.25)",
                              color: "#251f21",
                            }
                      }
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: host.color }}>
                  Call outcome
                </p>
                <div className="mt-1 text-sm leading-relaxed text-[#251f21]/80">
                  {host.outcome.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="mt-3 font-mono text-[11px] tracking-wide text-[#251f21]/55">
                  {host.callMeta}
                </p>
              </div>
            </aside>

            {/* ---- Call panel ---- */}
            <div className="flex flex-col overflow-hidden rounded-3xl border border-[#251f21]/5 bg-[#fdfbf5] shadow-sm">
              {/* Flower */}
              <div className="relative flex justify-center pb-2 pt-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-2 h-40 w-40 rounded-full opacity-50 blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${host.color} 0%, #d592f3 55%, transparent 75%)`,
                  }}
                />
                <Image
                  src={host.image}
                  alt=""
                  width={342}
                  height={337}
                  unoptimized
                  className={`relative h-36 w-36 object-contain md:h-40 md:w-40 ${
                    playing ? "host-breathe" : ""
                  }`}
                />
              </div>

              {/* Transcript */}
              <div
                ref={scrollerRef}
                className="flex h-[300px] flex-col gap-5 overflow-y-auto px-6 py-6 font-body md:h-[320px] md:px-10"
                style={{
                  maskImage:
                    "linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 12px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(180deg, transparent 0, #000 28px, #000 calc(100% - 12px), transparent 100%)",
                }}
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

              {/* Player bar */}
              <div className="flex items-center gap-4 border-t border-[#251f21]/10 px-6 py-4 md:px-8">
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
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="none" />
    </div>
  );
}
