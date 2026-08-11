/** Content for the "heytruffle vs X" comparison pages (app/compare/[slug]).
 *  Kept as data so CompetitorCompare.tsx renders every page from one template
 *  instead of duplicating markup three times. */

export type CompareRow = { dim: string; ours: string; theirs: string };
export type CompareFaq = { q: string; a: string };

export type CompetitorProfile = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  otherModelLabel: string;
  otherModelDesc: string;
  chooseThemChips: string[];
  table: CompareRow[];
  tableNote: string;
  whoThemTitle: string;
  whoThemDesc: string;
  faqs: CompareFaq[];
  disclaimer: string;
};

/** Identical on every comparison page — this is heytruffle's own pitch, not
 *  something that varies by competitor. */
export const CHOOSE_US_CHIPS = [
  "You want the phones handled for you, not another tool to run",
  "You want it tuned every week by a real team",
  "You want it personalized to your brand and your hospitality",
  "You need reservations, orders, catering and events on one line",
  "You want it multilingual, switching language live on the call",
];

export const COMPETITORS: readonly CompetitorProfile[] = [
  {
    slug: "slang-ai",
    name: "Slang AI",
    metaTitle: "heytruffle vs Slang AI — managed AI Concierge vs software you run",
    metaDescription:
      "heytruffle vs Slang AI, compared honestly. heytruffle is a fully managed AI Concierge tuned by a human team every week. Slang AI is a self serve reservations platform you configure and run.",
    heroTagline:
      "Both answer your restaurant’s calls with AI. Slang is a self serve reservations platform you set up and run. heytruffle is a fully managed service: a human team trains, monitors and tunes your AI Concierge every week.",
    otherModelLabel: "Software",
    otherModelDesc: "You set it up in about 30 minutes, then your team runs and maintains it.",
    chooseThemChips: [
      "You want a self serve reservations platform you run yourself",
      "You are happy configuring and maintaining it in house",
      "Your phone is mostly reservations and guest questions",
      "You are fine sending a text link for takeout",
    ],
    table: [
      { dim: "Model", ours: "Fully managed service", theirs: "Self serve software" },
      { dim: "Who tunes it", ours: "Our team, every week", theirs: "You configure it; Slang updates the platform" },
      { dim: "Calls handled", ours: "Reservations, orders, catering, events, FAQs", theirs: "Reservations and FAQs. Takeout via a text link" },
      { dim: "Languages", ours: "Multilingual, switches language live", theirs: "English. Spanish in Premium or a $99/mo add on" },
      { dim: "Integrations", ours: "OpenTable, plus your POS and reservation system", theirs: "OpenTable, SevenRooms, Yelp, Tripleseat, Fishbowl" },
      { dim: "Setup", ours: "Done for you", theirs: "About 30 minutes, self serve" },
    ],
    tableNote:
      "Slang details reflect Slang’s public site as of August 2026, including its published pricing and self reported scale. Confirm current details on slang.ai.",
    whoThemTitle: "A different kind of fit",
    whoThemDesc:
      "You want a self serve reservations platform, you are comfortable running it yourself, and takeout by text link works for you.",
    faqs: [
      {
        q: "Is heytruffle a Slang AI alternative?",
        a: "Yes, for operators who would rather buy a managed service than run software. Both answer restaurant calls with AI. heytruffle operates and tunes your phones for you every week, instead of handing you a platform to configure.",
      },
      {
        q: "What can heytruffle do that Slang does not emphasize?",
        a: "Completing takeout and delivery orders into your POS, treating catering and large parties as core call types, switching language live, and weekly human tuning as part of the service.",
      },
      {
        q: "Can I try heytruffle before committing?",
        a: "Yes. heytruffle starts with a 90 day pilot and no long term contract, so you can validate it in real service before you decide. Our team sets it up and tunes it every week from day one.",
      },
    ],
    disclaimer:
      "Comparison based on public information as of August 2026. Product names and trademarks belong to their respective owners. heytruffle is not affiliated with Slang AI.",
  },
  {
    slug: "loman-ai",
    name: "Loman AI",
    metaTitle: "heytruffle vs Loman AI — managed AI Concierge vs a phone agent you run",
    metaDescription:
      "heytruffle vs Loman AI, compared honestly. heytruffle is a fully managed, hospitality led AI Concierge tuned by a human team every week. Loman AI is a self serve, autonomous phone agent you configure and run.",
    heroTagline:
      "Both answer your restaurant’s calls with AI. Loman is a self serve, autonomous phone agent you set up and run. heytruffle is a fully managed, hospitality led service: a human team trains, monitors and tunes your AI Concierge every week.",
    otherModelLabel: "Software",
    otherModelDesc: "You connect your systems and go live in a day, then your team runs it from the dashboard.",
    chooseThemChips: [
      "You want a self serve phone agent you set up and run",
      "Your phone is mostly a takeout line and order volume is the priority",
      "You are happy managing the menu and settings from a dashboard",
      "You want to go live in a day, on your own",
    ],
    table: [
      { dim: "Model", ours: "Fully managed service", theirs: "Self serve software" },
      { dim: "Who tunes it", ours: "Our team, every week", theirs: "You manage it from a dashboard" },
      { dim: "Calls handled", ours: "Reservations, orders, catering, events, FAQs", theirs: "Orders with payment, reservations, FAQs, routing" },
      { dim: "Languages", ours: "Multilingual, switches language live", theirs: "Multiple languages, set up by you" },
      { dim: "Integrations", ours: "OpenTable, plus your POS and reservation system", theirs: "Toast, Square, Clover, SpotOn, Olo, OpenTable, Stream and more" },
      { dim: "Setup", ours: "Done for you", theirs: "Go live in about a day, self serve" },
    ],
    tableNote: "Loman details reflect Loman’s public site as of August 2026. Confirm current details on loman.ai.",
    whoThemTitle: "A different kind of fit",
    whoThemDesc:
      "You want a self serve, autonomous phone agent focused on order taking and payment, with broad POS integrations, and you are comfortable running it yourself.",
    faqs: [
      {
        q: "Is heytruffle a Loman AI alternative?",
        a: "Yes, for operators who would rather buy a managed hospitality service than run software. Both answer restaurant calls with AI. heytruffle operates and tunes your phones for you every week, instead of handing you a dashboard to configure.",
      },
      {
        q: "Does heytruffle take orders like Loman?",
        a: "Yes. heytruffle completes takeout and delivery orders into your POS, and also handles reservations, catering, large parties and FAQs, led by hospitality and tuned by our team every week.",
      },
      {
        q: "Can I try heytruffle before committing?",
        a: "Yes. heytruffle starts with a 90 day pilot and no long term contract, so you can validate it in real service before you decide. Our team sets it up and tunes it every week from day one.",
      },
    ],
    disclaimer:
      "Comparison based on public information as of August 2026. Product names and trademarks belong to their respective owners. heytruffle is not affiliated with Loman AI.",
  },
  {
    slug: "tablevoice",
    name: "TableVoice",
    metaTitle: "heytruffle vs TableVoice — a fully managed AI Concierge for US restaurant groups",
    metaDescription:
      "heytruffle vs TableVoice, compared honestly. Both are warm and hospitality led. heytruffle is a fully managed service tuned by a human team every week, built for US multilocation restaurant groups.",
    heroTagline:
      "Both are warm, hospitality led AI hosts. TableVoice onboards you and hands you a tool to manage. heytruffle keeps operating your phones as a service, with a human team tuning your AI Concierge every week.",
    otherModelLabel: "Software",
    otherModelDesc: "TableVoice onboards you and tunes it at the start, then your team manages the tool.",
    chooseThemChips: [
      "You want a warm AI host you manage yourself after onboarding",
      "Your phone is mostly reservations and private events",
      "You want especially deep OpenTable integration",
      "You are comfortable owning ongoing tuning in house",
    ],
    table: [
      { dim: "Model", ours: "Fully managed service", theirs: "Software with white glove onboarding" },
      { dim: "Who tunes it", ours: "Our team, every week", theirs: "Tuned at onboarding; you manage it after" },
      { dim: "Calls handled", ours: "Reservations, orders, catering, events, FAQs", theirs: "Reservations and events, with a warm host" },
      { dim: "Languages", ours: "Multilingual, switches language live", theirs: "Multilingual, including English, French and Spanish" },
      { dim: "Integrations", ours: "OpenTable, plus your POS and reservation system", theirs: "OpenTable, Resy, Toast, Tripleseat, Perfect Venue" },
      { dim: "Setup", ours: "Done for you", theirs: "White glove onboarding" },
    ],
    tableNote:
      "TableVoice details reflect TableVoice’s public information and OpenTable’s partner listing as of August 2026. TableVoice does not publish pricing. Confirm current details on tablevoice.com.",
    whoThemTitle: "A different kind of fit",
    whoThemDesc:
      "You want a warm AI host with especially deep OpenTable integration and event tools, you are comfortable managing the tool after onboarding, and a Canada rooted vendor fits your market.",
    faqs: [
      {
        q: "Is heytruffle a TableVoice alternative?",
        a: "Yes. Both are warm and hospitality led. heytruffle differs by operating and tuning your phones for you every week, and by its US multilocation operator roots.",
      },
      {
        q: "Do both handle reservations and events?",
        a: "Yes. Both book reservations and handle private events. heytruffle also completes takeout and delivery orders into your POS as part of the same service.",
      },
      {
        q: "Can I try heytruffle before committing?",
        a: "Yes. heytruffle starts with a 90 day pilot and no long term contract, so you can validate it in real service before you decide. Our team sets it up and tunes it every week from day one.",
      },
    ],
    disclaimer:
      "Comparison based on public information as of August 2026. Product names and trademarks belong to their respective owners. heytruffle is not affiliated with TableVoice.",
  },
];

export function getCompetitor(slug: string): CompetitorProfile | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
