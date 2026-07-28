import type { CaseStudy } from "./types";
import { RREAL_TACOS, MOJITOS } from "./related-cards";

export const aplos: CaseStudy = {
  slug: "aplos",
  name: "Aplós",
  seo: {
    title: "Aplós — Case Study — heytruffle",
    description:
      "How Aplós answered pickup, waitlist and catering calls across four Mississippi dining rooms as one with HeyTruffle.",
    canonical: "/case-study/aplos/",
  },
  logo: { src: "/images/aploslogo.webp", alt: "Aplós" },

  heroTags: ["Mediterranean", "Phone orders", "Mississippi", "4 locations"],
  heroWidth: "narrow",
  headline: { lead: "Every kind of call, ", accent: "handled" },
  paragraphs: [
    "From pickup and waitlist to catering and private events, Aplós gets every kind of call, often several at once.",
    "Heytruffle answers each one, sends the right link, and routes catering straight to the kitchen.",
  ],
  heroStats: [
    { value: "3.2K+", label: "Calls handled" },
    { value: "90%", label: "Calls resolved instantly" },
    { value: "119", label: "Catering inquiries recovered" },
  ],

  featureStory: {
    variant: "highlights",
    eyebrow: "Feature story · Built for Aplós",
    title: "The catering calls that slipped.",
    intro:
      "Catering is high-ticket business, and it was coming in by phone, mid-service.",
    points: [
      "Catering inquiries kept landing during the lunch rush, when no one could stop to take them.",
      "Now the AI captures each one and routes it straight to the kitchen team.",
      "Catering inquiries nurtured into the kitchen, every week.",
    ],
    highlights: [{ value: "119", label: "catering inquiries recovered" }],
  },

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the math."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from Aplós's call data for May 2026.",
    cards: [
      { value: 3886, label: "Calls handled", color: "#943e72" },
      { value: "393", label: "SMS sent", color: "#3773d7" },
      { value: "14%", label: "Recovered outside business hours", color: "#ef7200" },
      { value: "50", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, MOJITOS],
};
