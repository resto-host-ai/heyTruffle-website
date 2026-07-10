"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Nav links, in the order shown in the reference design. */
const NAV_BEFORE = [
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Case Study", href: "#case-studies" },
];

const NAV_AFTER = [
  { label: "Features", href: "#features" },
  { label: "Become a Partner", href: "#become-a-partner" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

/** Integrations dropdown, grouped like the design. */
const INTEGRATIONS = [
  { heading: "POS", items: ["Toast", "Clover"] },
  { heading: "Reservations", items: ["Resy", "OpenTable", "SevenRooms"] },
  { heading: "Delivery", items: ["Grubhub", "DoorDash", "Uber Eats", "Postmates"] },
  { heading: "Direct Ordering", items: ["Flipdish", "ChowNow"] },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="whitespace-nowrap text-[15px] leading-[1.1] text-cream mix-blend-luminosity transition-opacity hover:opacity-70"
    >
      {label}
    </Link>
  );
}

function DemoButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#book-a-demo"
      className={`flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-5 py-2.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90 ${className}`}
    >
      Get a Free Demo
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileIntegrationsOpen, setMobileIntegrationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "h-[60px] bg-[#1c1917]/85 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          : "h-[80px] bg-black/35"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-6 px-6 md:px-10">
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_BEFORE.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          {/* Integrations dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 whitespace-nowrap text-[15px] leading-[1.1] text-cream mix-blend-luminosity transition-opacity hover:opacity-70"
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

            {/* Panel — the padding-top bridges the hover gap so the white box
                sits flush against the header's bottom edge */}
            <div
              className={`invisible absolute left-1/2 top-full -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
                scrolled ? "pt-[20px]" : "pt-[30px]"
              }`}
            >
              <div className="grid w-max grid-cols-2 gap-x-14 gap-y-8 rounded-b-3xl bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] md:grid-cols-4">
                {INTEGRATIONS.map((group) => (
                  <div key={group.heading} className="min-w-[130px]">
                    <p className="border-b border-[#251f21]/15 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#251f21]/55">
                      {group.heading}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`#${slug(item)}`}
                            className="text-[15px] font-medium text-[#251f21] transition-colors hover:text-brand-orange"
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

          {NAV_AFTER.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          <DemoButton />
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

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="flex max-h-[calc(100vh-60px)] flex-col gap-1 overflow-y-auto bg-black/85 px-6 py-4 backdrop-blur-sm lg:hidden">
          {NAV_BEFORE.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[18px] leading-[1.1] text-cream transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}

          {/* Integrations accordion */}
          <button
            type="button"
            aria-expanded={mobileIntegrationsOpen}
            onClick={() => setMobileIntegrationsOpen((open) => !open)}
            className="flex items-center gap-2 py-2 text-[18px] leading-[1.1] text-cream transition-opacity hover:opacity-70"
          >
            Integrations
            <svg
              width="12"
              height="12"
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
            <div className="grid grid-cols-2 gap-6 py-3 pl-4">
              {INTEGRATIONS.map((group) => (
                <div key={group.heading}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                    {group.heading}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`#${slug(item)}`}
                          onClick={() => setMenuOpen(false)}
                          className="text-[15px] text-cream/90 transition-opacity hover:opacity-70"
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
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[18px] leading-[1.1] text-cream transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}

          <DemoButton className="mt-3 w-fit" />
        </nav>
      )}
    </header>
  );
}
