"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openCalendly } from "@/components/ui/BookDemoButton";
import { demoAppUrl } from "@/lib/demoAssistant";
/** Nav links, in the order shown in the reference design. `demo: true` opens
 *  the Calendly booking popup instead of navigating (same as "Book a demo"). */
type NavItem = { label: string; href: string; demo?: boolean };

const NAV_BEFORE: NavItem[] = [
  { label: "Case Studies", href: "/case-study/" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/pricing/" },
  // "Compare" pages (heytruffle vs Slang AI / Loman AI / TableVoice) stay
  // live and indexable — sitemap.ts, CompetitorCompare's own cross-links —
  // but aren't linked from the main nav. They're SEO landing pages for
  // "heytruffle vs X" search queries, not a destination we want visitors
  // browsing to from the header.
];

const NAV_AFTER: NavItem[] = [{ label: "Contact", href: "/#contact" }];

/** Integrations dropdown, grouped like the design. */
const INTEGRATIONS = [
  { heading: "POS", items: ["Toast", "Clover", "Square", "SpotOn", "Aloha"] },
  { heading: "Reservations", items: ["Resy", "OpenTable", "SevenRooms"] },
  { heading: "Delivery", items: ["Grubhub", "DoorDash", "Uber Eats", "Postmates"] },
  { heading: "Direct Ordering", items: ["Flipdish", "ChowNow", "Olo"] },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

/** Integrations with a dedicated landing page; the rest are placeholders. */
const INTEGRATION_PAGES = new Set([
  "Toast",
  "Clover",
  "Square",
  "SpotOn",
  "Aloha",
  "Resy",
  "OpenTable",
  "SevenRooms",
  "Grubhub",
  "DoorDash",
  "Uber Eats",
  "Postmates",
  "Flipdish",
  "ChowNow",
  "Olo",
]);
const itemHref = (item: string) =>
  INTEGRATION_PAGES.has(item) ? `/integrations/${slug(item)}` : `#${slug(item)}`;

/**
 * Next's <Link> jumps to same-page anchors instantly, ignoring CSS
 * scroll-behavior. When the anchor's target lives on the current page,
 * take over and scroll smoothly instead; otherwise let the link navigate.
 */
function smoothScrollToAnchor(
  href: string,
  e: React.MouseEvent<HTMLAnchorElement>,
) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;
  if (typeof window === "undefined") return;

  const path = href.slice(0, hashIndex) || "/";
  // Only intercept when we're already on the page that hosts the target.
  if (window.location.pathname !== path) return;

  const el = document.getElementById(href.slice(hashIndex + 1));
  if (!el) return;

  e.preventDefault();

  /* Manual maths instead of scrollIntoView: smooth scrollIntoView locks its
     destination on the first frame, but on this page the layout shifts while
     the scroll is in flight (pinned-section spacers sized in vh, collapsing
     mobile browser chrome), so a long jump — e.g. Pricing from the top on a
     phone — landed hundreds of px past the target. We aim at the same offset
     scroll-mt-24 encodes (80px header + 16px air), then re-measure when the
     scroll settles and correct any residual drift, up to three passes. */
  const HEADER_H = 80;
  const GAP = 16;
  const scrollToTarget = () => {
    const top = window.scrollY + el.getBoundingClientRect().top - HEADER_H - GAP;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  let passes = 0;
  const settle = () => {
    const drift = el.getBoundingClientRect().top - (HEADER_H + GAP);
    if (Math.abs(drift) > 4 && passes++ < 3) {
      scrollToTarget();
      arm();
    }
  };
  const arm = () => {
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", settle, { once: true });
    } else {
      // Safari < 17.4 has no scrollend; a generous timeout approximates it.
      setTimeout(settle, 800);
    }
  };

  scrollToTarget();
  arm();
  window.history.pushState(null, "", href.slice(hashIndex));
}

const stripSlash = (s: string) => s.replace(/\/+$/, "") || "/";

function NavLink({ label, href, demo }: NavItem) {
  const pathname = usePathname();
  const path = href.split("#")[0] || "/";
  // Only page-level links (not home-section anchors) get the active pill.
  const active = !demo && path !== "/" && stripSlash(pathname) === stripSlash(path);

  const className = `whitespace-nowrap rounded-full border-2 px-3.5 py-2 text-center font-body text-[17px] leading-[110%] text-cream mix-blend-luminosity transition-all duration-200 hover:border-cream 2xl:px-5 2xl:text-[20px] ${active ? "border-cream font-bold" : "border-transparent font-normal"
    }`;

  // Demo items open the Calendly popup instead of navigating.
  if (demo) {
    return (
      <button type="button" onClick={() => void openCalendly()} className={className}>
        {label}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={(e) => smoothScrollToAnchor(href, e)}
      className={className}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileIntegrationsOpen, setMobileIntegrationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The Calendly popup overlay sits behind the header's blurred, blend-mode
  // nav, which makes it flicker/blend oddly while loading. Hide the header
  // whenever that overlay is on the page.
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setOverlayOpen(!!document.querySelector(".calendly-overlay")),
    );
    obs.observe(document.body, { childList: true });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        /* backdrop-blur only from md: a permanent full-width backdrop-filter on
           a fixed header is WebKit's most expensive per-scroll-frame effect —
           it was a measurable chunk of the iOS scroll jank. Phones get a more
           opaque solid bg instead so legibility holds without the blur.
           `invisible` (on top of opacity-0) lets WebKit skip the layer entirely
           while the Calendly overlay covers it; visibility transitions flip at
           the END of the fade, so the fade-out still animates. */
        className={`fixed inset-x-0 top-0 z-50 h-[80px] transition-all duration-300 md:backdrop-blur-xl ${overlayOpen ? "pointer-events-none invisible opacity-0" : ""
          } ${scrolled
            ? "bg-[#1c1917]/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] md:bg-[#1c1917]/85"
            : "bg-black/50 md:bg-black/35"
          }`}
      >
        <div className="relative z-20 flex h-full w-full items-center justify-between gap-6 px-6 lg:px-[73px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="heytruffle home"
            /* Blend only from md: a blend-mode child inside the fixed header
               forces WebKit to composite everything beneath it offscreen on
               every scroll frame — and it can delay the logo's own first paint
               on iOS. The phone header has an opaque bg now, so the plain logo
               reads the same. */
            className="md:mix-blend-luminosity"
          >
            <Image
              src="/images/heytruffle-logo.svg"
              alt="heytruffle"
              width={160}
              height={40}
              loading="eager"
              unoptimized
              className="h-9 w-32"
            />
          </Link>

          {/* Desktop nav — centered relative to the page */}
          <nav className="hidden items-center gap-2 lg:flex xl:gap-4">
            {NAV_BEFORE.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}

            {/* Integrations dropdown — panel centers on the page, not the button
              (the nav is page-centered, so no `relative` here lets the panel
              anchor to the nav's centre) */}
            <div className="group">
              <button
                type="button"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-transparent px-3.5 py-2 text-center font-body text-[17px] font-normal leading-[110%] text-cream mix-blend-luminosity transition-all duration-200 hover:border-cream 2xl:px-5 2xl:text-[20px]"
              >
                Integrations
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="transition-transform duration-200 group-hover:rotate-180"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Panel — full-width bar flush against the header's bottom edge,
                in the same dark/blurred style as the header. */}
              <div className="invisible fixed inset-x-0 top-[80px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="border-t border-white/10 bg-[#1c1917]/95 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <div className="grid w-full grid-cols-2 gap-x-14 gap-y-8 px-6 py-10 md:grid-cols-4 lg:px-[73px]">
                    {INTEGRATIONS.map((group) => (
                      <div key={group.heading} className="min-w-[130px]">
                        <p className="border-b border-white/10 pb-2 font-body text-[13px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                          {group.heading}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={itemHref(item)}
                                className="font-body text-[16px] font-normal leading-[110%] text-cream transition-colors hover:text-brand-orange"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 px-6 py-5 lg:px-[73px]">
                    <Link
                      href="/integrations"
                      className="font-body text-[15px] font-semibold text-cream/70 transition-colors hover:text-brand-orange"
                    >
                      View all integrations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV_AFTER.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}

            {/* Direct link to the demo app — no restaurant search, no
                Calendly booking, just the demo's own generic walkthrough. */}
            <a
              href={demoAppUrl()}
              className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-orange px-4 font-body text-[15px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-3 sm:px-8 sm:text-[16px]"
            >
              Hear it live
              <svg
                width="8"
                height="17"
                viewBox="0 0 19 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                /* Optical nudge: "Hear it live" has no descenders, so its
                   visual mass sits above the centre of the line box. From sm
                   up the text box (17.6px) is taller than the chevron (17px)
                   and centring it geometrically reads as ~1px low. */
                className="shrink-0 sm:-translate-y-px"
              >
                <path d="M3 4l13 16-13 16" />
              </svg>
            </a>
          </nav>

          {/* Mobile menu button — three absolutely-positioned bars rather than a
            swapped SVG, so the burger can morph into the X instead of cutting
            between two icons. The outer bars rotate onto the centre line while
            the middle one fades out. */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-10 w-10 items-center justify-center text-cream lg:hidden"
          >
            <span
              aria-hidden
              className={`absolute h-[2px] w-[20px] rounded-full bg-current transition-transform duration-300 ease-out ${menuOpen ? "rotate-45" : "-translate-y-[6px]"
                }`}
            />
            <span
              aria-hidden
              className={`absolute h-[2px] w-[20px] rounded-full bg-current transition-all duration-200 ease-out ${menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
            />
            <span
              aria-hidden
              className={`absolute h-[2px] w-[20px] rounded-full bg-current transition-transform duration-300 ease-out ${menuOpen ? "-rotate-45" : "translate-y-[6px]"
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu — a glass panel spanning the width of the header
          gutter, sibling of <header> so it isn't trapped by the header's
          backdrop-filter containing block.

          Kept mounted (rather than conditionally rendered) so it can animate
          both ways; `invisible` when closed takes it out of the tab order and
          stops it swallowing clicks. */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "" : "pointer-events-none"
          }`}
      >
        {/* Transparent click-catcher so the page stays visible behind. */}
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 h-full w-full cursor-default ${menuOpen ? "" : "hidden"
            }`}
        />

        {/* Sits 12px below the 80px header, inset by the same 24px gutter the
            header uses; max-height leaves the same gap at the bottom. */}
        <nav
          className={`absolute inset-x-6 top-[92px] max-h-[calc(100vh-104px)] origin-top overflow-y-auto rounded-[28px] border border-white/12 bg-[#221a29]/80 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 ease-out ${menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
            }`}
        >
          <div className="flex flex-col items-start gap-1 px-6 py-5 text-left">
            {NAV_BEFORE.map(({ label, href, demo }) =>
              demo ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    void openCalendly();
                  }}
                  className="w-full py-2.5 text-left font-body text-[20px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => {
                    smoothScrollToAnchor(href, e);
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-left font-body text-[20px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </Link>
              ),
            )}

            {/* Integrations accordion */}
            <button
              type="button"
              aria-expanded={mobileIntegrationsOpen}
              onClick={() => setMobileIntegrationsOpen((open) => !open)}
              className="flex w-full items-center justify-between py-2.5 text-left font-body text-[20px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
            >
              Integrations
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={`transition-transform duration-200 ${mobileIntegrationsOpen ? "rotate-180" : ""
                  }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {mobileIntegrationsOpen && (
              <div className="flex w-full flex-col items-start gap-4 border-y border-white/10 py-4">
                {INTEGRATIONS.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
                      {group.heading}
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={itemHref(item)}
                            onClick={() => setMenuOpen(false)}
                            className="font-body text-[17px] text-cream/90 transition-opacity hover:opacity-70"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href="/integrations"
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-[15px] font-semibold text-cream/70 transition-opacity hover:opacity-70"
                >
                  View all integrations →
                </Link>
              </div>
            )}

            {NAV_AFTER.map(({ label, href, demo }) =>
              demo ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    void openCalendly();
                  }}
                  className="w-full py-2.5 text-left font-body text-[20px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => {
                    smoothScrollToAnchor(href, e);
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-left font-body text-[20px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
