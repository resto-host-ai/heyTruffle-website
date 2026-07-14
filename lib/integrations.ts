/**
 * Per-integration copy + assets for the /integrations/[slug] landing pages.
 * Each entry powers one page showing heytruffle as a voice layer for a
 * specific POS. Content mirrors the RestoHost integration pages, rebranded
 * to heytruffle.
 */
export type Integration = {
  /** URL slug under /integrations/. */
  slug: string;
  /** Display name used in copy ("Toast", "Clover"). */
  brand: string;
  /** SVG wordmark under /images/integrations/. */
  logoFile: string;
  /** Hex accent for brand-name highlights (H1, value-prop, CTA). */
  accent: string;
  /** Category descriptor shown in the hero eyebrow. */
  category: string;
  /** Hero H1. */
  h1: string;
  /** Value proposition paragraph. */
  valueProp: string;
  /** Tagline reused as the hero subtitle + CTA subtext. */
  hook: string;
  /** Bullets summarising what the integration touches. */
  syncSurface: readonly string[];
  /** Three capability cards. */
  capabilities: readonly { title: string; body: string }[];
  /** Metadata for the page <head>. */
  meta: { title: string; description: string };
};

export const INTEGRATIONS: readonly Integration[] = [
  {
    slug: "toast",
    brand: "Toast",
    logoFile: "toast.svg",
    accent: "#FF4C00",
    category: "POS",
    h1: "Voice AI for Toast POS",
    valueProp:
      "heytruffle connects to the Toast Kitchen Display System (KDS). When a customer calls, the AI identifies their phone number, pulls their Toast guest profile, and sends the order straight to your POS.",
    hook: "Stop manual entry errors and keep Toast kitchen tickets moving 24/7.",
    syncSurface: [
      "Live menu + 86 list",
      "Guest profiles by phone number",
      "Direct-to-KDS ticket dispatch",
      "POS-grade order accuracy",
    ],
    capabilities: [
      {
        title: "Phone → Toast POS",
        body: "Calls land straight in your Kitchen Display System. The AI identifies the guest by phone number and pulls their Toast profile.",
      },
      {
        title: "Live menu sync",
        body: "The AI mirrors your Toast menu in real time — when you 86 an item, it stops selling it on the phone immediately.",
      },
      {
        title: "Zero manual entry",
        body: "Orders flow guest → AI → POS without a staff member retyping a single line. Tickets keep moving 24/7.",
      },
    ],
    meta: {
      title: "Voice AI for Toast POS — heytruffle",
      description:
        "heytruffle plugs into the Toast KDS, pulls live menus and guest profiles, and pushes phone orders straight to your POS. 24/7 phone answering, zero manual entry.",
    },
  },
  {
    slug: "clover",
    brand: "Clover",
    logoFile: "clover.svg",
    accent: "#228800",
    category: "POS",
    h1: "Clover POS AI Voice Automation",
    valueProp:
      "Built for chains using Clover. Our AI manages the lunch rush by taking orders that sync with Clover's register and reporting tools.",
    hook: "Turn your Clover system into an automated order-taking station.",
    syncSurface: [
      "Clover register + reporting sync",
      '"Order Ahead" phone capture',
      "Counter staff focused on walk-ins",
      "Lunch-rush volume handled hands-free",
    ],
    capabilities: [
      {
        title: "Register sync",
        body: "Orders taken by phone show up directly in your Clover register and reporting tools — no double entry.",
      },
      {
        title: '"Order Ahead" handler',
        body: "The AI fields 'Order Ahead' phone traffic so your counter staff stays focused on customers at the counter.",
      },
      {
        title: "Lunch-rush relief",
        body: "Built to handle the call spike during peak hours without dropping a single ticket or skipping a beat.",
      },
    ],
    meta: {
      title: "Clover POS AI Voice Automation — heytruffle",
      description:
        "heytruffle plugs into Clover to take 'Order Ahead' phone traffic, sync orders to your register, and free your counter staff during the lunch rush.",
    },
  },
  {
    slug: "resy",
    brand: "Resy",
    logoFile: "resy.svg",
    accent: "#FF462D",
    category: "Reservations",
    h1: "Automate Resy Bookings with AI",
    valueProp:
      "Stop busy signals from blocking VIP reservations. heytruffle reads your live Resy book and confirms tables without staff help.",
    hook: "Stop losing covers to missed calls. Let AI manage the Resy floor plan.",
    syncSurface: [
      "Live Resy book + floor plan",
      '"Notify" waitlist handled hands-free',
      "Cancellation + CC policy explained on call",
      "VIP reservations never miss a ring",
    ],
    capabilities: [
      {
        title: "Live Resy book read",
        body: "The AI sees your real-time floor plan and confirms tables matching the caller's request automatically.",
      },
      {
        title: "Notify queue handled",
        body: "Waitlist 'Notify' requests are managed via the Resy API end-to-end — no staff involvement required.",
      },
      {
        title: "Policy spelled out",
        body: "Cancellation policies and credit-card hold requirements explained naturally on every booking call.",
      },
    ],
    meta: {
      title: "Automate Resy Bookings with AI — heytruffle",
      description:
        "heytruffle reads your live Resy book over the phone, confirms tables, manages Notify waitlists, and explains cancellation and credit card policies — no staff needed.",
    },
  },
  {
    slug: "opentable",
    brand: "OpenTable",
    logoFile: "opentable.svg",
    accent: "#DA3743",
    category: "Reservations",
    h1: "OpenTable Voice AI Integration",
    valueProp:
      "Guests book, change, or cancel OpenTable reservations over the phone using natural speech.",
    hook: "Fill your OpenTable seats without picking up the phone.",
    syncSurface: [
      "Live OpenTable availability grid",
      "Booking, change + cancel by voice",
      "Seating types + time-slot Q&A",
      "Natural-speech reservation flow",
    ],
    capabilities: [
      {
        title: "Live grid sync",
        body: "The AI reads the OpenTable availability grid and reflects your real-time table inventory on every call.",
      },
      {
        title: "Book / change / cancel",
        body: "Guests handle their full reservation lifecycle by voice — no staff intervention from start to finish.",
      },
      {
        title: "Seating + time Q&A",
        body: "Questions about indoor / patio / time-slot openings get answered from your live OpenTable data.",
      },
    ],
    meta: {
      title: "OpenTable Voice AI Integration — heytruffle",
      description:
        "heytruffle reads your live OpenTable availability grid and lets guests book, change, or cancel reservations over the phone in natural speech.",
    },
  },
  {
    slug: "sevenrooms",
    brand: "SevenRooms",
    logoFile: "sevenrooms.svg",
    // SevenRooms' marketing has no single canonical colour; use the
    // heytruffle purple so the highlight reads on both the dark hero and
    // the light value-prop section.
    accent: "#a05fc4",
    category: "Reservations",
    h1: "AI Hosting for SevenRooms",
    valueProp:
      "Use your SevenRooms guest CRM during every call. The AI greets regulars by name and remembers their specific preferences.",
    hook: "Put SevenRooms guest data to work through automated phone conversations.",
    syncSurface: [
      "SevenRooms guest CRM on every call",
      "Regulars greeted by name",
      "Guest tags pulled live",
      "Reservations marked for the floor team",
    ],
    capabilities: [
      {
        title: "Guest CRM on every call",
        body: "The AI pulls each caller's SevenRooms profile so regulars get a personal greeting from the first ring.",
      },
      {
        title: "Tags + preferences live",
        body: "Allergies, table preferences, VIP flags and dietary notes surface during the call automatically.",
      },
      {
        title: "Floor-team handoff",
        body: "Reservations get marked in SevenRooms with full call context so service staff steps in fully briefed.",
      },
    ],
    meta: {
      title: "AI Hosting for SevenRooms — heytruffle",
      description:
        "heytruffle uses your SevenRooms guest CRM on every call — greets regulars by name, pulls live guest tags, and marks reservations for the floor team automatically.",
    },
  },
  {
    slug: "grubhub",
    brand: "Grubhub",
    logoFile: "grubhub.svg",
    accent: "#FF5500",
    category: "Delivery",
    h1: "Automate Grubhub Phone Traffic",
    valueProp:
      "Capture leads from customers who see your menu on Grubhub. heytruffle takes these calls and funnels them to the right ordering link.",
    hook: "Convert every Grubhub phone inquiry into a confirmed order.",
    syncSurface: [
      "Delivery zones + active deals",
      "Direct-link order routing",
      "24/7 storefront answering",
      "Phone-to-app handoff via SMS",
    ],
    capabilities: [
      {
        title: "24/7 storefront host",
        body: "Acts as the always-on phone host for your Grubhub storefront — day, night, weekends, holidays.",
      },
      {
        title: "Delivery zone Q&A",
        body: "Answers whether you deliver to a caller's address and what deals are currently active, in seconds.",
      },
      {
        title: "Phone → ordering link",
        body: "Captures every phone inquiry and funnels callers into a confirmed order via the right Grubhub link.",
      },
    ],
    meta: {
      title: "Automate Grubhub Phone Traffic with Voice AI — heytruffle",
      description:
        "heytruffle hosts your Grubhub phone traffic 24/7, answers delivery-zone and deals questions, and funnels callers into a confirmed order.",
    },
  },
  {
    slug: "doordash",
    brand: "DoorDash",
    logoFile: "doordash.svg",
    accent: "#EB1700",
    category: "Delivery",
    h1: "Voice AI for DoorDash Orders",
    valueProp:
      'Clear the DoorDash tablet clutter. The AI answers pricing questions and sends "Order Now" links via SMS to move callers off the line.',
    hook: "Remove 'Delivery App' noise from your restaurant with automated DoorDash support.",
    syncSurface: [
      "Real-time DoorDash order status",
      "Pricing + menu Q&A",
      "SMS deep-links to the DoorDash app",
      "Phone line cleared for in-house guests",
    ],
    capabilities: [
      {
        title: "Real-time order status",
        body: "Pulls live DoorDash order state and tells the caller exactly where their food is, without guesswork.",
      },
      {
        title: "Menu + pricing Q&A",
        body: "Handles 'how much is...' and 'do you have...' calls automatically, so your team stays on the line.",
      },
      {
        title: "SMS deep-links",
        body: "Sends 'Order Now' links via SMS to move callers off the phone and onto the DoorDash app instantly.",
      },
    ],
    meta: {
      title: "Voice AI for DoorDash Orders — heytruffle",
      description:
        "heytruffle handles DoorDash phone traffic, gives real-time order status, and SMSes 'Order Now' links so your team can focus on the food.",
    },
  },
  {
    slug: "uber-eats",
    brand: "Uber Eats",
    logoFile: "uber-eats.svg",
    accent: "#06C167",
    category: "Delivery",
    h1: "Voice AI for Uber Eats Merchants",
    valueProp:
      "Connect your Uber Eats store to a voice assistant that knows your delivery hours and active promotions.",
    hook: "Handle Uber Eats inquiries with automated voice routing.",
    syncSurface: [
      "Live delivery hours + promotions",
      "High-commission inquiry routing",
      "Menu Q&A handled hands-free",
      "Direct-ordering site funnel",
    ],
    capabilities: [
      {
        title: "Hours + promos on call",
        body: "The AI knows your live Uber Eats hours and active promotions and answers them on the spot.",
      },
      {
        title: "Commission rescue routing",
        body: "High-commission inquiries get redirected to your direct ordering site automatically — margin preserved.",
      },
      {
        title: "Kitchen kept heads-down",
        body: "Menu Q&A handled end-to-end so your team never leaves the line to pick up the phone.",
      },
    ],
    meta: {
      title: "Voice AI for Uber Eats Merchants — heytruffle",
      description:
        "heytruffle hosts your Uber Eats phone traffic, knows your hours and promos, and routes high-commission inquiries to your direct ordering site.",
    },
  },
  {
    slug: "postmates",
    brand: "Postmates",
    logoFile: "postmates.svg",
    // Postmates renders as a plain black wordmark with no dominant
    // accent; use the heytruffle orange so the highlight reads on both
    // the dark hero and the light value-prop section.
    accent: "#ef7200",
    category: "Delivery",
    h1: "AI Voice for Postmates Partners",
    valueProp:
      'For high-volume locations where Postmates traffic is heavy. The AI handles "Is my order ready?" calls so your prep team stays focused.',
    hook: "Cut out delivery status calls and focus on the food.",
    syncSurface: [
      'Real-time "Is my order ready?" status',
      "Caller identified by phone number",
      "Prep team stays heads-down",
      "Phone line cleared for paying guests",
    ],
    capabilities: [
      {
        title: "Instant status via API",
        body: "The Postmates API delivers real-time order state directly to the caller, no lookup, no waiting.",
      },
      {
        title: "Phone-number identification",
        body: "Callers are recognised by their number — no order ID, no PIN, no friction.",
      },
      {
        title: "Prep team protected",
        body: "Status calls handled end-to-end so the kitchen never breaks rhythm during a high-volume shift.",
      },
    ],
    meta: {
      title: "AI Voice for Postmates Partners — heytruffle",
      description:
        "heytruffle fields Postmates status calls via the Postmates API, identifies the caller by phone number, and keeps your prep team focused on the food.",
    },
  },
  {
    slug: "flipdish",
    brand: "Flipdish",
    logoFile: "flipdish.svg",
    accent: "#0B75D7",
    category: "Direct Ordering",
    h1: "Flipdish Direct Ordering with Voice AI",
    valueProp:
      "Support your Flipdish growth. Our AI promotes your loyalty programs and app downloads during the call.",
    hook: "Grow Flipdish loyalty and direct sales with every answered call.",
    syncSurface: [
      "Loyalty program promotion on call",
      "Flipdish app download nudges",
      "SMS deep-links to web store + app",
      "Customer kept in your branded channel",
    ],
    capabilities: [
      {
        title: "Loyalty promotion",
        body: "Your active loyalty programs get pitched naturally during inbound calls, lifting repeat-order rate.",
      },
      {
        title: "App download nudges",
        body: "Callers are invited to install the Flipdish app — direct sales for life, no marketplace cut.",
      },
      {
        title: "Branded SMS deep-links",
        body: "Links go to your Flipdish web store or mobile app, keeping every customer in your branded channel.",
      },
    ],
    meta: {
      title: "Flipdish Direct Ordering with Voice AI — heytruffle",
      description:
        "heytruffle promotes your Flipdish loyalty programs on every call and SMSes deep-links to your branded web store and mobile app — direct sales, no marketplace cut.",
    },
  },
  {
    slug: "chownow",
    brand: "ChowNow",
    logoFile: "chownow.png",
    // ChowNow coral, sampled from the wordmark's pin icon.
    accent: "#E8543F",
    category: "Direct Ordering",
    h1: "Commission-Free Orders via ChowNow & AI",
    valueProp:
      "Save on marketplace fees. When a customer calls, the AI explains the benefits of ordering direct and sends a ChowNow SMS link.",
    hook: "Move phone customers to your commission-free ChowNow store automatically.",
    syncSurface: [
      "Commission-free direct sales",
      "ChowNow SMS deep-link on call",
      "Phone labor → digital margin",
      "Marketplace fees bypassed",
    ],
    capabilities: [
      {
        title: "Direct-ordering pitch",
        body: "The AI explains the benefits of skipping marketplaces and ordering directly from you, mid-call.",
      },
      {
        title: "SMS deep-link",
        body: "A ChowNow link arrives on the caller's phone during the conversation — they tap, order, and done.",
      },
      {
        title: "High-margin conversion",
        body: "Phone labour becomes commission-free digital sales without your team lifting a finger.",
      },
    ],
    meta: {
      title: "Commission-Free Orders via ChowNow & AI — heytruffle",
      description:
        "heytruffle moves phone customers to your commission-free ChowNow store automatically — explains the benefits of ordering direct and sends an SMS link mid-call.",
    },
  },
] as const;

export function getIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
