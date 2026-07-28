import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/content/case-studies";

// Only slugs migrated off their own static app/case-study/<slug>/page.tsx
// folder render here — a static segment takes precedence over this dynamic
// one, so un-migrated slugs keep working from their old folder untouched.
const MIGRATED = [
  "chelsea-corner",
  "kyochon",
  "rumba-cubana",
  "aplos",
  "mangos-tropical-cafe",
  "kyu",
  "baires-grill",
];

export function generateStaticParams() {
  return MIGRATED.map((slug) => ({ slug }));
}

// Unknown slug -> 404, never a server-rendered fallback. Without this, any
// /case-study/<anything>/ would 200 with empty content — the worst possible
// SEO outcome of this refactor.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.seo.title,
    description: cs.seo.description,
    alternates: { canonical: cs.seo.canonical },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs || !MIGRATED.includes(slug)) notFound();
  return <CaseStudyPage cs={cs} />;
}

// Keep the assertion honest: every migrated slug must actually exist in
// content/case-studies/, and vice versa isn't required (la-canita and
// rreal-tacos exist there but aren't migrated yet).
for (const slug of MIGRATED) {
  if (!CASE_STUDY_SLUGS.includes(slug)) {
    throw new Error(`app/case-study/[slug]: "${slug}" has no content module`);
  }
}
