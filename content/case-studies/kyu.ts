import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const kyu: CaseStudy = {
  slug: "kyu",
  name: "KYU",
  seo: {
    title: "KYU — Case Study — heytruffle",
    description:
      "How KYU resolved 1,964 calls — every single one — across Miami, NYC and Las Vegas with HeyTruffle, without passing one to the floor.",
    canonical: "/case-study/kyu/",
  },
  logo: { src: "/images/kyulogo.png", alt: "KYU" },

  heroTags: ["Asian-inspired", "Reservations", "Miami, NYC & Las Vegas", "3 locations"],
  heroWidth: "narrow",
  headline: { lead: "", accent: "131 calls at once.", trailing: " Every one resolved." },
  paragraphs: [
    "KYU runs on reservations, large parties, and guests calling right at the rush.",
    "Heytruffle answers every one and resolves it without passing a single call to the floor, even when the phones all ring together.",
  ],
  heroStats: [
    { value: "100%", label: "Calls resolved" },
    { value: "88+", label: "Host hours saved" },
    { value: "131", label: "Simultaneous calls" },
  ],

  featureStory: {
    variant: "highlights",
    eyebrow: "Feature story · Peak performance",
    title: "131 at once.",
    intro:
      "On a night like Valentine's, calls don't come one at a time.\nThey come all together.",
    points: [
      "At peak, KYU had 131 guests on the line at the very same moment.",
      "No busy tone, no voicemail, no call left waiting for a host.",
      "Every one answered and resolved.",
    ],
    highlights: [
      { value: "131", label: "simultaneous calls" },
      { value: "100%", label: "resolved" },
    ],
  },

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the math."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from KYU's call data for March 2026.",
    cards: [
      { value: 1964, label: "Calls handled", color: "#943e72" },
      { value: "793", label: "SMS sent", color: "#3773d7" },
      { value: "100%", label: "Resolved by AI", color: "#ef7200" },
      { value: "88", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, MOJITOS],
};
