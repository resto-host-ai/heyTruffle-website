"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import WaveSurfer from "wavesurfer.js";
import { HOSTS, type Host } from "@/lib/hosts";
import { HOST_WAVES } from "@/lib/hostWaves";

/**
 * HeroHosts — the dark host player that closes the hero (Figma "Landing 2").
 *
 * A row of host pills, a play button with the call's waveform (wavesurfer.js,
 * drawn from pre-computed peaks and doubling as the seek bar), and a
 * transcript box that shows the line being spoken plus the one coming next.
 * Audio and conversations come from lib/hosts, the same data the full
 * HostsDemo uses.
 */

// Per-host pill config. Desktop follows the Figma hero (tinted, bordered
// pills with a voice tagline); mobile follows the mobile frame (neutral pills
// with the job each host covers, Nacho first).
const PILLS: Record<
  Host["id"],
  { accent: string; tagline: string; role: string; order: string }
> = {
  jeff: { accent: "#3773D7", tagline: "Polished - Late night", role: "Orders", order: "order-2 md:order-1" },
  nacho: { accent: "#EF7200", tagline: "Energetic - Bilingual", role: "Reservations", order: "order-1 md:order-2" },
  margarita: { accent: "#943E72", tagline: "Energetic - Bilingual", role: "Catering", order: "order-3" },
  mary: { accent: "#D592F3", tagline: "Energetic - Bilingual", role: "Events", order: "order-4" },
};

// Waveform look: cream bars that fill with the host's colour as the call plays.
const WAVE_STYLE = {
  waveColor: "#f6f3ec",
  barWidth: 3,
  barGap: 4,
  barRadius: 2,
  cursorWidth: 0,
  normalize: true,
  height: "auto" as const,
};

// The waveform opens as a flat line and grows into its peaks once drawn.
const WAVE_FLAT = 0.02;
const WAVE_GROW_MS = 900;

const MOBILE = "(max-width: 767px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getMobile = () => window.matchMedia(MOBILE).matches;

/** The words of `text` spoken by `progress` (0–1 through the line), paced by
 *  character count so long words take proportionally longer. */
function revealWords(text: string, progress: number) {
  const words = text.split(" ");
  const total = text.length;
  let chars = 0;
  let shown = 0;
  for (const w of words) {
    if (chars / total > progress) break;
    chars += w.length + 1;
    shown++;
  }
  return words.slice(0, Math.max(1, shown)).join(" ");
}

/** One transcript line. The host's lines take the host's colour — name in
 *  full, words lightened toward cream so they stay readable on the dark box —
 *  while the caller stays cream, so it's clear at a glance who's talking. */
function Line({
  who,
  text,
  host,
  accent,
}: {
  who: "host" | "caller";
  text: string;
  host: string;
  accent: string;
}) {
  const isHost = who === "host";
  return (
    <>
      <span
        className="font-semibold"
        style={isHost ? { color: `color-mix(in srgb, ${accent} 80%, #f6f3ec)` } : undefined}
      >
        {isHost ? host : "Caller"}:
      </span>{" "}
      <span style={isHost ? { color: `color-mix(in srgb, ${accent} 45%, #f6f3ec)` } : undefined}>
        {text}
      </span>
    </>
  );
}

export default function HeroHosts() {
  const [activeId, setActiveId] = useState<Host["id"] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  // Which host's call has actually been started (audio loaded) — until then
  // the transcript shows a prompt instead of any lines.
  const [startedId, setStartedId] = useState<Host["id"] | null>(null);
  // Flips once the waveform has drawn, fading out the placeholder line.
  const [waveReady, setWaveReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  // Latest "clicked the waveform" handler, read by the wavesurfer listener.
  const onWaveClickRef = useRef<(time: number) => void>(() => {});
  const shownIdRef = useRef<Host["id"]>("jeff");
  // Which host's audio is currently loaded into the <audio> element.
  const loadedRef = useRef<Host["id"] | null>(null);

  // Until a host is picked, mobile opens on Nacho (its first pill) and
  // desktop on Jeff.
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, () => false);
  const shownId = activeId ?? (isMobile ? "nacho" : "jeff");
  const host = HOSTS.find((h) => h.id === shownId) ?? HOSTS[0];
  const lines = host.conversation;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    // Clicking the waveform seeks the audio; keep the transcript in step
    // even while paused.
    const onSeeked = () => setTime(a.currentTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);
    a.addEventListener("seeked", onSeeked);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
      a.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // The waveform drives our own <audio> element, so wavesurfer paints the
  // progress and handles click-to-seek on it.
  useEffect(() => {
    const container = waveRef.current;
    const media = audioRef.current;
    if (!container || !media) return;
    const { peaks, duration } = HOST_WAVES[shownIdRef.current];
    const ws = WaveSurfer.create({
      container,
      media,
      dragToSeek: true,
      peaks: [peaks],
      duration,
      progressColor: PILLS[shownIdRef.current].accent,
      barHeight: WAVE_FLAT,
      ...WAVE_STYLE,
    });
    wsRef.current = ws;

    // First draw: grow the bars up out of the flat line.
    let raf = 0;
    const offDecode = ws.once("decode", () => {
      setWaveReady(true);
      const start = performance.now();
      const grow = (now: number) => {
        const p = Math.min(1, (now - start) / WAVE_GROW_MS);
        const eased = 1 - Math.pow(1 - p, 3);
        ws.setOptions({ barHeight: WAVE_FLAT + (1 - WAVE_FLAT) * eased });
        if (p < 1) raf = requestAnimationFrame(grow);
      };
      raf = requestAnimationFrame(grow);
    });
    const off = ws.on("interaction", (t) => onWaveClickRef.current(t));
    return () => {
      cancelAnimationFrame(raf);
      offDecode();
      off();
      ws.destroy();
      wsRef.current = null;
    };
  }, []);

  // Follow the host on display: the progress takes their colour, and before
  // anything plays the waveform shows their call. Only the peaks change — no
  // audio is fetched until play.
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || shownIdRef.current === shownId) return;
    shownIdRef.current = shownId;
    ws.setOptions({ progressColor: PILLS[shownId].accent });
    if (loadedRef.current) return;
    const { peaks, duration } = HOST_WAVES[shownId];
    ws.setOptions({ peaks: [peaks], duration });
  }, [shownId]);

  // Follow the audio clock while playing.
  useEffect(() => {
    if (!playing) return;
    const a = audioRef.current;
    if (!a) return;
    let raf = 0;
    const tick = () => {
      setTime(a.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const play = (h: Host) => {
    const a = audioRef.current;
    if (!a) return;
    if (loadedRef.current !== h.id) {
      loadedRef.current = h.id;
      const { peaks, duration } = HOST_WAVES[h.id];
      // Sets the audio src synchronously, so play() below still counts as
      // part of the click.
      wsRef.current?.load(h.audio, [peaks], duration).catch(() => {});
      setTime(0);
      setStartedId(h.id);
    } else if (a.ended) {
      a.currentTime = 0;
    }
    setActiveId(h.id);
    // Runs inside the click handler, so browsers accept it as a user gesture.
    a.play().catch(() => setPlaying(false));
  };

  // Clicking the waveform before the call is loaded starts it from that point.
  useEffect(() => {
    onWaveClickRef.current = (t) => {
      if (loadedRef.current === host.id) return;
      play(host);
      wsRef.current?.setTime(t);
    };
  });

  const togglePlay = () => {
    if (playing) audioRef.current?.pause();
    else play(host);
  };

  // The line being spoken right now (the first one before playback starts).
  // Only what has been said so far: the line being spoken, written out word by
  // word in step with the audio, and the one before it. Nothing ahead of the
  // audio — the host's answer never shows before the caller has asked.
  const started = startedId === host.id;
  const t = time + (host.karaokeBias ?? 0);
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (t >= lines[i].start) idx = i;
  }
  const accent = PILLS[host.id].accent;
  const current = started && idx >= 0 ? lines[idx] : null;
  const previous = started && idx > 0 ? lines[idx - 1] : null;
  const spoken = current ? revealWords(current.text, (t - current.start) / Math.max(0.001, current.end - current.start)) : "";

  return (
    <div className="relative z-10 mx-auto mb-10 mt-14 w-[calc(100%-32px)] rounded-[26px] border border-white/10 bg-[#231e20] p-[18px] font-body text-cream md:mb-0 md:mt-[calc(80*var(--fx))] md:w-[90%] md:rounded-b-none md:rounded-t-[calc(60*var(--fx))] md:border-0 md:bg-ink md:px-[calc(40*var(--fx))] md:pb-[calc(56*var(--fx))] md:pt-[calc(60*var(--fx))]">
      <div className="mx-auto md:max-w-[calc(1330*var(--fx))]">
        {/* Host pills — a swipeable row on mobile, a centered row on desktop */}
        <div className="-mx-[18px] flex snap-x scroll-px-[18px] gap-2.5 overflow-x-auto px-[18px] [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:gap-[calc(45*var(--fx))] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {HOSTS.map((h) => {
            const { accent, tagline, role, order } = PILLS[h.id];
            const active = h.id === shownId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => play(h)}
                aria-pressed={active}
                aria-label={`Play a sample call with ${h.name}`}
                className={`${order} flex h-[54px] shrink-0 snap-start items-center gap-2.5 rounded-full bg-white/10 py-2 pl-2.5 pr-6 text-left transition-opacity duration-300 hover:opacity-100 md:h-[calc(60*var(--fx))] md:w-[calc(222*var(--fx))] md:gap-[calc(12*var(--fx))] md:border md:border-[color:var(--pill-border)] md:bg-[var(--pill-bg)] md:pl-[calc(12*var(--fx))] md:pr-[calc(16*var(--fx))] ${
                  active ? "opacity-100" : "opacity-50 md:opacity-60"
                }`}
                style={
                  {
                    "--pill-border": active ? accent : `${accent}80`,
                    "--pill-bg": active ? `${accent}26` : `${accent}0f`,
                  } as React.CSSProperties
                }
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-[calc(40*var(--fx))] md:w-[calc(40*var(--fx))]">
                  <Image
                    src={h.image}
                    alt=""
                    width={342}
                    height={337}
                    sizes="40px"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="min-w-0 leading-[1.3]">
                  <span className="block text-[16px] font-semibold md:truncate md:text-[calc(15*var(--fx))] md:font-normal">
                    {h.name}
                  </span>
                  <span className="block text-[14px] text-cream/70 md:hidden">{role}</span>
                  <span className="hidden truncate text-cream/80 md:block md:text-[calc(14*var(--fx))]">{tagline}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Player */}
        <div className="mt-6 flex items-center gap-4 md:mt-[calc(46*var(--fx))] md:gap-[calc(30*var(--fx))]">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300 hover:scale-105 md:h-[calc(70*var(--fx))] md:w-[calc(70*var(--fx))]"
            style={{ backgroundColor: PILLS[host.id].accent }}
          >
            {playing ? (
              <svg width="16" height="18" viewBox="0 0 12 14" aria-hidden className="fill-cream">
                <rect x="1" width="3.5" height="14" rx="1" />
                <rect x="7.5" width="3.5" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 14 14" aria-hidden className="ml-1 fill-cream">
                <path d="M2.5 1l10 6-10 6V1z" />
              </svg>
            )}
          </button>

          {/* Waveform — also the seek bar */}
          <div className="relative h-8 min-w-0 flex-1 md:h-[calc(48*var(--fx))]">
            {/* Placeholder line until the waveform has drawn */}
            <div
              aria-hidden
              className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-cream/60 transition-opacity duration-500 ${
                waveReady ? "opacity-0" : "opacity-100"
              }`}
            />
            <div ref={waveRef} aria-label="Seek" className="relative h-full cursor-pointer" />
          </div>
        </div>

        {/* Transcript — newest on top: the line being spoken, written out
            word by word, with the previous line pushed down below it, dimmed.
            Both are capped in lines (current 3 / previous 2 on mobile, 2 / 1
            on desktop) so a long turn never balloons the box; when the current
            line runs past its cap, its latest words stay in view. Mobile fits
            the box to the text; desktop keeps a fixed height. */}
        <div className="mt-5 flex flex-col justify-start gap-2.5 overflow-hidden rounded-2xl bg-white/10 p-4 text-[15px] leading-[1.45] md:mt-[calc(37*var(--fx))] md:h-[calc(120*var(--fx))] md:gap-[calc(6*var(--fx))] md:rounded-[calc(10*var(--fx))] md:bg-white/[0.14] md:px-[calc(18*var(--fx))] md:py-[calc(16*var(--fx))] md:text-[calc(17*var(--fx))]">
          {!started ? (
            <p className="m-auto text-center text-cream/50">
              Press play to hear a real call with {host.name}.
            </p>
          ) : (
            <>
              {current && (
                // Bottom-anchored inside its own capped box: overflow spills
                // off the top, so the words being spoken are the ones shown.
                <div className="flex max-h-[4.35em] shrink-0 flex-col justify-end overflow-hidden md:max-h-[2.9em]">
                  <p key={`${host.id}-${idx}`}>
                    <Line who={current.who} text={spoken} host={host.name} accent={accent} />
                  </p>
                </div>
              )}
              {previous && (
                <div className="line-clamp-2 shrink-0 opacity-50 md:line-clamp-1">
                  <Line who={previous.who} text={previous.text} host={host.name} accent={accent} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <audio ref={audioRef} preload="none" />
    </div>
  );
}
