import type { CaseStudy } from "./types";

// Rreal Tacos' own page uses different bg/accent variants of the Mojitos and
// Baires Grill cards than every other page's RELATED list — preserved as-is
// rather than merged into the shared related-cards.ts catalog, since merging
// would change what those two cards render on THIS page.
const MOJITOS_WARM = {
  name: "Mojitos",
  location: "Miami",
  value: 4000,
  metric: "Calls recovered in one month.",
  desc: "Reservations, orders and catering that would have gone unanswered.",
  image: "/images/mojitos.webp",
  bg: "#f4efe3",
  bgIdle: "#cfcabf",
  accent: "#ef7200",
};

const BAIRES_GRILL_NORMAL_NIGHT = {
  name: "Baires Grill",
  location: "Miami",
  value: "4x",
  metric: "A normal night, in a single evening.",
  desc: "Every call answered while the team stayed on the floor.",
  image: "/images/case-baires.webp",
  bg: "#eae6dc",
  bgIdle: "#c8c5bf",
  accent: "#a05fc4",
};

export const rrealTacos: CaseStudy = {
  slug: "rreal-tacos",
  name: "Rreal Tacos",
  seo: {
    title: "Rreal Tacos — Case Study — heytruffle",
    description:
      "How Rreal Tacos captured 100% of demand across 12 Atlanta locations with HeyTruffle — every reservation, order and catering call answered.",
    canonical: "/case-study/rreal-tacos/",
  },
  logo: { src: "/images/rreal_logo.webp", alt: "Rreal Tacos" },

  heroTags: ["Latin", "Reservations", "Atlanta", "12 locations"],
  heroWidth: "narrow",
  headline: { lead: "From missed calls to ", accent: "captured demand." },
  paragraphs: [
    "Rreal Tacos receives thousands of calls every month, from reservations and pickup orders to catering inquiries and large-party bookings.",
    "With heytruffle answering every call, their team stays focused on the floor while demand gets captured automatically.",
  ],
  heroStats: [
    { value: "19K+", label: "Calls handled" },
    { value: "520+", label: "Host hours saved" },
    { value: "14K+", label: "Guests seated" },
  ],

  featureStory: {
    variant: "math",
    eyebrow: "Feature story · Large parties",
    title: "One brand, every table.",
    intro:
      "Large party demand runs high at Rreal Tacos, often more than a single location can seat.",
    points: [
      "We saw large parties calling one location while nearby Rreal Tacos had room to spare.",
      "So we built a flow just for them: when a location is full, Nacho offers a table at the two closest Rreal Tacos, under 10 minutes away.",
      "Two out of three groups say yes, keeping every large party inside the brand.",
    ],
    supportingStats: [
      {
        value: "+68%",
        label: "of large parties were willing to relocate within a 10 minute radius.",
      },
      {
        value: "+200",
        label: "large party reservations placed every month at nearby locations.",
      },
    ],
    chain: [
      { value: "~200", label: "bookings per month", op: "x" },
      { value: "11.6", label: "average guests per booking", op: "x" },
      { value: "$30", label: "average spend per guest", op: "=" },
    ],
    total: {
      value: "~$69,600",
      label: "recovered every month, from this feature alone",
    },
    audio: {
      src: "/images/largeparties.mp3",
      caption: "Listen to a real large-party booking.",
    },
  },

  measured: {
    heading: ["No assumptions.", "Just the math."],
    intro:
      "These are the numbers we can stand behind. Every metric comes directly from Rreal Tacos' call data for May 2026.",
    cards: [
      { value: 19362, label: "Calls handled", color: "#943e72" },
      { value: 2867, label: "SMS messages sent", color: "#3773d7" },
      { value: "~520", label: "Host hours saved", color: "#ef7200" },
      { value: "54%", label: "Calls fully resolved", color: "#2f3d7c" },
    ],
  },

  impact: {
    factors: [
      { value: "303", label: "Booked reservations" },
      { value: "80%", label: "Conversion" },
      { value: "3x$30", label: "Average spend per party of three" },
    ],
    total: "~$74,016",
    caption: "Estimated assisted revenue in June.",
    valueWidth: "nowrap",
  },

  testimonial: {
    quoteLead: "Our staff ",
    accentWord: "finally",
    quoteTrailing: " focuses on guests,",
    body:
      "before HeyTruffle, our hosts were constantly pulled away from the floor to answer the phone. During busy shifts, that meant guests waiting, missed calls, or both. Now every caller gets an answer, and our team can stay focused on what matters most: delivering a great experience in the restaurant. It has become part of our daily operation.",
    person: "Miguel Hernandez",
    role: "C.O.O & Co-Owner at Rreal Tacos",
    photo: "/images/rrealceo.webp",
  },

  related: [MOJITOS_WARM, BAIRES_GRILL_NORMAL_NIGHT],
};
