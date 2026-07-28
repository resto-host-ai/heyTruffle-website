import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/content/case-studies";

// Adding a restaurant is: create content/case-studies/<slug>.ts, add it to
// the index — nothing to touch here.
export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
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
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} />;
}
