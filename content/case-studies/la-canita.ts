import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const laCanita: CaseStudy = {
  slug: "la-canita",
  name: "La Cañita",
  seo: {
    title: "La Cañita — Case Study — heytruffle",
    description:
      "How La Cañita answers every call in two languages across its Miami rooms with HeyTruffle — booked in English, reservado en español.",
    canonical: "/case-study/la-canita/",
  },
  logo: { src: "/images/lacañitalogo.png", alt: "La Cañita" },

  heroTags: ["Latin", "Cuban & Caribbean", "Miami", "2 locations"],
  heroWidth: "narrow",
  headline: { lead: "Booked in English. Reservado en español." },
  paragraphs: [
    "La Cañita's calls run from orders and reservations to cigar lounge questions, in two languages and across two locations.",
    "Heytruffle answers in whichever language the guest speaks, books the table, and sends the link, day and night.",
  ],
  // No hero stats bar on this page — it goes straight from the paragraphs
  // into the SuccessStats section below.

  successStats: {
    intro:
      "Here's what changed after La Cañita stopped letting calls go unanswered. Every metric below comes directly from La Cañita's operations during June 2026.",
    items: [
      { value: "884", title: "Calls handled", desc: "Entirely by AI" },
      { value: "2 in 5", title: "Calls are reservations", desc: "Calls received." },
      {
        value: "21%",
        title: "Calls recovered",
        desc: "Captured from outside business hours.",
      },
      {
        value: "90",
        title: "Reservation links sent",
        desc: "Booking-ready links delivered.",
      },
      { value: "173", title: "SMS sent", desc: "Mostly reservation and web links" },
      {
        value: "18",
        title: "Host hours saved",
        desc: "Returned to the floor in June.",
      },
    ],
  },

  capabilities: {
    heading: "What capturing 100% of demand looks like.",
    items: [
      {
        title: "Revenue\nAutomation",
        flat: "Revenue Automation",
        img: "/images/card1.webp",
        accent: "#ef7200",
        stat: "$33,600 Recovered",
        statDesc: "Assisted reservation revenue.",
      },
      {
        title: "Operational\nEfficiency",
        flat: "Operational Efficiency",
        img: "/images/card2.webp",
        accent: "#3773d7",
        stat: "100% Resolution",
        statDesc: "Every inbound call resolved end to end.",
      },
      {
        title: "Buying\nback time",
        flat: "Buying back time",
        img: "/images/card3.webp",
        accent: "#2f3d7c",
        stat: "393 Host hours",
        statDesc: "Freed across four months.",
      },
      {
        title: "Data &\nReporting",
        flat: "Data & Reporting",
        img: "/images/card4.webp",
        accent: "#d592f3",
        stat: "88% of SMS",
        statDesc: "For reservation modifications and changes.",
      },
    ],
  },

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the results."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from La Cañita's call data for June 2026.",
    cards: [
      { value: "844", label: "Calls handled", color: "#943e72" },
      { value: "173", label: "SMS sent", color: "#3773d7" },
      { value: "90", label: "Reservations link sent", color: "#ef7200" },
      { value: "18", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, MOJITOS],
};
