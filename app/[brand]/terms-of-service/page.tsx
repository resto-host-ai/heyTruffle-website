import type { Metadata } from "next";
import { BrandLegalPage, brandLegalMetadata } from "@/components/layout/BrandLegalPage";
import { getBrands } from "@/lib/data/brands";
import {
  TERMS_INTRO,
  TERMS_PREAMBLE,
  TERMS_SECTIONS,
  TERMS_UPDATED,
} from "@/lib/legal/terms-of-service";

export const revalidate = 300;

const DOC = {
  path: "terms-of-service",
  label: "Terms of Service",
  intro: TERMS_INTRO,
  updated: TERMS_UPDATED,
  preamble: TERMS_PREAMBLE,
  sections: TERMS_SECTIONS,
};

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ brand: b.slug }));
}

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  return brandLegalMetadata(brand, DOC);
}

export default async function Page({ params }: Props) {
  const { brand } = await params;
  return <BrandLegalPage slug={brand} doc={DOC} />;
}
