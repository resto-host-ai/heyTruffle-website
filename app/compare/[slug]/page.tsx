import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompetitorCompare from "@/components/marketing/CompetitorCompare";
import { COMPETITORS, getCompetitor } from "@/lib/data/compare";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  return {
    title: competitor.metaTitle,
    description: competitor.metaDescription,
    alternates: { canonical: `/compare/${competitor.slug}/` },
    openGraph: {
      title: competitor.metaTitle,
      description: competitor.metaDescription,
      url: `https://heytruffle.ai/compare/${competitor.slug}/`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  return <CompetitorCompare competitor={competitor} />;
}
