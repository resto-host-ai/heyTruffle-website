"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Nav links, in the order shown in the Figma design. */
const NAV_LINKS = [
  { label: "Case Studies", href: "#case-studies" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Integrations", href: "#integrations" },
  { label: "Contact", href: "#contact" },
  { label: "Book a demo", href: "#book-a-demo" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-10">
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
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-12">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="whitespace-nowrap text-[20px] leading-[1.1] text-cream mix-blend-luminosity transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}
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
        <nav className="flex flex-col gap-1 bg-black/80 px-6 py-4 backdrop-blur-sm lg:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[20px] leading-[1.1] text-cream transition-opacity hover:opacity-70"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
