import type { Metadata } from "next";
import { BrandLegalPage, brandLegalMetadata } from "@/components/layout/BrandLegalPage";
import { getBrands } from "@/lib/data/brands";
import {
  PRIVACY_INTRO,
  PRIVACY_PREAMBLE,
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
} from "@/lib/legal/privacy-policy";

export const revalidate = 300;

const DOC = {
  path: "privacy-policy",
  label: "Privacy Policy",
  intro: PRIVACY_INTRO,
  updated: PRIVACY_UPDATED,
  preamble: PRIVACY_PREAMBLE,
  sections: PRIVACY_SECTIONS,
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
