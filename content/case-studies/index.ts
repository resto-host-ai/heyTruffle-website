import type { CaseStudy } from "./types";
import { aplos } from "./aplos";
import { bairesGrill } from "./baires-grill";
import { chelseaCorner } from "./chelsea-corner";
import { kyochon } from "./kyochon";
import { kyu } from "./kyu";
import { laCanita } from "./la-canita";
import { mangosTropicalCafe } from "./mangos-tropical-cafe";
import { rrealTacos } from "./rreal-tacos";
import { rumbaCubana } from "./rumba-cubana";

export type { CaseStudy } from "./types";

export const CASE_STUDIES: Record<string, CaseStudy> = {
  aplos,
  "baires-grill": bairesGrill,
  "chelsea-corner": chelseaCorner,
  kyochon,
  kyu,
  "la-canita": laCanita,
  "mangos-tropical-cafe": mangosTropicalCafe,
  "rreal-tacos": rrealTacos,
  "rumba-cubana": rumbaCubana,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

// Build-time integrity check: a typo'd slug or canonical here should fail the
// build, not ship as a silent SEO regression.
for (const [key, cs] of Object.entries(CASE_STUDIES)) {
  if (cs.slug !== key) {
    throw new Error(
      `content/case-studies: key "${key}" does not match slug "${cs.slug}"`,
    );
  }
  const expectedCanonical = `/case-study/${cs.slug}/`;
  if (cs.seo.canonical !== expectedCanonical) {
    throw new Error(
      `content/case-studies/${key}: canonical "${cs.seo.canonical}" !== expected "${expectedCanonical}"`,
    );
  }
}
