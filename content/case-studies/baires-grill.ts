import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const bairesGrill: CaseStudy = {
  slug: "baires-grill",
  name: "Baires Grill",
  seo: {
    title: "Baires Grill — Case Study — heytruffle",
    description:
      "How Baires Grill answered every reservation, private-event and support call across its Miami rooms with heytruffle — a record month, every call answered.",
    canonical: "/case-study/baires-grill/",
  },
  logo: { src: "/images/logobaires.webp", alt: "Baires Grill" },

  heroTags: ["Latin", "Reservations", "Miami, Florida", "9 locations"],
  heroWidth: "narrow",
  headline: { lead: "A record month. ", accent: "Every call answered." },
  paragraphs: [
    "Baires Grill takes a steady stream of reservation calls, private event requests, and customer support questions across its Miami area rooms.",
    "heytruffle answers every one, books the table, and sends the confirmation, even on the busiest nights. The volume has grown five months in a row; the calm has held.",
  ],
  heroStats: [
    { value: "7.5K+", label: "Calls handled" },
    { value: "100+", label: "Host hours saved" },
    { value: "590+", label: "Reservations booked" },
  ],

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the math."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from Baires Grill's call data for June 2026.",
    cards: [
      { value: 7520, label: "Calls handled", color: "#943e72" },
      { value: "996", label: "SMS messages sent", color: "#3773d7" },
      { value: "590", label: "Reservations booked by AI", color: "#ef7200" },
      { value: "104", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  impact: {
    factors: [
      { value: "996", label: "Bookings" },
      { value: "80%", label: "Conversion" },
      { value: "3x$50", label: "Average spend" },
    ],
    total: "~$87,720",
    caption: "Estimated assisted revenue in June.",
    valueWidth: "fixed",
  },

  related: [RREAL_TACOS, MOJITOS],
};
