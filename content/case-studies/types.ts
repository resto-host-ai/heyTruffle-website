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

export type HeroStat = { value: string; label: string };

export type MetricCard = { value: string; label: string; color: string };

export type RelatedCard = {
  name: string;
  location?: string;
  value: string;
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
