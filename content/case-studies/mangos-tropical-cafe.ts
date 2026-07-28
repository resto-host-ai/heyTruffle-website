import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const mangosTropicalCafe: CaseStudy = {
  slug: "mangos-tropical-cafe",
  name: "Mango's Tropical Cafe",
  breadcrumbNoLeadingSpace: true,
  seo: {
    title: "Mango's Tropical Cafe — Case Study — heytruffle",
    description:
      "How Mango's Tropical Cafe handles tables, experiences and after-hours calls across Orlando and Miami with HeyTruffle — one line for the whole night.",
    canonical: "/case-study/mangos-tropical-cafe/",
  },
  logo: { src: "/images/mangotropicallogo.png", alt: "Mango's Tropical Cafe" },

  heroTags: ["Latin/Caribbean", "Reservations", "Orlando", "1 location"],
  heroWidth: "wide",
  headline: {
    lead: "",
    accent: "Dinner, show, nightclub.",
    trailing: " One line handles the whole night.",
  },
  paragraphs: [
    "Mango's calls cover everything a night out involves: tables, experiences, cover charge, dress code.",
    "More than half arrive after hours, and heytruffle answers them all, in season and out.",
  ],
  heroStats: [
    { value: "54%", label: "Captured after-hours" },
    { value: "68%", label: "Calls resolved by AI" },
    { value: "109", label: "Reservations & experiences" },
  ],

  featureStory: {
    variant: "highlights",
    eyebrow: "Feature story · Built for Mango's",
    title: "After the lights go down.",
    intro:
      "Mango's fills its nights with dinner and a show, but the calls to book them come all day, often after the box office has closed.",
    points: [
      "More than half of Mango's calls arrive outside business hours.",
      "The AI answers every one, books the table, and captures the experience.",
      "109 reservations and experiences captured after hours, in a single month.",
    ],
    highlights: [{ value: "54%", label: "of calls captured after hours" }],
  },

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the results."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from Mango's call data for May 2026.",
    cards: [
      { value: "2.202", label: "Calls handled", color: "#943e72" },
      { value: "600", label: "SMS sent", color: "#3773d7" },
      { value: "145", label: "After-hours inquiries", color: "#ef7200" },
      { value: "47", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, MOJITOS],
};
