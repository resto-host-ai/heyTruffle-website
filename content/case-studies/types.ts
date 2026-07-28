/**
 * Case study data — one file per restaurant, all in one place. Every number
 * that appears on a case study page (or is quoted from it elsewhere) lives
 * here as a plain string for now; formatting normalization happens on top
 * of this data, not by hand-editing 9 files again.
 *
 * `hostSampleLabel` replaces the raw `deployedAt` claim: every case study
 * currently plays the same Nacho/Rreal-Tacos call, so labeling it as a
 * sample call (instead of asserting a deployment that isn't real for that
 * restaurant) is what keeps the module honest without touching the audio.
 */

/**
 * `value` is a raw number wherever the site actually claims a count (so it
 * can only ever render as "5,513", never "5.513" — the en-US formatter is
 * the only thing that turns it into text) and a string wherever the design
 * uses a deliberate abbreviation ("3.2K+", "19K+", "4x") that a formatter
 * would mangle.
 */
export type HeroStat = { value: string | number; label: string };

export type MetricCard = { value: string | number; label: string; color: string };

export type RelatedCard = {
  name: string;
  location?: string;
  value: string | number;
  metric: string;
  desc: string;
  image?: string;
  bg: string;
  bgIdle: string;
  accent: string;
};

export type FeatureStoryHighlights = {
  variant: "highlights";
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  highlights: { value: string; label: string }[];
};

export type FeatureStoryMath = {
  variant: "math";
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  supportingStats: { value: string; label: string }[];
  chain: { value: string; label: string; op: "x" | "=" }[];
  total: { value: string; label: string };
  audio?: { src: string; caption: string };
};

export type ImpactMath = {
  factors: { value: string; label: string }[];
  total: string;
  caption: string;
  /** Cosmetic delta between the two pages that use this section today:
   *  baires-grill wraps its factor value at a fixed width on small screens,
   *  rreal-tacos never wraps it. Preserved so the template stays pixel-exact
   *  for both instead of picking one and silently changing the other. */
  valueWidth: "fixed" | "nowrap";
};

export type Capability = {
  title: string;
  flat: string;
  img: string;
  accent: string;
  stat: string;
  statDesc: string;
};

export type SuccessStat = { value: string; title: string; desc: string };

export type CaseStudy = {
  slug: string;
  name: string;
  /** mangos-tropical-cafe's original breadcrumb text wrapped across two
   *  source lines, which happened to drop the space before the name (the
   *  flex `gap-2` on the breadcrumb makes this invisible either way — kept
   *  only so the template reproduces the original byte-for-byte). */
  breadcrumbNoLeadingSpace?: boolean;
  seo: { title: string; description: string; canonical: string };
  logo: { src: string; alt: string };

  heroTags: string[];
  heroWidth: "narrow" | "wide"; // max-w-[760px] | max-w-[860px]
  headline: { lead: string; accent?: string; trailing?: string };
  paragraphs: [string, string];
  heroStats?: [HeroStat, HeroStat, HeroStat]; // absent on la-canita

  featureStory?: FeatureStoryHighlights | FeatureStoryMath;
  successStats?: { intro: string; items: SuccessStat[] }; // la-canita only
  capabilities?: { heading: string; items: Capability[] }; // la-canita only

  hostSampleLabel: string;

  measured: {
    heading: [string, string]; // ["No assumptions.", "Just the math." | "Just the results."]
    intro: string;
    cards: [MetricCard, MetricCard, MetricCard, MetricCard];
  };

  impact?: ImpactMath;

  testimonial?: {
    quoteLead: string;
    accentWord: string;
    quoteTrailing: string;
    body: string;
    person: string;
    role: string;
    photo: string;
  };

  related: [RelatedCard, RelatedCard];
};
