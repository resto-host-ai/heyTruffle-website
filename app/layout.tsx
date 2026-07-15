import type { Metadata } from "next";
import {
  Geist_Mono,
  Google_Sans,
  Gowun_Batang,
  Inter,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RebrandModal from "@/components/RebrandModal";
import ScrollReveal from "@/components/ScrollReveal";

// Same type families as the RestoHost site: Inter for body/UI, Montserrat
// for the Resto Experience footer bar, and Geist Mono for mono accents.
// Display headings use Gowun Batang (wired into --font-display in globals.css).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heytruffle.com"),
  title: "heytruffle — We operate the phones for your restaurant",
  description:
    "A fully managed voice AI service that answers every call for your restaurants: every reservation booked, every order taken, every catering inquiry closed.",
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
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Header />
        {children}
        <Footer />
        <RebrandModal />
        <ScrollReveal />
      </body>
    </html>
  );
}
