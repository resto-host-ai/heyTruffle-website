"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openCalendly } from "@/components/BookDemoButton";

/** Nav links, in the order shown in the reference design. */
const NAV_BEFORE = [
  { label: "Case Studies", href: "/case-study" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];

const NAV_AFTER = [{ label: "Contact", href: "/#contact" }];

/** Integrations dropdown, grouped like the design. */
const INTEGRATIONS = [
  { heading: "POS", items: ["Toast", "Clover"] },
  { heading: "Reservations", items: ["Resy", "OpenTable", "SevenRooms"] },
  { heading: "Delivery", items: ["Grubhub", "DoorDash", "Uber Eats", "Postmates"] },
  { heading: "Direct Ordering", items: ["Flipdish", "ChowNow"] },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

/** Integrations with a dedicated landing page; the rest are placeholders. */
const INTEGRATION_PAGES = new Set([
  "Toast",
  "Clover",
  "Resy",
  "OpenTable",
  "SevenRooms",
  "Grubhub",
  "DoorDash",
  "Uber Eats",
  "Postmates",
  "Flipdish",
  "ChowNow",
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
  el.scrollIntoView({ behavior: "smooth" });
  window.history.pushState(null, "", href.slice(hashIndex));
}

const stripSlash = (s: string) => s.replace(/\/+$/, "") || "/";

function NavLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const path = href.split("#")[0] || "/";
  // Only page-level links (not home-section anchors) get the active pill.
  const active = path !== "/" && stripSlash(pathname) === stripSlash(path);

  return (
    <Link
      href={href}
      onClick={(e) => smoothScrollToAnchor(href, e)}
      className={`whitespace-nowrap rounded-full border-2 px-5 py-2 text-center font-body text-[20px] leading-[110%] text-cream mix-blend-luminosity transition-all duration-200 hover:border-cream ${
        active ? "border-cream font-bold" : "border-transparent font-normal"
      }`}
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
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        overlayOpen ? "pointer-events-none opacity-0" : ""
      } ${
        scrolled
          ? "h-[60px] bg-[#1c1917]/85 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          : "h-[80px] bg-black/35"
      }`}
    >
      <div className="relative z-20 mx-auto flex h-full max-w-[1536px] items-center justify-between gap-6 px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="heytruffle home"
          className="mix-blend-luminosity"
        >
          <Image
            src="/images/heytruffle-logo.svg"
            alt="heytruffle"
            width={177}
            height={40}
            priority
            unoptimized
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav — centered relative to the page */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {NAV_BEFORE.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          {/* Integrations dropdown — panel centers on the page, not the button
              (the nav is page-centered, so no `relative` here lets the panel
              anchor to the nav's centre) */}
          <div className="group">
            <button
              type="button"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-transparent px-5 py-2 text-center font-body text-[20px] font-normal leading-[110%] text-cream mix-blend-luminosity transition-all duration-200 hover:border-cream"
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
            <div
              className={`invisible fixed inset-x-0 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
                scrolled ? "top-[60px]" : "top-[80px]"
              }`}
            >
              <div className="border-t border-white/10 bg-[#1c1917]/95 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="mx-auto grid max-w-[1536px] grid-cols-2 gap-x-14 gap-y-8 px-6 py-10 md:grid-cols-4 md:px-10">
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
                              className="font-body text-[20px] font-normal leading-[110%] text-cream transition-colors hover:text-brand-orange"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {NAV_AFTER.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          <button
            type="button"
            onClick={() => void openCalendly()}
            className="whitespace-nowrap rounded-full border-2 border-transparent px-5 py-2 text-center font-body text-[20px] font-normal leading-[110%] text-cream mix-blend-luminosity transition-all duration-200 hover:border-cream"
          >
            Book a demo
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center text-cream lg:hidden"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>

      {/* Mobile dropdown menu — a floating glass panel anchored to the
          top-right, sibling of <header> so it isn't trapped by the header's
          backdrop-filter containing block. */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Transparent click-catcher so the page stays visible behind. */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <nav
            className={`absolute right-4 max-h-[calc(100vh-96px)] w-[72%] max-w-[360px] overflow-y-auto rounded-[28px] border border-white/12 bg-[#221a29]/80 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-200 ${
              scrolled ? "top-[72px]" : "top-[92px]"
            }`}
          >
            <div className="flex flex-col items-end gap-1 px-7 py-6 text-right">
              {NAV_BEFORE.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => {
                    smoothScrollToAnchor(href, e);
                    setMenuOpen(false);
                  }}
                  className="py-2.5 font-body text-[26px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </Link>
              ))}

              {/* Integrations accordion */}
              <button
                type="button"
                aria-expanded={mobileIntegrationsOpen}
                onClick={() => setMobileIntegrationsOpen((open) => !open)}
                className="flex items-center justify-end gap-2 py-2.5 font-body text-[26px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
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
                  className={`transition-transform duration-200 ${
                    mobileIntegrationsOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {mobileIntegrationsOpen && (
                <div className="flex w-full flex-col items-end gap-4 border-y border-white/10 py-4">
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
                </div>
              )}

              {NAV_AFTER.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => {
                    smoothScrollToAnchor(href, e);
                    setMenuOpen(false);
                  }}
                  className="py-2.5 font-body text-[26px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
                >
                  {label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  void openCalendly();
                }}
                className="py-2.5 font-body text-[26px] font-normal leading-[110%] text-cream transition-opacity hover:opacity-70"
              >
                Book a demo
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
