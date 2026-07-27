import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const kyochon: CaseStudy = {
  slug: "kyochon",
  name: "Kyochon",
  seo: {
    title: "Kyochon — Case Study — heytruffle",
    description:
      "How Kyochon keeps its takeout and delivery line moving with HeyTruffle — the kitchen keeps cooking, the order still gets taken.",
    canonical: "/case-study/kyochon/",
  },
  logo: { src: "/images/kyochonlogo.png", alt: "Kyochon" },

  heroTags: ["Korean Fried Chicken", "Phone Orders", "LA", "2 locations"],
  heroWidth: "wide",
  headline: {
    lead: "The kitchen keeps cooking. ",
    accent: "The order still gets taken.",
  },
  paragraphs: [
    "Kyochon's phone runs on takeout and delivery orders, in English and Korean alike.",
    "Heytruffle answers, takes the order, and sends the app and order links, so the counter stays on the food, not the phone.",
  ],
  heroStats: [
    { value: "81%", label: "Takeout & Delivery" },
    { value: "312", label: "SMS links sent" },
    { value: "59%", label: "Resolved by AI" },
  ],

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the results."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from Kyochon's call data for June 2026.",
    cards: [
      { value: "1.164", label: "Calls handled", color: "#943e72" },
      { value: "312", label: "SMS sent", color: "#3773d7" },
      { value: "81%", label: "Takeout and delivery", color: "#ef7200" },
      { value: "27", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, MOJITOS],
};
