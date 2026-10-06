"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBlobs — the Figma gradient vectors swinging across the hero.
 *
 * Each blob travels along a semicircle from one side of the hero to the
 * other, then picks a new random semicircle back, forever.
 *
 * Everything is drawn into a single low-resolution <canvas>. The blobs are
 * pure blur, so a bitmap at a fraction of the screen resolution upscaled by
 * the browser looks identical, and each frame costs a handful of drawImage
 * calls on a small surface — instead of a stack of huge blurred layers the
 * compositor has to keep in memory and move around.
 */

// The Figma frame the vectors were drawn in. Blobs scale with the hero the
// way a 1920×1080 image would under `object-fit: cover`.
const FRAME_W = 1920;
const FRAME_H = 1080;

// Canvas resolution as a fraction of the hero's CSS size.
const RES = 0.35;

// Extra blob size from the md breakpoint up.
const DESKTOP_MIN_W = 768;
const DESKTOP_SCALE = 1;

// Blob centers stay inside this inset (fraction of the hero on each side),
// so every swing happens fully on screen.
const MARGIN = 0.15;

// Bottom → top, in Figma export order.
const BLOBS = [
  { src: "/images/hero-blobs/vector.svg", w: 1880, h: 1318 }, // #EF7200
  { src: "/images/hero-blobs/vector-1.svg", w: 1525, h: 918 }, // #D592F3
  { src: "/images/hero-blobs/vector-2.svg", w: 1795, h: 1352 }, // #2F3D7C
  { src: "/images/hero-blobs/vector-3.svg", w: 1548, h: 1352 }, // #2F3D7C
  { src: "/images/hero-blobs/vector-4.svg", w: 1151, h: 1041 }, // #943E72
  { src: "/images/hero-blobs/vector-5.svg", w: 1125, h: 1018 }, // #3773D7
  { src: "/images/hero-blobs/vector-6.svg", w: 1125, h: 1018 }, // #3773D7
  { src: "/images/hero-blobs/vector-7.svg", w: 1880, h: 1318 }, // #EF7200
];

// Spread-out starting points (fractions of the hero), shuffled on every load.
const SLOTS: [number, number][] = [
  [0.2, 0.25],
  [0.5, 0.2],
  [0.8, 0.3],
  [0.15, 0.7],
  [0.4, 0.6],
  [0.65, 0.75],
  [0.85, 0.65],
  [0.5, 0.45],
];

// How long one swing takes, in ms.
const MIN_DUR = 10000;
const MAX_DUR = 18000;

/** One swing: the semicircle whose diameter runs from (fx, fy) to (tx, ty). */
type Leg = {
  fx: number;
  fy: number;
  tx: number;
  ty: number;
  dir: 1 | -1;
  t0: number;
  dur: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Point on the leg's semicircle at progress p (0–1), in CSS px. */
function arcPoint(leg: Leg, p: number, w: number, h: number): [number, number] {
  // Ease in and out of each end so the swing reads like a pendulum.
  const e = 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
  const a = Math.PI * e * leg.dir;
  const cx = ((leg.fx + leg.tx) / 2) * w;
  const cy = ((leg.fy + leg.ty) / 2) * h;
  const rx = leg.fx * w - cx;
  const ry = leg.fy * h - cy;
  return [
    cx + rx * Math.cos(a) - ry * Math.sin(a),
    cy + rx * Math.sin(a) + ry * Math.cos(a),
  ];
}

/** Whether every point of the leg's arc stays inside the on-screen inset. */
function fitsOnScreen(leg: Leg, w: number, h: number) {
  for (let p = 0; p <= 1; p += 0.05) {
    const [x, y] = arcPoint(leg, p, w, h);
    if (x < MARGIN * w || x > (1 - MARGIN) * w || y < MARGIN * h || y > (1 - MARGIN) * h) {
      return false;
    }
  }
  return true;
}

/** A new random swing from (fx, fy) across to the other side of the hero. */
function nextLeg(fx: number, fy: number, t0: number, w: number, h: number): Leg {
  const dur = rand(MIN_DUR, MAX_DUR);
  const tries = 40;
  for (let i = 0; i < tries; i++) {
    const tx = fx < 0.5 ? rand(0.5, 1 - MARGIN) : rand(MARGIN, 0.5);
    const ty = rand(MARGIN, 1 - MARGIN);
    // Shrink the swing a little on each failed try; a short enough swing
    // always fits, so this can't loop forever.
    const k = 1 - i / tries;
    const leg: Leg = {
      fx,
      fy,
      tx: fx + (tx - fx) * k,
      ty: fy + (ty - fy) * k,
      dir: Math.random() < 0.5 ? 1 : -1,
      t0,
      dur,
    };
    if (fitsOnScreen(leg, w, h)) return leg;
    leg.dir = leg.dir === 1 ? -1 : 1;
    if (fitsOnScreen(leg, w, h)) return leg;
  }
  return { fx, fy, tx: fx, ty: fy, dir: 1, t0, dur };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function HeroBlobs() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0; // hero size, CSS px
    let h = 0;
    let images: HTMLImageElement[] = [];
    let sprites: HTMLCanvasElement[] = [];
    let legs: Leg[] = [];
    let clock = 0; // ms of motion actually shown — stands still while offscreen
    let last = 0;
    let frame = 0;
    let visible = true;
    let disposed = false;
    let timer = 0;

    // Pre-render each SVG (blur included) once at canvas resolution.
    const rasterize = () => {
      const scale =
        Math.max(w / FRAME_W, h / FRAME_H) * RES * (w >= DESKTOP_MIN_W ? DESKTOP_SCALE : 1);
      sprites = images.map((img, i) => {
        const sprite = document.createElement("canvas");
        sprite.width = Math.max(1, Math.round(BLOBS[i].w * scale));
        sprite.height = Math.max(1, Math.round(BLOBS[i].h * scale));
        sprite.getContext("2d")?.drawImage(img, 0, 0, sprite.width, sprite.height);
        return sprite;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sprites.forEach((sprite, i) => {
        let leg = legs[i];
        while (clock >= leg.t0 + leg.dur) {
          leg = legs[i] = nextLeg(leg.tx, leg.ty, leg.t0 + leg.dur, w, h);
        }
        const [x, y] = arcPoint(leg, (clock - leg.t0) / leg.dur, w, h);
        ctx.drawImage(sprite, x * RES - sprite.width / 2, y * RES - sprite.height / 2);
      });
    };

    const tick = (now: number) => {
      clock += Math.min(now - last, 50);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (still || frame || !visible || !sprites.length) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Runs once both the images and the hero's size are known.
    const setup = () => {
      if (!images.length || !w || !h) return;
      rasterize();
      // Start each blob partway through its first swing so they're out of sync.
      legs = shuffle(SLOTS).map(([x, y]) =>
        nextLeg(
          clamp(x + rand(-0.05, 0.05), MARGIN, 1 - MARGIN),
          clamp(y + rand(-0.05, 0.05), MARGIN, 1 - MARGIN),
          -rand(0, MIN_DUR * 0.8),
          w,
          h,
        ),
      );
      draw();
      canvas.style.opacity = "1";
      start();
    };

    const resize = new ResizeObserver(([entry]) => {
      w = entry.contentRect.width;
      h = entry.contentRect.height;
      canvas.width = Math.max(1, Math.round(w * RES));
      canvas.height = Math.max(1, Math.round(h * RES));
      if (!sprites.length) return setup();
      // Keep the frame filled with the old sprites until the resize settles.
      draw();
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        rasterize();
        draw();
      }, 200);
    });
    resize.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    Promise.all(BLOBS.map((blob) => loadImage(blob.src)))
      .then((loaded) => {
        if (disposed) return;
        images = loaded;
        setup();
      })
      .catch(() => {});

    return () => {
      disposed = true;
      stop();
      clearTimeout(timer);
      resize.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
