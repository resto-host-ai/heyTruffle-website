import type { Metadata } from "next";
import {
  Geist_Mono,
  Google_Sans,
  Gowun_Batang,
  Inter,
  Montserrat,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

// Same type families as the full site: Inter for body/UI, Montserrat for the
// Resto Experience footer bar, Geist Mono for mono accents, Gowun Batang for
// display headings and Google Sans for lead/body copy.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Google Sans for section description / lead copy.
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heytruffle.com"),
  title: "heytruffle — Coming soon",
  description:
    "heytruffle is getting things ready. A fully managed voice AI service that answers every call for your restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} ${gowunBatang.variable} ${googleSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-[#251f21]">
        {/* Minimal maintenance header — logo only, no navigation */}
        <header className="fixed inset-x-0 top-0 z-50 h-[80px] bg-black/35 backdrop-blur-xl">
          <div className="mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-10">
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
          </div>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        {/* Minimal footer — only the legally required links stay reachable */}
        <footer className="bg-[#1c1917] text-cream">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:gap-0 md:px-10 md:text-left">
            <p className="font-body text-sm text-cream/70">
              © 2026 HeyTruffle — a Resto Experience company.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm text-cream/70">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-cream"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="transition-colors hover:text-cream"
              >
                Terms of Service
              </Link>
              <a
                href="mailto:info@heytruffle.com"
                className="transition-colors hover:text-cream"
              >
                info@heytruffle.com
              </a>
            </nav>
          </div>
        </footer>

        <ScrollReveal />
      </body>
    </html>
  );
}
