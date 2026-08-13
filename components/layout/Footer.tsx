import Link from "next/link";
import Image from "next/image";
import { INTEGRATIONS } from "@/lib/integrations";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/heytruffle.ai/",
    icon: "/images/logo/linkedin.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/heytruffle.ai",
    icon: "/images/logo/instagram.svg",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@heytruffle",
    icon: "/images/logo/youtube.svg",
  },
];

/** Primary nav, mirroring the header (plus the Blog and FAQ). */
const NAV = [
  { label: "Case Studies", href: "/case-study" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

const linkClass =
  "font-body text-[18px] font-normal leading-[130%] text-[#251f21]/70 transition-colors hover:text-brand-orange";

const headingClass =
  "font-body text-[13px] font-semibold uppercase tracking-[0.18em] text-[#251f21]/50";

export default function Footer() {
  return (
    <footer className="bg-cream text-[#251f21]">
      <div className="mx-auto w-full px-6 py-16 lg:px-[73px] md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex h-full flex-col">
            <Link
              href="/"
              aria-label="heytruffle home"
              className="inline-block self-start"
            >
              <Image
                src="/images/heytruffle-logo.svg"
                alt="heytruffle"
                width={177}
                height={40}
                unoptimized
                className="h-9 w-auto brightness-0"
              />
            </Link>

            <p className="mt-8 max-w-[340px] font-body text-[16px] font-normal leading-[130%] text-[#251f21]">
              AI concierge for restaurants. You operate the restaurant. We operate the
              phones.
            </p>

            <ul
              className="mt-8 flex items-center gap-[18px] md:mt-auto md:pt-8"
              aria-label="heytruffle social media profiles"
            >
              {socialLinks.map(({ name, href, icon }) => (
                <li key={name}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={`Follow heytruffle on ${name}`}
                    className="inline-block transition-opacity hover:opacity-70"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-9 w-auto brightness-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <p className={headingClass}>Navigate</p>
            <ul className="mt-5 space-y-3.5">
              {NAV.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookDemoButton
                  className={`${linkClass} text-left`}
                  ariaLabel="Book a demo"
                >
                  Book a demo
                </BookDemoButton>
              </li>
            </ul>
          </nav>

          {/* Integrations */}
          <nav aria-label="Integrations">
            <p className={headingClass}>Integrations</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {INTEGRATIONS.map((i) => (
                <li key={i.slug}>
                  <Link href={`/integrations/${i.slug}`} className={linkClass}>
                    {i.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 h-px w-full bg-[#251f21]/15" />

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[16px] font-normal leading-[110%] text-[#251f21]">
            © 2026 heytruffle. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className={linkClass}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
